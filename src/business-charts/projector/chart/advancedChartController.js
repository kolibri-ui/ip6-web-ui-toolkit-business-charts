// noinspection SpellCheckingInspection

import {
    AREA_CHART,
    ChartController,
    LINE_CHART,
    SCATTER_CHART
} from "./chartController.js";

export { AdvancedChartController, ScatterChartController, LineChartController, AreaChartController }

/**
 *
 * @param { Array<ChartDataSerie> } dataSeries
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 */
const AdvancedChartController = (dataSeries, opts) => {
    const controller = ChartController(dataSeries, opts);

    controller.yMin.onValueChanged(() => {
        for (const serie of controller.getSeries()) {
            serie.yMin.setValue(controller.yMin.getValue() * serie.getFactor());
        }
    });
    controller.yMax.onValueChanged(() => {
        for (const serie of controller.getSeries()) {
            serie.yMax.setValue(controller.yMax.getValue() * serie.getFactor());
        }
    });

    return controller;
};

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const ScatterChartController = (data, opts) => AdvancedChartController(data.map((d) => ({ type: SCATTER_CHART, data: d })), opts);

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const LineChartController = (data, opts) => AdvancedChartController(data.map((d) => ({ type: LINE_CHART, data: d })), opts);

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const AreaChartController = (data, opts) => AdvancedChartController(data.map((d) => ({ type: AREA_CHART, data: d })), opts);