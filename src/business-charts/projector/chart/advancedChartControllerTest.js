// noinspection SpellCheckingInspection

import { TestSuite }              from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    AreaChartController,
    LineChartController,
    ScatterChartController
} from "./advancedChartController.js";
import {
    AREA_CHART,
    LINE_CHART,
    SCATTER_CHART
} from "./chartController.js";

/** @type { Array<ChartDataElement> } */
const data = [
    { name: 'A', xValue: 1, yValue: 2, },
    { name: 'B', xValue: 2, yValue: 3, },
    { name: 'C', xValue: 3, yValue: 1, },
    { name: 'D', xValue: 4, yValue: -5, },
];

const advancedChartControllerTestSuite = TestSuite("src/business-charts/projector/chart/advancedChartController");

advancedChartControllerTestSuite.add("test ScatterChartController", assert => {
    const controller = ScatterChartController([data]);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, SCATTER_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

advancedChartControllerTestSuite.add("test LineChartController", assert => {
    const controller = LineChartController([data]);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, LINE_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

advancedChartControllerTestSuite.add("test AreaChartController", assert => {
    const controller = AreaChartController([data]);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, AREA_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

advancedChartControllerTestSuite.run();