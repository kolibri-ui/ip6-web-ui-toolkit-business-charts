// noinspection SpellCheckingInspection

import { drawPoint }        from "../../util/chartFunctions.js";
import { drawGrid }         from "../../util/chartGridFunctions.js";
import { domainToCanvasXY } from "../../util/geometryFunctions.js";

export {
    SimpleScatterplotChart,
    redrawScatterplot
}

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
 * @param { SimpleScatterplotControllerType } controller
 * @return { HTMLCanvasElement }
 */
const SimpleScatterplotChart = (controller) => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");

    // TODO: get id from controller
    const id = 'scatterplot-chart-43412543219';

    canvasElement.id     = id;
    canvasElement.width  = controller.getWidth();
    canvasElement.height = controller.getHeight();

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    const getOptions = () => {
        /** @type { ScatterplotChartOptions } */
        return {
            width      : controller.getWidth(),
            height     : controller.getHeight(),
            colors     : controller.getColors(),
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

    // TODO: register callback functions

    drawScatterplot(context, controller.getFilteredData(), getOptions());

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
    drawGrid(ctx, options.gridOptions);
    drawScatterplotPoints(ctx, data, options, 3);
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