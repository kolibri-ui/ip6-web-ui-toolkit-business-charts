import { dom } from "../../../Kolibri/docs/src/kolibri/util/dom.js";
export { ToolBarProjector }

/**
 * @typedef ChartToolBarCallbacks
 * @property { () => Array<ChartDataElement> }                                     getData
 * @property {  (canvasX: Number, canvasY: Number) => Array<ChartDataElement> }    getDataPointsForPosition
 * @property { (point: ChartDataElement) => CanvasPoint2D }                        getCanvasPositionForPoint
 * @property { () => ChartOptions }                                                getOptions
 * @property { (xMin: Number , xMax: Number, yMin: Number, yMax: number) => void } setCanvasBoundaries
 * @property { (dataPoints: Array<ChartDataElement>) => void }                     selectDataPoints
 * @property { () => Array<ChartDataElement> }                                     getSelectedDataPoints
 * @property { () => void }                                                        redraw
 */

/**
 * @typedef ChartToolType
 * @property { String }                                   title
 * @property { 'CLICK'|'ACTIVATE' }                       type
 * @property { String }                                   tooltip
 * @property { HTMLOrSVGElement }                         icon
 * @property { mouseMove?: (event: MouseEvent) => void }  mouseMove
 * @property { mouseDown?: (event: MouseEvent) => void }  mouseDown
 * @property { mouseUp?: (event: MouseEvent) => void }    mouseUp
 * @property { mouseClick?: (event: MouseEvent) => void } mouseClick
 * @property { mouseLeave?: (event: MouseEvent) => void } mouseLeave
 * @property { mouseEnter?: (event: MouseEvent) => void } mouseEnter
 */

/**
 *
 * @param { ToolBarControllerType } controller
 * @param canvasCallbacks
 * @param canvasElement
 * @returns {HTMLDivElement}
 * @constructor
 */
const ToolBarProjector = (controller, canvasCallbacks, canvasElement) => {
    const toolButtons = [];

    /** @type { ChartToolBarCallbacks } */
    const toolCallbacks = {
        getData                   : controller.getData,
        getOptions                : canvasCallbacks.getOptions,
        setCanvasBoundaries       : canvasCallbacks.setCanvasBoundaries,
        getDataPointsForPosition  : canvasCallbacks.getDataPointsForPosition,
        getCanvasPositionForPoint : canvasCallbacks.getCanvasPositionForPoint,
        selectDataPoints          : controller.selectDataPoints,
        getSelectedDataPoints     : controller.getSelectedDataPoints,
        redraw                    : canvasCallbacks.redraw
    };

    const toolBarElement = document.createElement("div");
    toolBarElement.classList.add(`tool-bar`);

    for (const tool of controller.tools) {
        const t = tool(canvasElement, toolCallbacks);

        const elements = dom(`
        <div class="tooltip">
            <button type="button" class="toolbar-button">
                <span class="tooltipText">${t.tooltip}
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