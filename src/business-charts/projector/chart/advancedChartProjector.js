// noinspection SpellCheckingInspection

import {
    ChartProjector,
    getCanvasPositionForPointFunc,
    getDataPointsForPositionFunc,
    optionsFunc,
    redrawFunc,
    setCanvasBoundariesFunc
} from "./chartProjector.js";
import { AdvancedXAxisControlBarProjector } from "../axisControlBar/advancedXAxisControlBarProjector.js";
import { ToolBarProjector }                 from "../toolBar/toolBarProjector.js";

export { AdvancedChartProjector }

/**
 *
 * @param { !ChartControllerType } controller
 * @return { HTMLDivElement }
 */
const AdvancedChartProjector = (controller) => {
    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container", "chart-container-grid");

    const canvasElement = ChartProjector(controller);

    /** @type { HTMLDivElement } */
    const canvasWrapperElement = document.createElement("div");
    canvasWrapperElement.classList.add("canvas-wrap", "canvas-wrap-grid");
    canvasWrapperElement.append(canvasElement);

    const xAxisBar = AdvancedXAxisControlBarProjector(controller);

    const getOptions = optionsFunc(canvasElement, controller);
    const redraw = redrawFunc(canvasElement, controller, getOptions);
    const getDataPointsForPosition = getDataPointsForPositionFunc(controller, getOptions);
    const setCanvasBoundaries = setCanvasBoundariesFunc(controller, getOptions);
    const getCanvasPositionForPoint = getCanvasPositionForPointFunc(controller, getOptions);

    const toolBar = ToolBarProjector(
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

    chartElement.append(toolBar, canvasWrapperElement, xAxisBar);

    return chartElement;
};