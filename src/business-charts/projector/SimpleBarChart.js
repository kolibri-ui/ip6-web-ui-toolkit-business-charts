// noinspection SpellCheckingInspection

import {drawGrid, drawRect} from "../util/chart.js";

export {SimpleBarChart}

/**
 * @typedef { Object } BarChartDataElement
 * @property { String } name Name of the data element
 * @property { Number } value Value of the data element
 */

/**
 * @typedef { Object } BarChartOptions
 * @property { !Number } width Width in pixel
 * @property { Number } height Height in pixel
 * @property { Number } padding Padding for elements
 * @property { Array.<String> } colors Colors for bars
 * @property { String } [id] Id string (optional)
 * @property { ChartGridOptions } gridOptions Options for grid
 */

/**
 * Implementation of a simple Canvas bar chart.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { !Array.<BarChartDataElement> } data Array with data elements
 * @param { BarChartOptions } options BarChart options
 * @returns { HTMLCanvasElement }
 * @constructor
 */
const SimpleBarChart = (data, options) => {
    const canvasElement = document.createElement("canvas");

    canvasElement.width = options.width;
    canvasElement.height = options.height;

    /** @type {CanvasRenderingContext2D} */ const context = canvasElement.getContext('2d');
    const gridX = options.padding;
    const gridY = options.padding;
    const gridWidth = options.width - (2 * options.padding);
    const gridHeight = options.height - (2 * options.padding);
    const offset = 25;

    const barWidth = (gridWidth - offset) / data.length - (2 * options.padding) - 1;
    const ratio = 20 / options.gridOptions.verticalSteps;

    const drawBars = () => {
        let barX = options.padding * 2 + offset;
        for(const [i, v] of data.entries()) {
            const height = v.value * ratio;
            const barY = options.padding + gridHeight - offset - height;
            const color = options.colors[i % options.colors.length]

            drawRect(context, barX, barY, barWidth, height, color);

            barX += 2* options.padding + barWidth;
        }
    }

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
    }

    draw();

    return canvasElement;
}