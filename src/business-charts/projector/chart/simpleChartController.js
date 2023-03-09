// noinspection SpellCheckingInspection

import {
    AREA_CHART,
    ChartController,
    LINE_CHART,
    SCATTER_CHART
} from "./chartController.js";
import { VALUE } from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

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
    const controller = ChartController([ dataSerie ], opts);

    /**
     *
     * @type { ChartDataSeriesControllerType }
     */
    const serieController = controller.series.getObs(VALUE).getValue()[0];
    serieController.yMin.onValueChanged(() => controller.yMin.setValue(serieController.yMin.getValue()
                                                                       / serieController.getFactor()));
    serieController.yMax.onValueChanged(() => controller.yMax.setValue(serieController.yMax.getValue()
                                                                       / serieController.getFactor()));

    return controller;
};

/**
 *
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const SimpleScatterChartController = (data, opts) => SimpleChartController({ type: SCATTER_CHART, data }, opts);

/**
 *
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const SimpleLineChartController = (data, opts) => SimpleChartController({ type: LINE_CHART, data }, opts);

/**
 *
 * @param { Array<ChartDataElement> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const SimpleAreaChartController = (data, opts) => SimpleChartController({ type: AREA_CHART, data }, opts);