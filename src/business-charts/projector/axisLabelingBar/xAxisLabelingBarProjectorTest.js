// noinspection SpellCheckingInspection

import { TestSuite }                        from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ChartController,
    SCATTER_CHART
}                                           from "../chart/chartController.js";
import { XAxisLabelingBarProjector }        from "./xAxisLabelingBarProjector.js";

/** @type { ChartDataSerie } */
const dataSerie = {
    type: SCATTER_CHART,
    data: [
        { name: 'A', xValue: 1, yValue: 2, },
        { name: 'B', xValue: 2, yValue: 3, },
        { name: 'C', xValue: 3, yValue: 1, },
        { name: 'D', xValue: 4, yValue: -5, },
    ]
};

const xAxisLabelingBarProjectorTestSuite = TestSuite("src/business-charts/projector/axisLabelingBar/xAxisLabelingBarProjector");

xAxisLabelingBarProjectorTestSuite.add("test xAxisLabelingBarProjector", assert => {
    const root       = document.createElement("div");
    const controller = ChartController([ dataSerie ]);
    const chart      = XAxisLabelingBarProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".x-axis-labeling").length, 1);
    assert.is(root.querySelectorAll("canvas").length, 1);
});

xAxisLabelingBarProjectorTestSuite.run();