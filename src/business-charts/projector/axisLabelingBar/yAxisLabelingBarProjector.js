// noinspection SpellCheckingInspection

import {
    drawText,
    drawTick,
    measureText,
    TICK_ORIENTATION
}                                from "../../util/chartLabelingFunctions.js";
import {
    calcYRatio,
    yCanvasToDomain,
    yDomainToCanvas
}                                from "../../util/geometryFunctions.js";
import { drawRect }              from "../../util/chartFunctions.js";
import { registerChangeHandler } from "../../util/changeHandler.js";

export { YAxisLabelingBarProjector }

/**
 *
 * @param { ChartControllerType } controller
 * @return {HTMLDivElement}
 * @constructor
 */
const YAxisLabelingBarProjector = (controller) => {
    /** @type { HTMLDivElement } */
    const yAxisLabelingBarElement = document.createElement("div");
    yAxisLabelingBarElement.classList.add("y-axis-labeling");

    for (const serie of controller.getSeries()) {
        /** @type { HTMLCanvasElement } */
        const canvasElement  = document.createElement("canvas");
        canvasElement.width  = 35;
        canvasElement.height = 325;

        const ctx = canvasElement.getContext("2d");

        /**
         * @returns { ChartOptions }
         */
        const getOptions = () => {
            let { width, height }    = canvasElement.getBoundingClientRect();
            const pointSize          = 2;
            const pointColor         = getComputedStyle(canvasElement).getPropertyValue(`--data-point-color-${ serie.id }`);
            const selectedPointColor = getComputedStyle(canvasElement).getPropertyValue(`--data-point-color-${ serie.id }`);

            width  = width === 0 ? 500 : width;
            height = height === 0 ? 35 : height;

            /** @type { ChartOptions } */
            return {
                width,
                height,
                boundaries   : controller.boundaries,
                color        : pointColor,
                selectedColor: selectedPointColor,
                pointSize    : pointSize,
            }
        };

        const redraw = () => {
            const options = getOptions();

            ctx.clearRect(0, 0, options.width, options.height);

            drawRect(ctx, { xValue: 0, yValue: 0 }, options.width, options.height, {
                color      : options.color,
                borderColor: options.color,
                alpha      : 0.6,
                border     : true
            });

            const nullPointY = yDomainToCanvas(options.height, serie.yMin.getValue(), serie.yMax.getValue(), 0);
            const yRatio     = calcYRatio(options.height, serie.yMin.getValue(), serie.yMax.getValue());
            let yEvery       = 1;

            while (yEvery * yRatio < 25) {
                yEvery++;
            }

            let yTick = nullPointY % (yRatio * yEvery);
            yTick     = yTick < -5 ? yTick + yRatio * yEvery : yTick;

            while (yTick < (options.height + 5)) {
                const text      = Math.round(yCanvasToDomain(options.height, serie.yMin.getValue(), serie.yMax.getValue(), yTick));
                const textWidth = measureText(ctx, text);

                /** @type { CanvasPoint2D } */
                const pointTick = { xValue: 35, yValue: yTick };
                const pointText = { xValue: 35 - textWidth - 10, yValue: yTick + 5 };

                drawTick(
                    ctx,
                    pointTick,
                    TICK_ORIENTATION.LEFT
                );

                drawText(ctx, pointText, text);

                yTick += yRatio * yEvery; // 1 for xEvery
            }
        };

        serie.yMin.onValueChanged(() => redraw());
        serie.yMax.onValueChanged(() => redraw());

        registerChangeHandler(canvasElement, getOptions, redraw);

        redraw();

        yAxisLabelingBarElement.append(canvasElement);
    }

    return yAxisLabelingBarElement;
};