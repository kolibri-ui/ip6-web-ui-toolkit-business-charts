// noinspection SpellCheckingInspection

import {
    pointDomainToCanvas
}                    from "./geometryFunctions.js";
import { drawPoint } from "./chartFunctions.js";

export { drawScatterplotPoints }

/**
 * @description draws all data points
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array<ChartDataElement> } data
 * @param { Array<ChartDataElement> } selectedPoints
 * @param { ChartOptions } options
 */
const drawScatterplotPoints = (
    ctx,
    data,
    selectedPoints,
    options
) => {

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

        const color = selectedPoints.includes(v) ? options.selectedColor : options.color;

        drawPoint(ctx, point.xValue, point.yValue, color, options.pointSize);
    }
};