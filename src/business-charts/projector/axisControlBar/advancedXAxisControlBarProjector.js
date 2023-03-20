// noinspection SpellCheckingInspection

import { drawScatterplotPoints } from "../../util/scatterChartFunctions.js";
import {
    xCanvasToDomain,
    xDomainToCanvas
}                                from "../../util/geometryFunctions.js";
import {
    drawLine,
    drawRect
}                                from "../../util/chartFunctions.js";
import {
    AREA_CHART,
    LINE_CHART,
    SCATTER_CHART
}                                from "../chart/chartController.js";
import { drawLinechartLine }     from "../../util/lineChartFunctions.js";
import { drawAreachartArea }     from "../../util/areaChartFunctions.js";
import { registerChangeHandler } from "../../util/changeHandler.js";

export { AdvancedXAxisControlBarProjector }

/**
 *
 * @param { ChartControllerType } controller chart controller
 * @returns {HTMLDivElement}
 */
const AdvancedXAxisControlBarProjector = (controller) => {
    /** @type { HTMLDivElement } */
    const xAxisControlBarElement = document.createElement("div");
    xAxisControlBarElement.classList.add("x-axis");

    /** @type { HTMLCanvasElement } */
    const canvasElement  = document.createElement("canvas");
    canvasElement.width  = 500;
    canvasElement.height = 80;

    /**
     * @param { ?ChartDataSeriesControllerType } serieController optional serie controller to get options specific for
     *     serie
     * @returns { ChartOptions }
     */
    const getOptions = (serieController) => {
        let { width, height }    = canvasElement.getBoundingClientRect();
        const pointSize          = 2;
        const pointColor         = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");
        const selectedPointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");

        width  = width === 0 ? 500 : width;
        height = height === 0 ? 85 : height;

        const boundaries = {
            xMin: controller.getBoundaries().xMin,
            xMax: controller.getBoundaries().xMax,
            yMin: serieController
                  ? controller.getBoundaries().yMin * serieController.factor.getValue()
                  : controller.getBoundaries().yMin,
            yMax: serieController
                  ? controller.getBoundaries().yMax * serieController.factor.getValue()
                  : controller.getBoundaries().yMax,
        };

        /** @type { ChartOptions } */
        return {
            width,
            height,
            boundaries,
            color        : pointColor,
            selectedColor: selectedPointColor,
            pointSize    : pointSize,
        }
    };

    const redraw = () => {
        const options = getOptions();

        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, options.width, options.height);

        for (const seriesController of controller.getSeries()) {
            const seriesOptions = getOptions(seriesController);

            switch (seriesController.type) {
                case SCATTER_CHART:
                    drawScatterplotPoints(ctx, seriesController.getData(), [], seriesOptions);
                    break;
                case LINE_CHART:
                    drawLinechartLine(ctx, seriesController.getData(), [], seriesOptions);
                    break;
                case AREA_CHART:
                    drawAreachartArea(ctx, seriesController.getData(), [], seriesOptions);
                    break;
            }
        }

        const xMinimum = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaximum = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );

        const width = xMaximum - xMinimum;

        const areaColor   = getComputedStyle(canvasElement).getPropertyValue("--advanced-control-bar-area-color");
        const borderColor = getComputedStyle(canvasElement).getPropertyValue("--advanced-control-bar-border-color");

        drawRect(ctx, { xValue: xMinimum, yValue: 0 }, width, options.height, { color: areaColor, alpha: 0.2 });
        drawLine(ctx, { xValue: xMinimum, yValue: 0 }, { xValue: xMinimum, yValue: options.height }, borderColor, 2);
        drawLine(ctx, { xValue: xMaximum, yValue: 0 }, { xValue: xMaximum, yValue: options.height }, borderColor, 2);
    };

    let mouseStartX;
    let resizeActive = false;
    /** @type { 'CHANGE_MIN'|'CHANGE_MAX'|'CHANGE_POS' } */
    let changeType;

    canvasElement.onmousedown = (event) => {
        const options = getOptions();
        const xMinPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaxPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );
        const rect    = canvasElement.getBoundingClientRect();
        mouseStartX   = event.x - rect.left;

        if ((xMinPos - 5) < mouseStartX && (xMaxPos + 5) > mouseStartX) {
            resizeActive = true;

            if ((xMinPos + 5) > mouseStartX) {
                changeType = 'CHANGE_MIN';
            } else if ((xMaxPos - 5) < mouseStartX) {
                changeType = 'CHANGE_MAX';
            } else {
                changeType = 'CHANGE_POS';
            }
        }

    };

    canvasElement.onmousemove = (event) => {
        const options = getOptions();
        const rect    = canvasElement.getBoundingClientRect();

        const xMinPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaxPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );
        const posX    = event.x - rect.left;

        if (resizeActive) {
            const moveX = posX - mouseStartX;

            const changeMin = () => {
                const xMin     = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMin.getValue());
                const changedX = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMin
                                                                                                                  + moveX);
                if (changedX < options.boundaries.xMin) {
                    controller.xMin.setValue(options.boundaries.xMin);
                } else {
                    controller.xMin.setValue(changedX);
                }
            };

            const changeMax = () => {
                const xMax     = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMax.getValue());
                const changedX = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMax
                                                                                                                  + moveX);
                if (changedX > options.boundaries.xMax) {
                    controller.xMax.setValue(options.boundaries.xMax);
                } else {
                    controller.xMax.setValue(changedX);
                }
            };

            const changeMinMax = () => {
                const xMin        = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMin.getValue());
                const xMax        = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMax.getValue());
                const changedXMin = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMin
                                                                                                                     + moveX);
                const changedXMax = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMax
                                                                                                                     + moveX);
                if (changedXMin >= options.boundaries.xMin && changedXMax <= options.boundaries.xMax) {
                    controller.xMin.setValue(changedXMin);
                    controller.xMax.setValue(changedXMax);
                }
            };

            if (changeType === 'CHANGE_MIN') {
                changeMin();
            } else if (changeType === 'CHANGE_MAX') {
                changeMax();
            } else {
                changeMinMax()
            }

            mouseStartX = posX;
        } else {
            if ((xMinPos - 5) < posX && (xMaxPos + 5) > posX) {
                if ((xMinPos + 5) > posX || (xMaxPos - 5) < posX) {
                    canvasElement.classList.add('control-bar-resize');
                    canvasElement.classList.remove('control-bar-move');
                } else {
                    canvasElement.classList.add('control-bar-move');
                    canvasElement.classList.remove('control-bar-resize');
                }
            } else {
                canvasElement.classList.remove('control-bar-move');
                canvasElement.classList.remove('control-bar-resize');
            }
        }
    };

    canvasElement.onmouseenter = (event) => {
        if (event.buttons === 0) {
            resizeActive = false;
        }
    };

    canvasElement.onmouseup = (_) => {
        resizeActive = false;
    };

    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());
    controller.onBoundariesChanged(() => redraw());

    registerChangeHandler(canvasElement, getOptions, redraw);

    redraw();

    xAxisControlBarElement.append(canvasElement);

    return xAxisControlBarElement;
};