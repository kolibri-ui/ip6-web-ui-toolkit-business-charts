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
 * @description draws line for all data points
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Array<ChartDataElement> }  data data elements to draw
 * @param { Array<ChartDataElement> }  selectedPoints selected data elements
 * @param { ChartOptions }             options chart options
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