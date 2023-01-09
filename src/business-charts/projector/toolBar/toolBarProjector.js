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
 * @property { String } icon
 * @property { mouseMove?: (event: MouseEvent) => void } mouseMove
 * @property { mouseDown?: (event: MouseEvent) => void } mouseDown
 * @property { mouseUp?: (event: MouseEvent) => void } mouseUp
 * @property { mouseClick?: (event: MouseEvent) => void } mouseClick
 */

const ToolBarProjector = (controller, canvasCallbacks, canvasElement) => {
    const tools = [];
    /** @type { ChartToolBarCallbacks } */
    const toolCallbacks = {
        getData: controller.getData,
        getOptions: canvasCallbacks.getOptions,
        setCanvasBoundaries: canvasCallbacks.setCanvasBoundaries,
        getDataPointForPosition: canvasCallbacks.getDataPointForPosition,
        selectDataPoint: controller.selectDataPoint,
        redraw: canvasCallbacks.redraw
    };

    const toolBarElement = document.createElement("div");
    toolBarElement.classList.add(`tool-bar`);

    for (const tool of controller.tools) {
        tools.push(tool(canvasElement, toolCallbacks));

        // TODO: button erstellen und in div einfügen
    }

    controller.selectTool(tools[0]);

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