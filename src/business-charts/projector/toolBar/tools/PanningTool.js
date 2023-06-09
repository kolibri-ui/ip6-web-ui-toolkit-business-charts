// noinspection SpellCheckingInspection

import { dom } from "../../../../Kolibri/docs/src/kolibri/util/dom.js";

export { panningTool }

/**
 *
 * @param { HTMLCanvasElement }     canvasElement chart canvas element
 * @param { ChartToolBarCallbacks } callbacks chart toolbar callbacks
 * @returns { ChartToolType }
 */
const panningTool = (canvasElement, callbacks) => {
    let panningStartX;
    let panningStartY;
    let panningActive = false;

    return {
        title     : 'Panning',
        type      : 'ACTIVATE',
        tooltip   : 'panning',
        icon      : dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                        + '<path d="M14.0577 8.59457L13.6695 9.01805L14.0757 9.42426L15.0757 10.4243L15.5292 10.8778L15.9515 10.3951L18.4 7.59687V8.59457V18.4H8.59457H7.59687L10.3951 15.9515L10.8778 15.5292L10.4243 15.0757L9.42426 14.0757L9.01805 13.6695L8.59457 14.0577L2.59457 19.5577L2.11206 20L2.59457 20.4423L8.59457 25.9423L9.01805 26.3305L9.42426 25.9243L10.4243 24.9243L10.8778 24.4708L10.3951 24.0485L7.59687 21.6H8.59457H18.4V31.4054V32.4031L15.9515 29.6049L15.5292 29.1222L15.0757 29.5757L13.6695 30.982L19.5577 37.4054L20 37.8879L20.4423 37.4054L25.9423 31.4054L26.3305 30.982L25.9243 30.5757L24.9243 29.5757L24.4708 29.1222L24.0485 29.6049L21.6 32.4031V31.4054V21.6H31.6012H32.4031L29.6049 24.0485L29.1222 24.4708L29.5757 24.9243L30.982 26.3305L37.4054 20.4423L37.8879 20L37.4054 19.5577L30.982 13.6695L29.5757 15.0757L29.1222 15.5292L29.6049 15.9515L32.4031 18.4H31.6012H21.6V8.59457V7.59687L24.0485 10.3951L24.4708 10.8778L24.9243 10.4243L25.9243 9.42426L26.3305 9.01805L25.9423 8.59457L20.4423 2.59457L20 2.11206L19.5577 2.59457L14.0577 8.59457Z" fill="white" stroke="#612EEA"/>'
                        + '</svg>')[0],
        mouseDown : (event) => {
            const rect    = canvasElement.getBoundingClientRect();
            panningStartX = event.x - rect.left;
            panningStartY = event.y - rect.top;
            panningActive = true;
        },
        mouseMove : (event) => {
            if (panningActive) {
                const rect = canvasElement.getBoundingClientRect();

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
        mouseUp   : (_) => {
            panningActive = false;
            callbacks.redraw();
        },
        mouseEnter: (event) => {
            if (event.buttons === 0) {
                panningActive = false;
            }
        }
    };
};