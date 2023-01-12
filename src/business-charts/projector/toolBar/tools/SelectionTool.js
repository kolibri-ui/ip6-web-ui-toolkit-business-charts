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
        title: 'Selection',
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
                    console.log('hovered over point');
                } else {
                    // TODO: Tooltip ausblenden
                    console.log('left point');
                }
            }


        },
        mouseClick: (event) => {
            const rect       = canvasElement.getBoundingClientRect();
            const mouseX = event.x - rect.left;
            const mouseY = event.y - rect.top;

            const point = callbacks.getDataPointForPosition(mouseX, mouseY);

            callbacks.selectDataPoint(point);

            console.log(`point selected: ${point}`);
        }
    };
};