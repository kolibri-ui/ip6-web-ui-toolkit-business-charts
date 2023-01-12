// noinspection SpellCheckingInspection

export { panningTool }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartToolBarCallbacks } callbacks
 * @returns { ChartToolType }
 */
const panningTool = (canvasElement, callbacks) => {
    let panningStartX;
    let panningStartY;
    let panningActive = false;

    return {
        title: 'Panning',
        icon: '',
        mouseDown: (event) => {
            const rect       = canvasElement.getBoundingClientRect();
            panningStartX = event.x - rect.left;
            panningStartY = event.y - rect.top;
            panningActive = true;
        },
        mouseMove: (event) => {
            if (panningActive) {
                const rect  = canvasElement.getBoundingClientRect();

                const posX = event.x - rect.left;
                const posY = event.y - rect.top;

                const moveX = posX - panningStartX;
                const moveY = posY - panningStartY;

                callbacks.setCanvasBoundaries(
                    0 - moveX,
                    rect.width - moveX,
                    0 - moveY,
                    rect.height - moveY
                );

                panningStartX = posX;
                panningStartY = posY;
            }
        },
        mouseUp: (_) => {
            panningActive = false;
            callbacks.redraw();
        }
    };
};