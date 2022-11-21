// noinspection SpellCheckingInspection

import { drawPoint }        from "../util/chartFunctions.js";
import { drawGrid }         from "../util/chartGridFunctions.js";
import { domainToCanvasXY } from "../util/geometryFunctions.js";

export { SimpleScatterplotChart, redrawScatterplot }

/**
 * @typedef { Object } ScatterplotChartDataElement
 * @property { String }  name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 */

/**
 * @typedef { Object } ScatterplotChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { Array.<String> } colors Colors for points
 * @property { String } [id] ID string (optional)
 * @property { GridOptions } gridOptions grid options
 */

/**
 * Implementation of a simple canvas bar chart.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { Array.<ScatterplotChartDataElement> } data data elements to display in scatterplot chart
 * @param { ScatterplotChartOptions } options size, padding, style of the chart and grid options
 * @return { HTMLCanvasElement }
 * @constructor
 */
const SimpleScatterplotChart = (data, options) => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");

    options.id = options.id ?? 'scatterplot-chart-43412543219';

    canvasElement.id     = options.id;
    canvasElement.width  = options.width;
    canvasElement.height = options.height;

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    drawScatterplot(context, data, options);

    return canvasElement;
};

/**
 *
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array.<ScatterplotChartDataElement> } data
 * @param { ScatterplotChartOptions } options
 * @param {Number} pointSize
 */
const drawScatterplotPoints = (
    ctx,
    data,
    options,
    pointSize
) => {
    for (const v of data) {
        const point = domainToCanvasXY(options.gridOptions.nullPoint, options.gridOptions.xRatio, options.gridOptions.yRatio, v);

        drawPoint(ctx, point.xValue, point.yValue, '#FF0000', pointSize);
    }
};

/**
 *
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array.<ScatterplotChartDataElement> } data
 * @param { ScatterplotChartOptions } options
 */
const drawScatterplot = (
    ctx,
    data,
    options
) => {
    drawGrid(context, options.gridOptions);
    drawScatterplotPoints(context, data, options, 3);
}

/**
 *
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array.<ScatterplotChartDataElement> } data
 * @param { ScatterplotChartOptions } options
 */
const redrawScatterplot = (
    ctx,
    data,
    options,
) => {
    ctx.clearRect(0, 0, options.width, options.height);
    drawScatterplot(ctx, data, options);
}