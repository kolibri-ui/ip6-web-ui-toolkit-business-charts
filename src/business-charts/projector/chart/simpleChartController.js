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
 * @param { ChartDataSerie } dataSerie
 * @param { ChartOptions } opts
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
    serieController.yMin.onValueChanged(() => controller.yMin.setValue(serieController.yMin.getValue()
                                                                       / serieController.factor.getValue()));
    serieController.yMax.onValueChanged(() => controller.yMax.setValue(serieController.yMax.getValue()
                                                                       / serieController.factor.getValue()));

    return controller;
};

/**
 * @description scatter chart controller for one data serie
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleScatterChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleScatterChartController = (data, opts) => SimpleChartController({ type: SCATTER_CHART, data }, opts);

/**
 * @description line chart controller for one data serie
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleLineChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleLineChartController = (data, opts) => SimpleChartController({ type: LINE_CHART, data }, opts);

/**
 * @description area chart controller for one data serie
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = SimpleAreaChartController(data);
 * Required Projector: SimpleChartProjector(controller);
 */
const SimpleAreaChartController = (data, opts) => SimpleChartController({ type: AREA_CHART, data }, opts);