// noinspection SpellCheckingInspection

import { dom } from "../../../../Kolibri/docs/src/kolibri/util/dom.js";

export { zoomInTool }

/**
 *
 * @param { HTMLCanvasElement }     canvasElement chart canvas element
 * @param { ChartToolBarCallbacks } callbacks chart toolbar callbacks
 * @returns { ChartToolType }
 */
const zoomInTool = (canvasElement, callbacks) => ({
    title     : '+',
    type      : 'CLICK',
    tooltip   : 'zoom in',
    icon      : dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                    + '<path d="M22.5 6V5.5H22H18H17.5V6V17.5H6H5.5V18V22V22.5H6H17.5V34V34.5H18H22H22.5V34V22.5H34H34.5V22V20V18V17.5H34H22.5V6Z" fill="white" stroke="#612EEA"/>'
                    + '</svg>')[0],
    mouseClick: () => {
        const rect    = canvasElement.getBoundingClientRect();
        const offsetX = rect.width * 0.05;
        const offsetY = rect.height * 0.05;

        callbacks.setCanvasBoundaries(offsetX, rect.width - offsetX, offsetY, rect.height - offsetY);
    }
});