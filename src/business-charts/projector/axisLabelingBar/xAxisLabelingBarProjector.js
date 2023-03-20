// noinspection SpellCheckingInspection

import {
    drawText,
    drawTick,
    measureText,
    TICK_ORIENTATION
}                                from "../../util/chartLabelingFunctions.js";
import {
    calcXRatio,
    xCanvasToDomain,
    xDomainToCanvas
}                                from "../../util/geometryFunctions.js";
import { registerChangeHandler } from "../../util/changeHandler.js";

export { XAxisLabelingBarProjector }

/**
 *
 * @param { ChartControllerType } controller chart controller
 * @return { HTMLDivElement }
 * @constructor
 */
const XAxisLabelingBarProjector = (controller) => {
    /** @type { HTMLDivElement } */
    const xAxisLabelingBarElement = document.createElement("div");
    xAxisLabelingBarElement.classList.add("x-axis-labeling", "x-axis-labeling-grid");

    /** @type { HTMLCanvasElement } */
    const canvasElement  = document.createElement("canvas");
    canvasElement.width  = 500;
    canvasElement.height = 35;

    const ctx = canvasElement.getContext("2d");

    /**
     * @returns { ChartOptions }
     */
    const getOptions = () => {
        let { width, height }    = canvasElement.getBoundingClientRect();
        const pointSize          = 2;
        const pointColor         = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");
        const selectedPointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");

        width  = width === 0 ? 500 : width;
        height = height === 0 ? 35 : height;

        /** @type { ChartOptions } */
        return {
            width,
            height,
            boundaries   : controller.getBoundaries(),
            color        : pointColor,
            selectedColor: selectedPointColor,
            pointSize    : pointSize,
        }
    };

    const redraw = () => {
        const options = getOptions();
        const boundaries = controller.getBoundaries();

        ctx.clearRect(0, 0, options.width, options.height);

        const longestText = boundaries.xMin.length > boundaries.xMax.length
                            ? boundaries.xMin
                            : boundaries.xMax;

        const textWidth = measureText(ctx, longestText) + 20;

        const nullPointX = xDomainToCanvas(options.width, controller.xMin.getValue(), controller.xMax.getValue(), 0);
        const xRatio     = calcXRatio(options.width, controller.xMin.getValue(), controller.xMax.getValue());
        let xEvery = 1;

        while (xEvery * xRatio < textWidth) {
            xEvery++;
        }

        let xTick = nullPointX % (xRatio * xEvery); // 1 for xEvery
        xTick     = xTick < -5 ? xTick + xRatio * xEvery : xTick; // 1 for xEvery

        while (xTick < (options.width + 5)) {
            const text = Math.round(xCanvasToDomain(options.width, controller.xMin.getValue(), controller.xMax.getValue(), xTick));
            /** @type { CanvasPoint2D } */
            const pointTick = { xValue: xTick, yValue: 0 };
            const pointText = { xValue: xTick - measureText(ctx, text) / 2, yValue: 20 };

            drawTick(
                ctx,
                pointTick,
                TICK_ORIENTATION.DOWN
            );

            drawText(ctx, pointText, text);

            xTick += xRatio * xEvery; // 1 for xEvery
        }
    };

    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());

    registerChangeHandler(canvasElement, getOptions, redraw);

    redraw();

    xAxisLabelingBarElement.append(canvasElement);

    return xAxisLabelingBarElement;
};