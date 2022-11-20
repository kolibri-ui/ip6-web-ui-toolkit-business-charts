import { drawPoint, drawGrid } from "../util/chart.js";

export { SimpleScatterplotChart }

/** @type { Array.<ScatterplotChartDataElement> } */
HTMLCanvasElement.prototype.data = undefined;
/** @type { ScatterplotChartOptions } */
HTMLCanvasElement.prototype.chartOptions = undefined;

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
 * @property { Number } [padding=0] padding padding for elements
 * @property { Array.<String> } colors Colors for points
 * @property { String } [id] ID string (optional)
 * @property { ChartGridOptions } gridOptions grid options
 */

/**
 * Implementation of a simple canvas bar chart.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { Array.<ScatterplotChartDataElement> } data data elements to display in scatterplot chart
 * @param { ScatterplotChartOptions } options size, padding, style of the chart and grid options
 * @return { HTMLCanvasElement }
 * @constructor
 */
const SimpleScatterplotChart = ( data, options ) => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");

    options.id = options.id ?? 'scatterplot-chart-43412543219';

    canvasElement.id     = options.id;
    canvasElement.width  = options.width;
    canvasElement.height = options.height;

    // save data and options to redraw
    canvasElement.chartOptions = options;
    canvasElement.data = data;

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');
    const gridX = options.padding;
    const gridY = options.padding;
    const gridWidth = options.width - 2 * options.padding;
    const gridHeight = options.height - 2 * options.padding;
    const offset = 15;

    const pointSize = 20;
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

    drawPoints(
        context, data, options, offset, ratio, gridHeight, gridWidth, pointSize
    );

    return canvasElement;
};

/**
 *
 * @param { CanvasRenderingContext2D } context
 * @param { ScatterplotChartOptions } options
 * @param {Array.<ScatterplotChartDataElement>} data
 * @param {Number} offset
 * @param {Number} ratio
 * @param {Number} gridHeight
 * @param {Number} gridWidth
 * @param {Number} pointSize
 */
const drawPoints = (
    context,
    data,
    options,
    offset,
    ratio,
    gridHeight,
    gridWidth,
    pointSize
) => {
    let pointX = options.padding * 2 + offset;
    for (const [i, v] of data.entries()) {
        const height = v.value * ratio;
        const pointY = options.padding + gridHeight - offset - height;
        const color = options.colors[i % options.colors.length];
        
        drawPoint(
            context, data, options, offset, ratio, gridHeight, gridWidth, pointSize
        );

        pointX += 2 * options.padding + pointSize;
    }
};