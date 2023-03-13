// noinspection SpellCheckingInspection

import {
    ChartProjector,
    getCanvasPositionForPointFunc,
    getDataPointsForPositionFunc,
    optionsFunc,
    redrawFunc,
    setCanvasBoundariesFunc
}                                        from "./chartProjector.js";
import { SimpleAxisControlBarProjector } from "../axisControlBar/simpleAxisControlBarProjector.js";
import { ToolBarProjector }              from "../toolBar/toolBarProjector.js";

export { SimpleChartProjector }

/**
 *
 * @param { !ChartControllerType } controller
 * @return { HTMLDivElement }
 */
const SimpleChartProjector = (controller) => {
    if (controller.getSeries().length !== 1) {
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
        min: controller.getSeries()[0].yMin,
        max: controller.getSeries()[0].yMax
    });

    const getOptions = optionsFunc(canvasElement, controller);
    const redraw = redrawFunc(canvasElement, controller, getOptions);
    const getDataPointsForPosition = getDataPointsForPositionFunc(controller, getOptions);
    const setCanvasBoundaries = setCanvasBoundariesFunc(controller, getOptions);
    const getCanvasPositionForPoint = getCanvasPositionForPointFunc(controller, getOptions);

    ToolBarProjector(
        controller.toolBarController,
        {
            getOptions,
            getDataPointsForPosition,
            selectDataPoints: controller.setSelectedElements,
            getSelectedDataPoints: controller.getSelectedElements,
            getCanvasPositionForPoint,
            setCanvasBoundaries,
            redraw
        },
        canvasElement
    );

    chartElement.append(yAxisBar, canvasWrapperElement, xAxisBar);

    return chartElement;
};