// noinspection SpellCheckingInspection

import {
    AREA_CHART,
    ChartController,
    LINE_CHART,
    SCATTER_CHART
} from "./chartController.js";

export { ScatterChartController, LineChartController, AreaChartController }

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const ScatterChartController = (data, opts) => ChartController(data.map((d) => ({ type: SCATTER_CHART, data: d })), opts);

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const LineChartController = (data, opts) => ChartController(data.map((d) => ({ type: LINE_CHART, data: d })), opts);

/**
 *
 * @param { Array<Array<ChartDataElement>> } data
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 * @constructor
 */
const AreaChartController = (data, opts) => ChartController(data.map((d) => ({ type: AREA_CHART, data: d })), opts);