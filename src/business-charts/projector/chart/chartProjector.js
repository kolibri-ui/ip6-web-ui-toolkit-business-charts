// noinspection SpellCheckingInspection

import { drawGrid }              from "../../util/chartGridFunctions.js";
import { drawScatterplotPoints } from "../../util/scatterChartFunctions.js";
import { drawLinechartLine }     from "../../util/lineChartFunctions.js";
import { drawAreachartArea }     from "../../util/areaChartFunctions.js";
import {
    pointCanvasToDomain,
    pointDomainToCanvas
}                                from "../../util/geometryFunctions.js";
import {
    AREA_CHART,
    LINE_CHART,
    SCATTER_CHART
}                                from "./chartController.js";
import { registerChangeHandler } from "../../util/changeHandler.js";

export {
    ChartProjector,
    optionsFunc,
    redrawFunc,
    getDataPointsForPositionFunc,
    setCanvasBoundariesFunc,
    getCanvasPositionForPointFunc
}


/**
 * @typedef { Object } MinMaxValues
 * @property { Number } min
 * @property { Number } max
 */

/**
 * @typedef { Object } AreaValues
 * @property { Number } area
 * @property { Number } areaMax
 */

/**
 * @typedef { Object } ChartDataElementAndSerie
 * @property { ChartDataElement } point
 * @property { ChartDataSeriesControllerType } serie
 */

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
    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");


    canvasElement.id = `chart-${controller.id}`;
    canvasElement.classList.add("chart-canvas");
    canvasElement.width  = 500;
    canvasElement.height = 325;

    /**
     * @param { ?ChartDataSeriesControllerType } seriesController
     * @return { ChartOptions }
     */
    const getOptions = optionsFunc(canvasElement, controller);

    /**
     * Redraw chart
     */
    const redraw = redrawFunc(canvasElement, controller, getOptions);

    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());
    controller.yMin.onValueChanged(() => redraw());
    controller.yMax.onValueChanged(() => redraw());
    controller.onSelectedElementsChanged(() => redraw());
    controller.onBoundariesChanged(() => redraw());

    registerChangeHandler(canvasElement, getOptions, redraw);

    return canvasElement;
};

/**
 * @param { HTMLCanvasElement } canvasElement
 * @param { !ChartControllerType } controller
 * @return { (seriesController: ?ChartDataSeriesControllerType) => ChartOptions }
 */
const optionsFunc = (canvasElement, controller) => (seriesController) => {
    let { width, height }  = canvasElement.getBoundingClientRect();
    let pointSize          = Number(getComputedStyle(canvasElement).getPropertyValue(seriesController
                                                                                     ? `--data-point-size-${controller.id}-${ seriesController.id }`
                                                                                     : "--data-point-size"));
    pointSize              = pointSize !== 0 ? pointSize : 3;
    let pointColor         = getComputedStyle(canvasElement).getPropertyValue(seriesController
                                                                              ? `--data-point-color-${controller.id}-${ seriesController.id }`
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
        dataBoundaries: controller.getBoundaries(),
        boundaries    : {
            xMin,
            xMax,
            yMin,
            yMax
        },
    }
};

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { ChartControllerType } controller
 * @param { (seriesController: ?ChartDataSeriesControllerType) => ChartOptions } getOptions
 * @return { () => void }
 */
