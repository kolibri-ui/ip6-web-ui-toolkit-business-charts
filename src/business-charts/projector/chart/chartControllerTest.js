// noinspection SpellCheckingInspection

import { TestSuite }   from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ChartController,
    LINE_CHART,
    SCATTER_CHART
}                      from "./chartController.js";
import { panningTool } from "../toolBar/tools/PanningTool.js";

const chartControllerTestSuite = TestSuite("src/business-charts/projector/chart/chartController");

/** @type { ChartDataSerie } */
const dataSerie1 = {
    type: SCATTER_CHART,
    data: [
        { name: 'A', xValue: 1, yValue: 2, },
        { name: 'B', xValue: 2, yValue: 3, },
        { name: 'C', xValue: 3, yValue: 1, },
        { name: 'D', xValue: 4, yValue: -5, },
    ]
};

/** @type { ChartDataSerie } */
const dataSerie2 = {
    type: LINE_CHART,
    data: [
        { name: 'A', xValue: -2, yValue: 5, },
        { name: 'B', xValue: -1, yValue: 2, },
        { name: 'C', xValue: 0, yValue: 4, },
        { name: 'D', xValue: 1, yValue: -3, },
    ]
};

const xAxisLabeling = new Map([
    [ 1, "test 1" ],
    [ 2, "test 2" ],
    [ 3, "test 3" ],
    [ 4, "test 4" ],
]);

chartControllerTestSuite.add("test single data serie", assert => {
    const controller = ChartController([ dataSerie1 ]);
    assert.is(controller.getSeries().length, 1);
    assert.is(controller.xMin.getValue(), 1);
    assert.is(controller.xMax.getValue(), 4);
    assert.is(controller.yMin.getValue(), -1);
    assert.is(controller.yMax.getValue(), 0.6);
    assert.is(controller.getData().length, 4);

    const boundaries = controller.getBoundaries();
    assert.is(boundaries.xMin, 1);
    assert.is(boundaries.xMax, 4);
    assert.is(boundaries.yMin, -1);
    assert.is(boundaries.yMax, 0.6);

    const serieController = controller.getSeries()[0];
    assert.is(serieController.id, 1);
    assert.is(serieController.type, SCATTER_CHART);
    assert.is(serieController.factor.getValue(), 5);
    assert.is(serieController.shifting.getValue(), 0);
});

chartControllerTestSuite.add("test two data serie", assert => {
    const controller = ChartController([ dataSerie1, dataSerie2 ]);
    assert.is(controller.getSeries().length, 2);
    assert.is(controller.xMin.getValue(), -2);
    assert.is(controller.xMax.getValue(), 4);
    assert.is(controller.yMin.getValue(), -1);
    assert.is(controller.yMax.getValue(), 1);
    assert.is(controller.getData().length, 8);

    const boundaries = controller.getBoundaries();
    assert.is(boundaries.xMin, -2);
    assert.is(boundaries.xMax, 4);
    assert.is(boundaries.yMin, -1);
    assert.is(boundaries.yMax, 1);

    const serieController1 = controller.getSeries()[0];
    assert.is(serieController1.id, 1);
    assert.is(serieController1.type, SCATTER_CHART);
    assert.is(serieController1.factor.getValue(), 5);
    assert.is(serieController1.shifting.getValue(), 0);

    const serieController2 = controller.getSeries()[1];
    assert.is(serieController2.id, 2);
    assert.is(serieController2.type, LINE_CHART);
    assert.is(serieController2.factor.getValue(), 5);
    assert.is(serieController2.shifting.getValue(), 0);
});

chartControllerTestSuite.add("test change y values", assert => {
    const controller = ChartController([ dataSerie1 ]);
    controller.yMax.setValue(1);
    controller.yMin.setValue(-0.5);

    const serieController = controller.getSeries()[0];
    assert.is(serieController.yMax.getValue(), 5);
    assert.is(serieController.yMin.getValue(), -2.5);
});

chartControllerTestSuite.add("test change shifting", assert => {
    const controller      = ChartController([ dataSerie1 ]);
    const serieController = controller.getSeries()[0];
    serieController.shifting.setValue(-1);

    assert.is(controller.yMin.getValue(), -0.8);
    assert.is(controller.yMax.getValue(), 0.8);

    const boundaries = controller.getBoundaries();
    assert.is(boundaries.yMin, -0.8);
    assert.is(boundaries.yMax, 0.8);
});

chartControllerTestSuite.add("test change factor", assert => {
    const controller      = ChartController([ dataSerie1 ]);
    const serieController = controller.getSeries()[0];
    serieController.factor.setValue(10);

    assert.is(controller.yMin.getValue(), -0.5);
    assert.is(controller.yMax.getValue(), 0.3);

    const boundaries = controller.getBoundaries();
    assert.is(boundaries.yMin, -0.5);
    assert.is(boundaries.yMax, 0.3);
});

chartControllerTestSuite.add("test x-axis labeling", assert => {
    const controller1 = ChartController([ dataSerie1 ]);
    assert.is(controller1.xAxisLabeling, undefined);

    const controller2 = ChartController([ dataSerie1 ], { xAxisLabeling });
    assert.is(controller2.xAxisLabeling, xAxisLabeling);
});

chartControllerTestSuite.add("test toolbar controller", assert => {
    const controller1 = ChartController([ dataSerie1 ]);
    assert.is(typeof controller1.toolBarController, 'object');
    assert.is(controller1.toolBarController.tools.length, 0);

    const controller2 = ChartController([ dataSerie1 ], { tools: [ panningTool ] });
    assert.is(typeof controller2.toolBarController, 'object');
    assert.is(controller2.toolBarController.tools.length, 1);
});

chartControllerTestSuite.run();