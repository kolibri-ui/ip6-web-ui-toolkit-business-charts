export { ToolBarProjector }

/**
 * @typedef ChartToolBarCallbacks
 * @property { () => Array<ScatterChartDataElement> } getData
 * @property {  (canvasX: Number, canvasY: Number) => ScatterChartDataElement } getDataPointForPosition
 * @property { () => ScatterplotChartOptions } getOptions
 * @property { (xMin: Number , xMax: Number, yMin: Number, yMax: number) => void } setCanvasBoundaries
 * @property { (dataPoint: ScatterChartDataElement) => void } selectDataPoint
 * @property { () => void } redraw
 */

/**
 * @typedef ChartToolType
 * @property { String } title
 * @property { 'CLICK'|'ACTIVATE' } type
 * @property { String } tooltip
 * @property { String } icon
 * @property { mouseMove?: (event: MouseEvent) => void } mouseMove
 * @property { mouseDown?: (event: MouseEvent) => void } mouseDown
 * @property { mouseUp?: (event: MouseEvent) => void } mouseUp
 * @property { mouseClick?: (event: MouseEvent) => void } mouseClick
 */

const ToolBarProjector = (controller, canvasCallbacks, canvasElement) => {
    const toolButtons = [];

    /** @type { ChartToolBarCallbacks } */
    const toolCallbacks = {
        getData                : controller.getData,
        getOptions             : canvasCallbacks.getOptions,
        setCanvasBoundaries    : canvasCallbacks.setCanvasBoundaries,
        getDataPointForPosition: canvasCallbacks.getDataPointForPosition,
        selectDataPoint        : controller.selectDataPoint,
        redraw                 : canvasCallbacks.redraw
    };

    const toolBarElement = document.createElement("div");
    toolBarElement.classList.add(`tool-bar`);

    for (const tool of controller.tools) {
        const t = tool(canvasElement, toolCallbacks);

        const buttonElement = document.createElement("button");
        buttonElement.classList.add('button');
        buttonElement.append(document.createTextNode(t.title));

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

        toolBarElement.append(buttonElement);

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

    return toolBarElement;
};