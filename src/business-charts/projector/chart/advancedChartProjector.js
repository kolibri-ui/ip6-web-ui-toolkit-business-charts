// noinspection SpellCheckingInspection

import {
    ChartProjector,
    getCanvasPositionForPointFunc,
    getDataPointsForPositionFunc,
    optionsFunc,
    redrawFunc,
    setCanvasBoundariesFunc
}                                           from "./chartProjector.js";
import { AdvancedXAxisControlBarProjector } from "../axisControlBar/advancedXAxisControlBarProjector.js";
import { ToolBarProjector }                 from "../toolBar/toolBarProjector.js";
import { XAxisLabelingBarProjector }        from "../axisLabelingBar/xAxisLabelingBarProjector.js";
import { YAxisLabelingBarProjector }        from "../axisLabelingBar/yAxisLabelingBarProjector.js";

export { AdvancedChartProjector }

/**
 * @description chart projector for more than one data serie
 * @param { !ChartControllerType } controller chatrt controller
 * @return { HTMLDivElement }
 * @example
 * required controller: ScatterChartController || LineChartController || AreaChartController || ChartController
 * 
 * document.getElementById('container').append(AdvancedChartProjector(controller));
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

    const xAxisLabelingBar = XAxisLabelingBarProjector(controller);
    const yAxisLabelingBar = YAxisLabelingBarProjector(controller);
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

    chartElement.append(toolBar, yAxisLabelingBar, canvasWrapperElement, xAxisLabelingBar, xAxisBar);

    return chartElement;
};