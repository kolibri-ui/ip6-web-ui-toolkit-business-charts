// noinspection SpellCheckingInspection

import {
    drawPoint
}                                  from "../../util/chartFunctions.js";
import { drawGrid }                from "../../util/chartGridFunctions.js";
import {
    calcXRatio,
    calcYRatio,
    domainToCanvasXY,
    pointCanvasToDomain,
    pointDomainToCanvas
}                                  from "../../util/geometryFunctions.js";
import { generateId }                    from "../../util/functions.js";
import { SimpleAxisControlBarProjector } from "../simpleAxisControlBar/simpleAxisControlBarProjector.js";
import { ToolBarProjector }              from "../toolBar/toolBarProjector.js";

export { SimpleScatterChart }

/**
 * @typedef { Object } ScatterplotChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { String } color Color for points
 * @property { String } selectedColor Color for points
 * @property { !Number } pointSize size of scatterplot points
 * @property { GridOptions } gridOptions grid options
 */

/**
 * @description Implementation of a simple scatter chart based on canvas.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { SimpleScatterChartControllerType } controller
 * @return { HTMLCanvasElement }
 */
const SimpleScatterChart = (controller) => {
    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");

    /** @type { HTMLCanvasElement } */
    const canvasElement        = document.createElement("canvas");
    const canvasWrapperElement = document.createElement('div');
    canvasWrapperElement.classList.add('canvas-wrap');
    canvasWrapperElement.append(canvasElement);

    canvasElement.id = generateId('scatter-chart');
    canvasElement.classList.add('scatter-chart-canvas');
    canvasElement.width  = 500;
    canvasElement.height = 325;

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    /**
     *
     * @returns { ScatterplotChartOptions }
     */
    const getOptions = () => {
        let { width, height }    = canvasElement.getBoundingClientRect();
        const pointSize          = Number(getComputedStyle(canvasElement).getPropertyValue("--data-point-size"));
        const pointColor         = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");
        const selectedPointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-selected-color");

        width  = width === 0 ? 500 : width;
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
            selectedColor: selectedPointColor,
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
        const selectedPoints = controller.getSelectedElements();
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

    const redraw = () => redrawScatterplot(canvasElement, controller.getData(), getOptions());

    const setCanvasBoundaries = (xMin, xMax, yMin, yMax) => {
        const options = getOptions();

        const domainStart = pointCanvasToDomain(
            options.width,
            options.height,
            controller.xMin.getValue(),
            controller.xMax.getValue(),
            controller.yMin.getValue(),
            controller.yMax.getValue(),
            {
                xValue: xMin,
                yValue: yMin
            }
        );
        const domainEnd   = pointCanvasToDomain(
            options.width,
            options.height,
            controller.xMin.getValue(),
            controller.xMax.getValue(),
            controller.yMin.getValue(),
            controller.yMax.getValue(),
            {
                xValue: xMax,
                yValue: yMax
            }
        );

        controller.xMin.setValue(Math.min(...[ domainStart.xValue, domainEnd.xValue ]));
        controller.xMax.setValue(Math.max(...[ domainStart.xValue, domainEnd.xValue ]));
        controller.yMin.setValue(Math.min(...[ domainStart.yValue, domainEnd.yValue ]));
        controller.yMax.setValue(Math.max(...[ domainStart.yValue, domainEnd.yValue ]));
    };

    const getDataPointsForPosition = (canvasX, canvasY) => {
        const points = [];
        const options = getOptions();
        for (const point of controller.getData()) {
            const pointCanvas = pointDomainToCanvas(
                options.width,
                options.height,
                controller.xMin.getValue(),
                controller.xMax.getValue(),
                controller.yMin.getValue(),
                controller.yMax.getValue(),
                point
            );

            const dx = pointCanvas.xValue - canvasX;
            const dy = pointCanvas.yValue - canvasY;

            const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            if (dist <= options.pointSize) {
                points.push(point);
            }
        }

        return points;
    };

    /**
     *
     * @param { DomainPoint2D } point
     * @returns {CanvasPoint2D}
     */
    const getCanvasPositionForPoint = (point) => {
        const options = getOptions();
        return pointDomainToCanvas(
            options.width,
            options.height,
            controller.xMin.getValue(),
            controller.xMax.getValue(),
            controller.yMin.getValue(),
            controller.yMax.getValue(),
            point
        );
    };

    //event listeners
    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());
    controller.yMin.onValueChanged(() => redraw());
    controller.yMax.onValueChanged(() => redraw());
    controller.onDataChanged(() => redraw());
    controller.onSelectedElementsChanged(() => redraw());

    //resize
    const resizeHandler = new ResizeObserver((_) => {
        const options        = getOptions();
        canvasElement.width  = options.width;
        canvasElement.height = options.height;

        redrawScatterplot(canvasElement, controller.getData(), options);
    });
    resizeHandler.observe(canvasElement);

    const styleChangeHandler = new MutationObserver((_) => {
        const options = getOptions();
        redrawScatterplot(canvasElement, controller.getData(), options);
    });
    styleChangeHandler.observe(canvasElement, { attributes: true, attributeFilter: [ "style" ] });

    drawScatterplot(context, controller.getData(), getOptions());

    const xAxisBar = SimpleAxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    const yAxisBar = SimpleAxisControlBarProjector("Y_AXIS", { min: controller.yMin, max: controller.yMax });

    const toolBar = ToolBarProjector(
        controller.toolBarController,
        {
            getOptions,
            getDataPointsForPosition,
            selectDataPoint: controller.setSelectedElements,
            getCanvasPositionForPoint,
            setCanvasBoundaries,
            redraw
        },
        canvasElement
    );

    chartElement.append(toolBar, yAxisBar, canvasWrapperElement, xAxisBar);

    return chartElement;
};