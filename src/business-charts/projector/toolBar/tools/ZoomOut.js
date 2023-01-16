// noinspection SpellCheckingInspection

export { zoomOutTool }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartToolBarCallbacks } callbacks
 * @returns { ChartToolType }
 */
const zoomOutTool = (canvasElement, callbacks) => ({
    title     : '-',
    type      : 'CLICK',
    tooltip   : 'zoom out',
    icon      : '',
    mouseClick: () => {
        const rect    = canvasElement.getBoundingClientRect();
        const offsetX = rect.width / 18;
        const offsetY = rect.height / 18;

        callbacks.setCanvasBoundaries(-offsetX, rect.width + offsetX, -offsetY, rect.height + offsetY);
    }
});