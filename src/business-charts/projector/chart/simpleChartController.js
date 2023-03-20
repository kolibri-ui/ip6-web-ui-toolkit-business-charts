// noinspection SpellCheckingInspection

import {
    AREA_CHART,
    ChartController,
    LINE_CHART,
    SCATTER_CHART
}                                     from "./chartController.js";
import { bubbleTooltipSelectionTool } from "../toolBar/tools/SelectionTool.js";

export {
    SimpleScatterChartController,
    SimpleLineChartController,
    SimpleAreaChartController
}

/**
 *
 * @param { ChartDataSerie } dataSerie data serie
 * @param { ChartOptions }   opts chart options
 * @return { ChartControllerType }
 */
const SimpleChartController = (dataSerie, opts) => {
    if(!opts || !opts.tools) {
        opts = {
            ...opts,
            tools: [bubbleTooltipSelectionTool]
        }
    }
    const controller = ChartController([ dataSerie ], opts);

    /**
     *
     * @type { ChartDataSeriesControllerType }
     */
    const serieController = controller.getSeries()[0];
    const minMaxX = minMaxRule(controller.xMin, controller.xMax);
    const minMaxY = minMaxRule(serieController.yMin, serieController.yMax);

    controller.xMin.onValueChanged(() => minMaxX("MIN"));
    controller.xMax.onValueChanged(() => minMaxX("MAX"));
    serieController.yMin.onValueChanged(() => minMaxY("MIN"));
    serieController.yMax.onValueChanged(() => minMaxY("MAX"));

    serieController.yMin.onValueChanged(() => controller.yMin.setValue(serieController.yMin.getValue()
                                                                       / serieController.factor.getValue()));
    serieController.yMax.onValueChanged(() => controller.yMax.setValue(serieController.yMax.getValue()
                                                                       / serieController.factor.getValue()));

    return controller;
};

/**
 * @description scatter chart controller for one data serie
 * @param { Array<ChartDataElement> } data array of data elements
 * @param { ChartOptions }            opts chart options
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleScatterChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleScatterChartController = (data, opts) => SimpleChartController({ type: SCATTER_CHART, data }, opts);

/**
 * @description line chart controller for one data serie
 * @param { Array<ChartDataElement> } data array of data elements
 * @param { ChartOptions }            opts chart options
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleLineChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleLineChartController = (data, opts) => SimpleChartController({ type: LINE_CHART, data }, opts);

/**
 * @description area chart controller for one data serie
 * @param { Array<ChartDataElement> } data array of data elements
 * @param { ChartOptions }            opts chart options
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleAreaChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleAreaChartController = (data, opts) => SimpleChartController({ type: AREA_CHART, data }, opts);

/**
 * @description Rule to prevent, that max value is less or equal to min value
 * @param { SimpleInputControllerType<Number> } min minimum controller
 * @param { SimpleInputControllerType<Number> } max maximum controller
 * @returns {(function(changedValue: 'MIN'|'MAX'): void)|*}
 */
const minMaxRule = (min, max) => (changedValue) => {
    const minValue = min.getValue();
    const maxValue = max.getValue();

    if (maxValue <= minValue) {
        if (changedValue === "MIN") {
            const newValue = minValue + 1;
            max.setValue(newValue);
        } else {
            const newValue = maxValue - 1;
            min.setValue(newValue);
        }

    }
};