// noinspection SpellCheckingInspection

import { drawPoint }               from "../../util/chartFunctions.js";
import { drawGrid }                from "../../util/chartGridFunctions.js";
import { 
    calcXRatio, 
    calcYRatio, 
    domainToCanvasXY, 
    pointDomainToCanvas } from "../../util/geometryFunctions.js";
import { generateId }              from "../../util/functions.js";
import { AxisControlBarProjector } from "../axisControlBar/axisControlBarProjector.js";

export { SimpleScatterChart }

/**
 * @typedef { Object } ScatterplotChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { String } color Color for points
 * @property { !Number } pointSize size of scatterplot points
 * @property { GridOptions } gridOptions grid options
 */

/**
 * @description Implementation of a simple scatter chart based on canvas.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { SimpleScatterChartControllerType } controller
 * @return { HTMLCanvasElement }
 */
const SimpleScatterChart = controller => {
    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");

    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    const yAxisBar = AxisControlBarProjector("Y_AXIS", { min: controller.yMin, max: controller.yMax });

    /** @type { HTMLCanvasElement } */ 
    const canvasElement = document.createElement("canvas");

    canvasElement.id     = generateId('scatter-chart');
    canvasElement.classList.add('scatter-chart-canvas');
    canvasElement.width  = 500;
    canvasElement.height = 325;

    chartElement.append(yAxisBar, canvasElement, xAxisBar);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    /**
     *
     * @returns {{gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: Number, xRatio: Number, yRatio: Number, xEvery: Number, drawOuterTicks: Boolean, canvasHeight: Number, yEvery: Number}, width: Number, colors: Array<String>, height: Number}}
     */
    const getOptions = () => {
        let { width, height } = canvasElement.getBoundingClientRect();
        const pointSize = Number(getComputedStyle(canvasElement).getPropertyValue("--data-point-size"));
        const pointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");

        width = width === 0 ? 500 : width;
        height = height === 0 ? 325 : height;

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
            { xValue: 0, yValue: 0 }
        );

        const xRatio = calcXRatio(width, xMin, xMax);
        const yRatio = calcYRatio(height, yMin, yMax);

        /** @type { ScatterplotChartOptions } */
        return {
            width,
            height,
            color      : pointColor,
            pointSize  : pointSize,
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
     * @description draws all data points
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<ScatterChartDataElement> } data
     * @param { ScatterplotChartOptions } options
     */
    const drawScatterplotPoints = (
        ctx,
        data,
        options
    ) => {
        for (const v of data) {
            const point = domainToCanvasXY(
                options.gridOptions.nullPoint, 
                options.gridOptions.xRatio, 
                options.gridOptions.yRatio, 
                v
            );

            drawPoint(ctx, point.xValue, point.yValue, options.color, options.pointSize);
        }
    };

    /**
     * @description 
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<ScatterChartDataElement> } data
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
     * @param { HTMLCanvasElement } element
     * @param { Array.<ScatterChartDataElement> } data
     * @param { ScatterplotChartOptions } options
     */
    const redrawScatterplot = (
        element,
        data,
        options,
    ) => {
        const ctx = element.getContext('2d');
        ctx.clearRect(0, 0, options.width, options.height);
        drawScatterplot(ctx, data, options);
    };

    //event listeners
    controller.xMin.onValueChanged(() => redrawScatterplot(canvasElement, controller.getData(), getOptions()));
    controller.xMax.onValueChanged(() => redrawScatterplot(canvasElement, controller.getData(), getOptions()));
    controller.yMin.onValueChanged(() => redrawScatterplot(canvasElement, controller.getData(), getOptions()));
    controller.yMax.onValueChanged(() => redrawScatterplot(canvasElement, controller.getData(), getOptions()));
    controller.onDataChanged(() => redrawScatterplot(canvasElement, controller.getData(), getOptions()));

    //resize
    const resizeHandler = new ResizeObserver((_) => {
        const options = getOptions();
        canvasElement.width = options.width;
        canvasElement.height = options.height;

        redrawScatterplot(canvasElement, controller.getData(), options);
    });
    resizeHandler.observe(canvasElement);

    const styleChangeHandler = new MutationObserver((_) => {
        const options = getOptions();
        redrawScatterplot(canvasElement, controller.getData(), options);
    });
    styleChangeHandler.observe(canvasElement, { attributes: true, attributeFilter: ["style"] });

    drawScatterplot(context, controller.getData(), getOptions());

    return chartElement;
};