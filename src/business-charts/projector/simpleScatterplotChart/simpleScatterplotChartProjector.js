// noinspection SpellCheckingInspection

import { drawPoint }        from "../../util/chartFunctions.js";
import { drawGrid }         from "../../util/chartGridFunctions.js";
import { domainToCanvasXY } from "../../util/geometryFunctions.js";

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
const SimpleScatterplotChart = (controller) => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");

    canvasElement.id     = controller.getId();
    canvasElement.width  = controller.getWidth();
    canvasElement.height = controller.getHeight();

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    /**
     *
     * @returns {{gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: Number, xRatio: Number, yRatio: Number, xEvery: Number, drawOuterTicks: Boolean, canvasHeight: Number, yEvery: Number}, width: Number, colors: Array<String>, height: Number}}
     */
    const getOptions = () => {
        /** @type { ScatterplotChartOptions } */
        return {
            width      : controller.getWidth(),
            height     : controller.getHeight(),
            colors     : controller.getColors(),
            pointSize  : 3,
            gridOptions: {
                nullPoint     : controller.getDomainNullPoint(),
                canvasWidth   : controller.getWidth(),
                canvasHeight  : controller.getHeight(),
                xRatio        : controller.getXRatio(),
                yRatio        : controller.getYRatio(),
                xEvery        : controller.getXEvery(),
                yEvery        : controller.getYEvery(),
                drawOuterTicks: controller.getDrawOuterTicks(),
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

    // TODO: register callback functions

    drawScatterplot(context, controller.getFilteredData(), getOptions());

    return canvasElement;
};