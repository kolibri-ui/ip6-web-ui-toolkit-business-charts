// noinspection SpellCheckingInspection

export { rubberBandTool }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartToolBarCallbacks } callbacks
 * @returns { ChartToolType }
 */
const rubberBandTool = (canvasElement, callbacks) => {
    let rubberbandStartX;
    let rubberbandStartY;
    let rubberbandActive = false;
    let eventstart = 0;

    return {
        title: 'Rubberband',
        type: 'ACTIVATE',
        tooltip: 'rubberband zooming',
        icon: '',
        mouseDown: (event) => {
            const rect       = canvasElement.getBoundingClientRect();
            rubberbandStartX = event.x - rect.left;
            rubberbandStartY = event.y - rect.top;
            rubberbandActive = true;
            eventstart = Date.now();
        },
        mouseMove: (event) => {
            if (rubberbandActive) {
                const rect    = canvasElement.getBoundingClientRect();

                const posX = event.x - rect.left;
                const posY = event.y - rect.top;

                callbacks.redraw();

                const ctx = canvasElement.getContext('2d');

                ctx.setLineDash([4, 2]);
                ctx.beginPath();
                ctx.rect(rubberbandStartX, rubberbandStartY, posX - rubberbandStartX, posY - rubberbandStartY);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        },
        mouseUp: (event) => {
            rubberbandActive = false;

            if (Date.now() - eventstart < 100) {
                callbacks.redraw();
            } else {
                const rect       = canvasElement.getBoundingClientRect();

                const endX = event.x - rect.left;
                const endY = event.y - rect.top;

                if (!(Math.abs(rubberbandStartX - endX) < 10 || Math.abs(rubberbandStartY - endY) < 10)) {
                    callbacks.setCanvasBoundaries(
                        Math.min(...[rubberbandStartX, endX]),
                        Math.max(...[rubberbandStartX, endX]),
                        Math.min(...[rubberbandStartY, endY]),
                        Math.max(...[rubberbandStartY, endY])
                    );
                } else {
                    callbacks.redraw();
                }
            }
        }
    };
};