// noinspection SpellCheckingInspection

import {
    pointDomainToCanvas
}                                from "./geometryFunctions.js";
import {
    drawPath,
}                                from "./chartFunctions.js";
import { drawScatterplotPoints } from "./scatterChartFunctions.js";

export { drawLinechartLine }

/**
 * @description draws all data points
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array<ChartDataElement> } data
 * @param { Array<ChartDataElement> } selectedPoints
 * @param { ChartOptions } options
 */
const drawLinechartLine = (
    ctx,
    data,
    selectedPoints,
    options
) => {
    const points = [];

    for (const v of data) {
        const point = pointDomainToCanvas(
            options.width,
            options.height,
            {
                xValue: options.boundaries.xMin,
                yValue: options.boundaries.yMin,
            },
            {
                xValue: options.boundaries.xMax,
                yValue: options.boundaries.yMax,
            },
            v
        );

        points.push(point);
    }

    drawPath(ctx, points, options.color, 1);

    drawScatterplotPoints(ctx, data, selectedPoints, options);
};