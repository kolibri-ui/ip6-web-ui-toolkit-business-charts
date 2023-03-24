// noinspection SpellCheckingInspection

import { TestSuite }                    from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    AREA_CHART,
    LINE_CHART,
    SCATTER_CHART
}                                       from "./chartController.js";
import {
    SimpleAreaChartController,
    SimpleLineChartController,
    SimpleScatterChartController
} from "./simpleChartController.js";

/** @type { Array<ChartDataElement> } */
const data = [
    { name: 'A', xValue: 1, yValue: 2, },
    { name: 'B', xValue: 2, yValue: 3, },
    { name: 'C', xValue: 3, yValue: 1, },
    { name: 'D', xValue: 4, yValue: -5, },
];

const simpleChartControllerTestSuite = TestSuite("src/business-charts/projector/chart/simpleChartController");

simpleChartControllerTestSuite.add("test ScatterChartController", assert => {
    const controller = SimpleScatterChartController(data);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, SCATTER_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

simpleChartControllerTestSuite.add("test LineChartController", assert => {
    const controller = SimpleLineChartController(data);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, LINE_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

simpleChartControllerTestSuite.add("test AreaChartController", assert => {
    const controller = SimpleAreaChartController(data);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.getSeries()[0].type, AREA_CHART);
    assert.is(controller.getSeries()[0].getData(), data);
});

simpleChartControllerTestSuite.add("test y value change", assert => {
    const controller = SimpleScatterChartController(data);
    const serieController = controller.getSeries()[0];

    assert.is(controller.yMin.getValue(), -1);
    assert.is(controller.yMax.getValue(), 0.6);

    serieController.yMax.setValue(5);
    assert.is(controller.yMax.getValue(), 1);

    serieController.yMin.setValue(-2);
    assert.is(controller.yMin.getValue(), -0.4);
});

simpleChartControllerTestSuite.add("test min-max rule", assert => {
    const controller = SimpleScatterChartController(data);
    const serieController = controller.getSeries()[0];

    assert.is(serieController.yMin.getValue(), -5);
    assert.is(serieController.yMax.getValue(), 3);
    assert.is(controller.xMin.getValue(), 1);
    assert.is(controller.xMax.getValue(), 4);

    serieController.yMax.setValue(-6);
    assert.is(serieController.yMin.getValue(), -7);

    serieController.yMin.setValue(-2);
    assert.is(serieController.yMax.getValue(), -1);

    controller.xMax.setValue(1);
    assert.is(controller.xMin.getValue(), 0);

    controller.xMin.setValue(3);
    assert.is(controller.xMax.getValue(), 4);
});

simpleChartControllerTestSuite.run();