// noinspection SpellCheckingInspection

import {
    pointDomainToCanvas,
    yDomainToCanvas
} from "./geometryFunctions.js";
import {
    drawArea,
} from "./chartFunctions.js";
import { drawScatterplotPoints } from "./scatterChartFunctions.js";

export { drawAreachartLine }

/**
 * @description draws all data points
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array<ChartDataElement> } data
 * @param { Array<ChartDataElement> } selectedPoints
 * @param { ScatterplotChartOptions } options
 */
const drawAreachartLine = (
    ctx,
    data,
    selectedPoints,
    options
) => {
    const points = [];
    const yNull = yDomainToCanvas(options.height, options.boundaries.yMin, options.boundaries.yMax, 0);

    for (const v of data) {
        const point = pointDomainToCanvas(
            options.width,
            options.height,
            options.boundaries.xMin,
            options.boundaries.xMax,
            options.boundaries.yMin,
            options.boundaries.yMax,
            v
        );

        points.push(point);
    }

    drawArea(ctx, points, yNull, options.color, 0.6);

    drawScatterplotPoints(ctx, data, selectedPoints, options);
};