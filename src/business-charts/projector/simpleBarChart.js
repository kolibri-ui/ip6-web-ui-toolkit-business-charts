// noinspection SpellCheckingInspection

import { drawGrid } from "../util/chart.js";
import { drawRect } from "../util/rectangleProjector.js";
import { resizeHandler } from "../util/resizeHandler.js";


export {SimpleBarChart}

/** @type {Array.<BarChartDataElement>} */
HTMLCanvasElement.prototype.data = undefined;
/** @type {BarChartOptions} */
HTMLCanvasElement.prototype.chartOptions = undefined;
/** @type {Function} */
HTMLCanvasElement.prototype.handleResize = undefined;
/** @type {Function} */
HTMLCanvasElement.prototype.redraw = undefined;

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
 * @param {BarChartOptions} options
 * @param {Array.<BarChartDataElement>} data
 * @returns {HTMLCanvasElement}
 * @constructor
 */
const SimpleBarChart = (data, options) => {
    /** @type {HTMLCanvasElement} */ const canvasElement = document.createElement("canvas");

    options.id = options.id ?? 'bar-chart-23412543214';

    canvasElement.id = options.id;
    canvasElement.width = options.width;
    canvasElement.height = options.height;

    // save data and options to redraw
    canvasElement.chartOptions = options;
    canvasElement.data = data;

    /**
     * Handle resize of canvas
     * @param {ResizeObserverEntry} entry
     */
    canvasElement.handleResize = entry => {
        console.log(entry.target.chartOptions);

        let cs = window.getComputedStyle(entry.target);
        entry.target.chartOptions.width = parseInt(cs.width.replace('px', ''));
        entry.target.chartOptions.height = parseInt(cs.height.replace('px', ''));
        entry.target.redraw(entry.target.data, entry.target.chartOptions);
    };
    resizeHandler.observe(canvasElement);

    /**
     * Method to redraw canvas
     * @param {BarChartOptions} options
     * @param {Array.<BarChartDataElement>} data
     */
    canvasElement.redraw = (data, options) => {
        /** @type {CanvasRenderingContext2D} */ const context = document.getElementById(options.id).getContext('2d');
        const gridX = options.padding;
        const gridY = options.padding;
        const gridWidth = options.width - 2 * options.padding;
        const gridHeight = options.height - 2 * options.padding;
        const offset = 15;

        const barWidth = (gridWidth - offset) / data.length - (2 * options.padding) - 1;
        const ratio = 20 / options.gridOptions.verticalSteps;

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

        drawBars(
            context, data, options, offset, ratio, gridHeight, barWidth
        );
    };

    // canvasElement.redraw(canvasElement, data, options);

    return canvasElement;
};

/**
 *
 * @param {CanvasRenderingContext2D} context
 * @param {BarChartOptions} options
 * @param {Array.<BarChartDataElement>} data
 * @param {Number} offset
 * @param {Number} ratio
 * @param {Number} gridHeight
 * @param {Number} barWidth
 */
const drawBars = (context, data, options, offset, ratio, gridHeight, barWidth) => {
    let barX = options.padding * 2 + offset;
    for(const [i, v] of data.entries()) {
        const height = v.value * ratio;
        const barY = options.padding + gridHeight - offset - height;
        const color = options.colors[i % options.colors.length]

        drawRect(context, barX, barY, barWidth, height, color);

        barX += 2* options.padding + barWidth;
    }
}