const redrawFunc = (canvasElement, controller, getOptions) => () => {
    const ctx     = canvasElement.getContext("2d");
    const options = getOptions();

    ctx.clearRect(0, 0, options.width, options.height);

    drawGrid(ctx, options.width, options.height, options.boundaries);

    for (const seriesController of controller.getSeries()) {
        const seriesOptions = getOptions(seriesController);

        switch (seriesController.type) {
            case SCATTER_CHART:
                drawScatterplotPoints(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                break;
            case LINE_CHART:
                drawLinechartLine(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                break;
            case AREA_CHART:
                drawAreachartArea(ctx, seriesController.getData(), controller.getSelectedElements(), seriesOptions);
                break;
        }
    }
};

/**
 *
 * @param { ChartControllerType } controller
 * @param { (seriesController: ?ChartDataSeriesControllerType) => ChartOptions } getOptions
 * @return { (canvasX: Number, canvasY: Number) => Array<ChartDataElementAndSerie> }
 */
const getDataPointsForPositionFunc = (controller, getOptions) => (canvasX, canvasY) => {
    const points = [];
    for (const serie of controller.getSeries()) {
        const options = getOptions(serie);
        for (const point of serie.getData()) {
            const pointCanvas = pointDomainToCanvas(
                options.width,
                options.height,
                {
                    xValue: controller.xMin.getValue(),
                    yValue: serie.yMin.getValue(),
                },
                {
                    xValue: controller.xMax.getValue(),
                    yValue: serie.yMax.getValue(),
                },
                point
            );

            const dx = pointCanvas.xValue - canvasX;
            const dy = pointCanvas.yValue - canvasY;

            const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

            if (dist <= options.pointSize) {
                points.push({ point, serie });
            }
        }
    }

    return points;
};

/**
 *
 * @param { ChartControllerType } controller
 * @param { (seriesController: ?ChartDataSeriesControllerType) => ChartOptions } getOptions
 * @return { (xMin: Number, xMax: Number, yMin: Number, yMax: Number) => void }
 */
const setCanvasBoundariesFunc = (controller, getOptions) => (xMin, xMax, yMin, yMax) => {
    const options = getOptions();

    const domainStart = pointCanvasToDomain(
        options.width,
        options.height,
        {
            xValue: controller.xMin.getValue(),
            yValue: controller.yMin.getValue(),
        },
        {
            xValue: controller.xMax.getValue(),
            yValue: controller.yMax.getValue(),
        },
        {
            xValue: xMin,
            yValue: yMin
        }
    );
    const domainEnd   = pointCanvasToDomain(
        options.width,
        options.height,
        {
            xValue: controller.xMin.getValue(),
            yValue: controller.yMin.getValue(),
        },
        {
            xValue: controller.xMax.getValue(),
            yValue: controller.yMax.getValue(),
        },
        {
            xValue: xMax,
            yValue: yMax
        }
    );

    /**
     *
     * @param { SimpleInputControllerType } min
     * @param { SimpleInputControllerType } max
     * @param { MinMaxValues } boundaries
     * @param { MinMaxValues } minMax
     * @param { AreaValues } area
     */
    const setBoundaries = (min, max, boundaries, minMax, area) => {
        if (area.area > area.areaMax) {
            min.setValue(boundaries.min);
            max.setValue(boundaries.max);
        } else if (minMax.min < boundaries.min) {
            min.setValue(boundaries.min);
            max.setValue(boundaries.min + area.area);
        } else if (minMax.max > boundaries.max) {
            min.setValue(boundaries.max - area.area);
            max.setValue(boundaries.max);
        } else {
            min.setValue(minMax.min);
            max.setValue(minMax.max);
        }
    };

    const xMaxArea = Math.abs(options.dataBoundaries.xMin - options.dataBoundaries.xMax);
    const xArea    = Math.abs(domainStart.xValue - domainEnd.xValue);
    const xMinimum = Math.min(...[ domainStart.xValue, domainEnd.xValue ]);
    const xMaximum = Math.max(...[ domainStart.xValue, domainEnd.xValue ]);

    setBoundaries(
        controller.xMin,
        controller.xMax,
        {
            min: options.dataBoundaries.xMin,
            max: options.dataBoundaries.xMax,
        },
        {
            min: xMinimum,
            max: xMaximum,
        },
        {
            area   : xArea,
            areaMax: xMaxArea,
        }
    );

    const yMaxArea = Math.abs(options.dataBoundaries.yMin - options.dataBoundaries.yMax);
    const yArea    = Math.abs(domainStart.yValue - domainEnd.yValue);
    const yMinimum = Math.min(...[ domainStart.yValue, domainEnd.yValue ]);
    const yMaximum = Math.max(...[ domainStart.yValue, domainEnd.yValue ]);

    setBoundaries(
        controller.yMin,
        controller.yMax,
        {
            min: options.dataBoundaries.yMin,
            max: options.dataBoundaries.yMax,
        },
        {
            min: yMinimum,
            max: yMaximum,
        },
        {
            area   : yArea,
            areaMax: yMaxArea,
        }
    );
};

/**
 *
 * @param { ChartControllerType } controller
 * @param { (seriesController: ?ChartDataSeriesControllerType) => ChartOptions } getOptions
 * @return { ( DomainPoint2D ) => CanvasPoint2D }
 */
const getCanvasPositionForPointFunc = (controller, getOptions) => (point) => {
    let options = getOptions();
    for (const serie of controller.getSeries()) {
        if (serie.getData().includes(point)) {
            options = getOptions(serie);
            return pointDomainToCanvas(
                options.width,
                options.height,
                {
                    xValue: controller.xMin.getValue(),
                    yValue: serie.yMin.getValue(),
                },
                {
                    xValue: controller.xMax.getValue(),
                    yValue: serie.yMax.getValue(),
                },
                point
            );
        }
    }
};