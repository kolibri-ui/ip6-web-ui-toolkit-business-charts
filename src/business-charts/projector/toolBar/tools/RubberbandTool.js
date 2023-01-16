// noinspection SpellCheckingInspection

import { dom } from "../../../../Kolibri/docs/src/kolibri/util/dom.js";

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
        title: 'Rubberband Zoom',
        type: 'ACTIVATE',
        tooltip: 'rubberband zooming',
        icon: dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                  + '<rect x="3.5" y="3.5" width="33" height="33" fill="none" stroke="#612EEA" stroke-dasharray="4 4"/>'
                  + '<path d="M28.438 26.4654H27.3991L27.0309 26.1104C28.3196 24.6112 29.0955 22.665 29.0955 20.5478C29.0955 15.8268 25.2687 12 20.5478 12C15.8268 12 12 15.8268 12 20.5478C12 25.2687 15.8268 29.0955 20.5478 29.0955C22.665 29.0955 24.6112 28.3196 26.1104 27.0309L26.4654 27.3991V28.438L33.0406 35L35 33.0406L28.438 26.4654ZM20.5478 26.4654C17.2733 26.4654 14.6301 23.8221 14.6301 20.5478C14.6301 17.2733 17.2733 14.6301 20.5478 14.6301C23.8221 14.6301 26.4654 17.2733 26.4654 20.5478C26.4654 23.8221 23.8221 26.4654 20.5478 26.4654Z" fill="white" stroke="#612EEA"/>'
                  + '</svg>')[0],
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