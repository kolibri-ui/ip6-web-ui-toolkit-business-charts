// noinspection SpellCheckingInspection

import { dom } from "../../../Kolibri/docs/src/kolibri/util/dom.js";

export { ToolBarProjector }

/**
 * @typedef ChartToolBarCallbacks
 * @property { () => Array<ChartDataElement> }                                          getData get data elements
 * @property {  (canvasX: Number, canvasY: Number) => Array<ChartDataElementAndSerie> } getDataPointsForPosition get
 *     data elements for a specific position
 * @property { (point: ChartDataElement) => CanvasPoint2D }                             getCanvasPositionForPoint get
 *     canvas point for data element
 * @property { () => ChartOptions }                                                     getOptions get options
 * @property { (xMin: Number , xMax: Number, yMin: Number, yMax: number) => void }      setCanvasBoundaries get
 *     boundaries
 * @property { (dataPoints: Array<ChartDataElement>) => void }                          selectDataPoints select data
 *     elements
 * @property { () => Array<ChartDataElement> }                                          getSelectedDataPoints get
 *     selected data elements
 * @property { () => void }                                                             redraw function to redraw
 */

/**
 * @typedef ChartCanvasCallbacks
 * @property { () => ChartOptions }                                               getOptions get chart options
 * @property { (mouseX: Number, mouseY: Number) => Array<ChartDataElement> }      getDataPointsForPosition get data
 *     elements for given position on canvas
 * @property { ( DomainPoint2D ) => CanvasPoint2D }                               getCanvasPositionForPoint get
 *     position on canvas for given element
 * @property { (xMin: Number, xMax: Number, yMin: Number, yMax: Number) => void } setCanvasBoundaries set new
 *     boundaries for canvas
 * @property { () => void }                                                       redraw redraw the chart
 */

/**
 * @typedef ChartToolType
 * @property { String }                                   title tool title
 * @property { 'CLICK'|'ACTIVATE' }                       type tool type
 * @property { String }                                   tooltip description for tooltip
 * @property { HTMLOrSVGElement }                         icon svg icon for tool
 * @property { mouseMove?: (event: MouseEvent) => void }  mouseMove mouse move callback
 * @property { mouseDown?: (event: MouseEvent) => void }  mouseDown mouse down callback
 * @property { mouseUp?: (event: MouseEvent) => void }    mouseUp mouse up callback
 * @property { mouseClick?: (event: MouseEvent) => void } mouseClick mouse click callback
 * @property { mouseLeave?: (event: MouseEvent) => void } mouseLeave mouse leave callback
 * @property { mouseEnter?: (event: MouseEvent) => void } mouseEnter mouse enter callback
 */

/**
 *
 * @param { ToolBarControllerType } controller toolbar controller
 * @param { ChartCanvasCallbacks } canvasCallbacks canvas callbacks
 * @param { HTMLCanvasElement }     canvasElement chart canvas element
 * @returns {HTMLDivElement}
 * @constructor
 */
const ToolBarProjector = (controller, canvasCallbacks, canvasElement) => {
    const toolButtons = [];

    /** @type { ChartToolBarCallbacks } */
    const toolCallbacks = {
        getData                  : controller.getData,
        getOptions               : canvasCallbacks.getOptions,
        setCanvasBoundaries      : canvasCallbacks.setCanvasBoundaries,
        getDataPointsForPosition : canvasCallbacks.getDataPointsForPosition,
        getCanvasPositionForPoint: canvasCallbacks.getCanvasPositionForPoint,
        selectDataPoints         : controller.selectDataPoints,
        getSelectedDataPoints    : controller.getSelectedDataPoints,
        redraw                   : canvasCallbacks.redraw
    };

    const toolBarElement = document.createElement("div");
    toolBarElement.classList.add(`tool-bar`, `tool-bar-grid`);

    for (const tool of controller.tools) {
        const t = tool(canvasElement, toolCallbacks);

        const elements = dom(`
        <div class="tooltip">
            <button type="button" class="toolbar-button">
                <span class="tooltipText">${ t.tooltip }
                </span>
            </button>
        </div>`);

        const buttonElement = elements[0].children[0];
        buttonElement.classList.add('toolbar-button');

        buttonElement.append(t.icon);

        toolButtons.push(buttonElement);

        buttonElement.onclick = (_) => {
            if (t.type === 'CLICK') {
                t.mouseClick(undefined);
            } else if (t.type === 'ACTIVATE') {
                for (const toolButton of toolButtons) {
                    toolButton === buttonElement
                    ? toolButton.classList.add('active')
                    : toolButton.classList.remove('active');

                    toolButton === buttonElement
                    ? toolButton.focus()
                    : toolButton.active = false;
                }

                controller.selectTool(t);
            }
        };

        toolBarElement.append(elements[0]);

        if (controller.selectedTool() === null && t.type === 'ACTIVATE') {
            controller.selectTool(t);
            buttonElement.classList.add('active');
        }
    }

    canvasElement.onclick = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseClick) {
            selectedTool.mouseClick(event);
        }
    };

    canvasElement.onmousedown = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseDown) {
            selectedTool.mouseDown(event);
        }
    };

    canvasElement.onmousemove = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseMove) {
            selectedTool.mouseMove(event);
        }
    };

    canvasElement.onmouseup = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseUp) {
            selectedTool.mouseUp(event);
        }
    };

    canvasElement.onmouseenter = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseEnter) {
            selectedTool.mouseEnter(event);
        }
    };

    canvasElement.onmouseleave = (event) => {
        const selectedTool = controller.selectedTool();
        if (selectedTool.mouseLeave) {
            selectedTool.mouseLeave(event);
        }
    };

    return toolBarElement;
};