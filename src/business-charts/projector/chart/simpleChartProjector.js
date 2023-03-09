// noinspection SpellCheckingInspection

import { ChartProjector } from "./chartProjector.js";
import { SimpleAxisControlBarProjector } from "../axisControlBar/simpleAxisControlBarProjector.js";
import { VALUE } from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

export { SimpleChartProjector }

/**
 *
 * @param { !ChartControllerType } controller
 * @return { HTMLDivElement }
 */
const SimpleChartProjector = (controller) => {
    if (controller.series.getObs(VALUE).getValue().length !== 1) {
        throw new Error("SimpleChartProjector only supports one data serie!")
    }

    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container", "chart-container-grid");

    const canvasElement = ChartProjector(controller);

    /** @type { HTMLDivElement } */
    const canvasWrapperElement = document.createElement("div");
    canvasWrapperElement.classList.add("canvas-wrap", "canvas-wrap-grid");
    canvasWrapperElement.append(canvasElement);

    const xAxisBar = SimpleAxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    const yAxisBar = SimpleAxisControlBarProjector("Y_AXIS", {
        min: controller.series.getObs(VALUE).getValue()[0].yMin,
        max: controller.series.getObs(VALUE).getValue()[0].yMax
    });

    chartElement.append(yAxisBar, canvasWrapperElement, xAxisBar);

    return chartElement;
};