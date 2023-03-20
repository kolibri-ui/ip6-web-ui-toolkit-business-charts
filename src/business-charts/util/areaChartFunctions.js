// noinspection SpellCheckingInspection

import {
    pointDomainToCanvas,
    yDomainToCanvas
} from "./geometryFunctions.js";
import {
    drawArea,
} from "./chartFunctions.js";
import { drawScatterplotPoints } from "./scatterChartFunctions.js";

export { drawAreachartArea }

/**
 * @description draws area for given data elements
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Array<ChartDataElement> }  data data elements to draw
 * @param { Array<ChartDataElement> }  selectedPoints selected data elements
 * @param { ChartOptions } options chart options
 */
const drawAreachartArea = (
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

    drawArea(ctx, points, yNull, options.color, 0.6);

    drawScatterplotPoints(ctx, data, selectedPoints, options);
};