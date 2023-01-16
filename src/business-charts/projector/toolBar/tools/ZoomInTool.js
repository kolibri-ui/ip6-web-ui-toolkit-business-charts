// noinspection SpellCheckingInspection

export { zoomInTool }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartToolBarCallbacks } callbacks
 * @returns { ChartToolType }
 */
const zoomInTool = (canvasElement, callbacks) => ({
    title     : '+',
    type      : 'CLICK',
    tooltip   : 'zoom in',
    icon      : '',
    mouseClick: () => {
        const rect    = canvasElement.getBoundingClientRect();
        const offsetX = rect.width * 0.05;
        const offsetY = rect.height * 0.05;

        callbacks.setCanvasBoundaries(offsetX, rect.width - offsetX, offsetY, rect.height - offsetY);
    }
});