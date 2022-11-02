// noinspection SpellCheckingInspection

import { dom } from "../../Kolibri/docs/src/kolibri/util/dom.js";
import { drawGrid } from "../util/chart.js";
import { drawRect } from "../util/rectangleProjector.js";


export {SimpleBarChart}

/**
 * @typedef { Object } BarChartDataElement
 * @property { String } name
 * @property { Number } value
 */

/**
 * Implementation of a simple Canvas bar chart.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param {Object} options
 * @param {Array.<BarChartDataElement>} options.data
 * @param {Number} options.width
 * @param {Number} options.height
 * @param {Number} options.padding
 * @param {String} [options.id]
 * @param {ChartGridOptions} options.gridOptions
 * @returns {HTMLElement}
 * @constructor
 */
const SimpleBarChart = options => {
    const [canvasElement] = dom(`
        <canvas>
        </canvas>
    `);

    canvasElement.width = options.width;
    canvasElement.height = options.height;

    /** @type {CanvasRenderingContext2D} */ const context = canvasElement.getContext('2d');
    const gridX = options.padding;
    const gridY = options.padding;
    const gridWidth = options.width - 2 * options.padding;
    const gridHeight = options.height - 2 * options.padding;
    const offset = 15;

    const barWidth = (gridWidth - offset) / options.data.length - 2 * options.padding;
    const ratio = 20 / options.gridOptions.verticalSteps;

    const drawBars = () => {
        let barX = options.padding * 2 + offset;
        for(const v of options.data) {
            const height = v.value * ratio;
            const barY = options.padding + gridHeight - offset - height;

            drawRect(context, barX, barY, barWidth, height, 'blue');

            barX += 2* options.padding + barWidth;
        }
    };

    const draw = () => {
        drawGrid(
            options.gridOptions,
            context,
            gridX,
            gridY,
            offset,
            gridWidth,
            gridHeight,
            options.padding,
            20,
            20,
            0,
            0
        );

        drawBars();
    };

    draw();

    return canvasElement;
};