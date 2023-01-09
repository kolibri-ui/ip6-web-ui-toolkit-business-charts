// noinspection SpellCheckingInspection

export { selectionTool }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartToolBarCallbacks } callbacks
 * @returns { ChartToolType }
 */
const selectionTool = (canvasElement, callbacks) => {
    let dataPointHovered;

    return {
        icon: '',
        mouseMove: (event) => {
            const rect       = canvasElement.getBoundingClientRect();
            const mouseX = event.x - rect.left;
            const mouseY = event.y - rect.top;

            const point = callbacks.getDataPointForPosition(mouseX, mouseY);

            if (dataPointHovered !== point) {
                dataPointHovered = point;

                if (dataPointHovered !== undefined) {
                    // TODO: Tooltip anzeigen
                } else {
                    // TODO: Tooltip ausblenden
                }
            }


        },
        mouseClick: (event) => {
            const rect       = canvasElement.getBoundingClientRect();
            const mouseX = event.x - rect.left;
            const mouseY = event.y - rect.top;

            const point = callbacks.getDataPointForPosition(mouseX, mouseY);

            callbacks.selectDataPoint(point);
        }
    };
};