// noinspection SpellCheckingInspection

import { drawPoint }        from "../../util/chartFunctions.js";
import { drawGrid }         from "../../util/chartGridFunctions.js";
import {
    calcXRatio,
    calcYRatio,
    domainToCanvasXY,
    pointDomainToCanvas
} from "../../util/geometryFunctions.js";
import { generateId }       from "../../util/functions.js";

export {
    SimpleScatterplotChart
}

/**
 * @typedef { Object } ScatterplotChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { Array.<String> } colors Colors for points
 * @property { !Number } pointSize size of scatterplot points
 * @property { GridOptions } gridOptions grid options
 */

/**
 * Implementation of a simple canvas bar chart.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { SimpleScatterplotControllerType } controller
 * @return { HTMLCanvasElement }
 */
const SimpleScatterplotChart = controller => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");

    canvasElement.id     = generateId('scatterplot');
    canvasElement.width  = 500;
    canvasElement.height = 400;

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    /**
     *
     * @returns {{gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: Number, xRatio: Number, yRatio: Number, xEvery: Number, drawOuterTicks: Boolean, canvasHeight: Number, yEvery: Number}, width: Number, colors: Array<String>, height: Number}}
     */
    const getOptions = () => {
        let { width, height } = canvasElement.getBoundingClientRect();
        width = width === 0 ? 500 : width;
        height = height === 0 ? 400 : height;

        const xMin = controller.xMin.getValue();
        const xMax = controller.xMax.getValue();
        const yMin = controller.yMin.getValue();
        const yMax = controller.yMax.getValue();

        const nullPoint = pointDomainToCanvas(
            width,
            height,
            xMin,
            xMax,
            yMin,
            yMax,
            { xValue: 0, yValue: 0 },
        );

        const xRatio = calcXRatio(width, xMin, xMax);
        const yRatio = calcYRatio(height, yMin, yMax);

        /** @type { ScatterplotChartOptions } */
        return {
            width,
            height,
            colors     : controller.getOptions().colors,
            pointSize  : 3,
            gridOptions: {
                nullPoint     : nullPoint,
                canvasWidth   : width,
                canvasHeight  : height,
                xRatio,
                yRatio,
                xEvery        : controller.getOptions().xEvery,
                yEvery        : controller.getOptions().yEvery,
                drawOuterTicks: controller.getOptions().drawOuterTicks,
            }
        }
    };

    /**
     *
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<ScatterplotChartDataElement> } data
     * @param { ScatterplotChartOptions } options
     */
    const drawScatterplotPoints = (
        ctx,
        data,
        options
    ) => {
        for (const v of data) {
            const point = domainToCanvasXY(options.gridOptions.nullPoint, options.gridOptions.xRatio, options.gridOptions.yRatio, v);

            drawPoint(ctx, point.xValue, point.yValue, options.colors[0], options.pointSize);
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
        drawGrid(ctx, options.gridOptions);
        drawScatterplotPoints(ctx, data, options);
    };

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
    };

    // TODO: register callback functions

    drawScatterplot(context, controller.getData(), getOptions());

    return canvasElement;
};