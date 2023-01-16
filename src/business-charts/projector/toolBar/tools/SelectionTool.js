// noinspection SpellCheckingInspection

import { dom } from "../../../../Kolibri/docs/src/kolibri/util/dom.js";

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
        type: 'ACTIVATE',
        tooltip: 'select',
        icon: dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                  + '<path d="M19.9945 35.7531L17.473 15L35.4969 27.9563L34.2932 28.0095C28.5916 28.2613 23.321 31.1157 19.9945 35.7531Z" fill="white" stroke="#612EEA"/>'
                  + '</svg>')[0],
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