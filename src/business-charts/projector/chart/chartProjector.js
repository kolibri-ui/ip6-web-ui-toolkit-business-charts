// noinspection SpellCheckingInspection

import { generateId }            from "../../util/functions.js";
import { drawGrid }              from "../../util/chartGridFunctions.js";
import { drawScatterplotPoints } from "../../util/scatterChartFunctions.js";
import { VALUE }                 from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { drawLinechartLine }     from "../../util/lineChartFunctions.js";
import { drawAreachartLine }     from "../../util/areaChartFunctions.js";

export { ChartProjector }

/**
 * @typedef { Object } ChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { String } color Color for points
 * @property { String } selectedColor Color for points
 * @property { !Number } pointSize size of scatterplot points
 * @property { DataBoundaries } dataBoundaries
 * @property { DataBoundaries } boundaries
 */

/**
 *
 * @param { !ChartControllerType } controller
 * @return { HTMLCanvasElement }
 */
const ChartProjector = (controller) => {
    // /** @type { HTMLDivElement } */
    // const chartElement = document.createElement("div");
    // chartElement.classList.add("chart-container", "chart-container-grid");

    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");


    canvasElement.id = generateId("chart");
    canvasElement.classList.add("chart-canvas");
    canvasElement.width  = 500;
    canvasElement.height = 325;

    /** @type { CanvasRenderingContext2D } */
    const ctx = canvasElement.getContext("2d");

    /**
     * @param { ?ChartDataSeriesControllerType } seriesController
     * @return { ChartOptions }
     */
    const getOptions = (seriesController) => {
        let { width, height }  = canvasElement.getBoundingClientRect();
        let pointSize          = Number(getComputedStyle(canvasElement).getPropertyValue(seriesController
                                                                                         ? `--data-point-size-${ seriesController.id }`
                                                                                         : "--data-point-size"));
        pointSize              = pointSize !== 0 ? pointSize : 3;
        let pointColor         = getComputedStyle(canvasElement).getPropertyValue(seriesController
                                                                                  ? `--data-point-color-${ seriesController.id }`
                                                                                  : "--data-point-color");
        pointColor             = pointColor !== '' ? pointColor : '#000000';
        let selectedPointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-selected-color");
        selectedPointColor     = selectedPointColor !== '' ? selectedPointColor : '#FF0000';

        width  = width === 0 ? 500 : width;
        height = height === 0 ? 325 : height;

        const xMin = controller.xMin.getValue();
        const xMax = controller.xMax.getValue();
        const yMin = seriesController ? seriesController.yMin.getValue() : controller.yMin.getValue();
        const yMax = seriesController ? seriesController.yMax.getValue() : controller.yMax.getValue();

        /** @type { ChartOptions } */
        return {
            width,
            height,
            color         : pointColor,
            selectedColor : selectedPointColor,
            pointSize     : pointSize,
            dataBoundaries: controller.boundaries,
            boundaries    : {
                xMin,
                xMax,
                yMin,
                yMax
            },
        }
    };

    /**
     * Redraw chart
     */
    const redraw = () => {
        const options = getOptions();
        ctx.clearRect(0, 0, options.width, options.height);

        drawGrid(ctx, options.width, options.height, options.boundaries);

        for (const seriesController of controller.series.getObs(VALUE).getValue()) {
            const seriesOptions = getOptions(seriesController);
            switch (seriesController.type) {
                case "scatter":
                    drawScatterplotPoints(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                    break;
                case "line":
                    drawLinechartLine(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                    break;
                case "area":
                    drawAreachartLine(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                    break;
            }
        }
    };

    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());
    controller.yMin.onValueChanged(() => redraw());
    controller.yMax.onValueChanged(() => redraw());

    const resizeHandler = new ResizeObserver((_) => {
        const { width, height } = canvasElement.getBoundingClientRect();
        canvasElement.width     = width;
        canvasElement.height    = height;

        redraw();
    });
    resizeHandler.observe(canvasElement);

    const styleChangeHandler = new MutationObserver((_) => redraw());
    styleChangeHandler.observe(document.documentElement, { attributes: true, attributeFilter: [ "style" ] });

    return canvasElement;
};