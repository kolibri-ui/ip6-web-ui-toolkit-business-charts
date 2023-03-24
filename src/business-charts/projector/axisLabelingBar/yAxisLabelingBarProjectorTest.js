// noinspection SpellCheckingInspection

import { TestSuite }                 from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ChartController,
    LINE_CHART,
    SCATTER_CHART
}                                    from "../chart/chartController.js";
import { YAxisLabelingBarProjector } from "./yAxisLabelingBarProjector.js";

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

const yAxisLabelingBarProjectorTestSuite = TestSuite("src/business-charts/projector/axisLabelingBar/yAxisLabelingBarProjector");

yAxisLabelingBarProjectorTestSuite.add("test yAxisLabelingBarProjector for one data serie", assert => {
    const root       = document.createElement("div");
    const controller = ChartController([ dataSerie1 ]);
    const chart      = YAxisLabelingBarProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".y-axis-labeling").length, 1);
    assert.is(root.querySelectorAll("canvas").length, 1);
});

yAxisLabelingBarProjectorTestSuite.add("test yAxisLabelingBarProjector for two data series", assert => {
    const root       = document.createElement("div");
    const controller = ChartController([ dataSerie1, dataSerie2 ]);
    const chart      = YAxisLabelingBarProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".y-axis-labeling").length, 1);
    assert.is(root.querySelectorAll("canvas").length, 2);
});

yAxisLabelingBarProjectorTestSuite.run();