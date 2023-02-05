import { domainToCanvasXY } from "./geometryFunctions.js";
import { drawPoint }        from "./chartFunctions.js";

export { drawScatterplotPoints }

/**
 * @description draws all data points
 * @param { CanvasRenderingContext2D } ctx
 * @param { Array.<ScatterChartDataElement> } data
 * @param { Array.<ScatterChartDataElement> } selectedPoints
 * @param { ScatterplotChartOptions } options
 */
const drawScatterplotPoints = (
    ctx,
    data,
    selectedPoints,
    options
) => {
    for (const v of data) {
        const point = domainToCanvasXY(
            options.gridOptions.nullPoint,
            options.gridOptions.xRatio,
            options.gridOptions.yRatio,
            v
        );

        const color = selectedPoints.includes(v) ? options.selectedColor : options.color;

        drawPoint(ctx, point.xValue, point.yValue, color, options.pointSize);
    }
};