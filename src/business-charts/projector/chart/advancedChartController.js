// noinspection SpellCheckingInspection

import {
    AREA_CHART,
    ChartController,
    LINE_CHART,
    SCATTER_CHART
} from "./chartController.js";

export {
    ScatterChartController,
    LineChartController,
    AreaChartController
}

/**
 * @description scatter chart controller for more than one data serie
 * @param { Array<Array<ChartDataElement>> } data array of series data arrays
 * @param { ChartOptions }                   opts options for the chart
 * @return { ChartControllerType }
 * @example
 * const controller = ScatterChartController([data1, data2], {
 *    tools: [
 *         zoomInTool,
 *         zoomOutTool,
 *         bubbleTooltipSelectionTool,
 *         rubberBandTool,
 *         panningTool,
 *     ]
 * });
 * Required projector: AdvancedChartProjector(controller);
 */
const ScatterChartController = (data, opts) => ChartController(data.map((d) => ({
    type: SCATTER_CHART,
    data: d
})), opts);

/**
 * @description line chart controller for more than one data serie
 * @param { Array<Array<ChartDataElement>> } data array of series data arrays
 * @param { ChartOptions }                   opts options for the chart
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = LineChartController([data1, data2], {
 *    tools: [
 *         zoomInTool,
 *         zoomOutTool,
 *         bubbleTooltipSelectionTool,
 *         rubberBandTool,
 *         panningTool,
 *     ]
 * });
 * Required projector: AdvancedChartProjector(controller);
 */
const LineChartController = (data, opts) => ChartController(data.map((d) => ({ type: LINE_CHART, data: d })), opts);

/**
 * @description area chart controller for more than one data serie
 * @param { Array<Array<ChartDataElement>> } data array of series data arrays
 * @param { ChartOptions }                   opts options for the chart
 * @return { ChartControllerType }
 * @constructor
 * @example
 * const controller = AreaChartController([data1, data2], {
 *    tools: [
 *         zoomInTool,
 *         zoomOutTool,
 *         bubbleTooltipSelectionTool,
 *         rubberBandTool,
 *         panningTool,
 *     ]
 * });
 * Required projector: AdvancedChartProjector(controller);
 */
const AreaChartController = (data, opts) => ChartController(data.map((d) => ({ type: AREA_CHART, data: d })), opts);