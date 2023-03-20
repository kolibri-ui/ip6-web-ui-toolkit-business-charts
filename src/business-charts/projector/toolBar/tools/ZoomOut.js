// noinspection SpellCheckingInspection

import { dom } from "../../../../Kolibri/docs/src/kolibri/util/dom.js";

export { zoomOutTool }

/**
 *
 * @param { HTMLCanvasElement }     canvasElement chart canvas element
 * @param { ChartToolBarCallbacks } callbacks chart toolbar callbacks
 * @returns { ChartToolType }
 */
const zoomOutTool = (canvasElement, callbacks) => ({
    title     : '-',
    type      : 'CLICK',
    tooltip   : 'zoom out',
    icon      : dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                    + '<path d="M6 17.5H5.5V18V22V22.5H6H34H34.5V22V20V18V17.5H34H6Z" fill="white" stroke="#612EEA"/>'
                    + '</svg>')[0],
    mouseClick: () => {
        const rect    = canvasElement.getBoundingClientRect();
        const offsetX = rect.width / 18;
        const offsetY = rect.height / 18;

        callbacks.setCanvasBoundaries(-offsetX, rect.width + offsetX, -offsetY, rect.height + offsetY);
    }
});