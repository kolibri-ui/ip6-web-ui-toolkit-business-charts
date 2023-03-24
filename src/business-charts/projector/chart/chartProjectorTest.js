// noinspection SpellCheckingInspection

import { TestSuite }      from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ChartController,
    SCATTER_CHART
}                         from "./chartController.js";
import { ChartProjector } from "./chartProjector.js";

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

const chartProjectorTestSuite = TestSuite("src/business-charts/projector/chart/chartProjector");

chartProjectorTestSuite.add("test chart projector", assert => {
    const root = document.createElement("div");
    const controller = ChartController([ dataSerie1 ]);
    const chart = ChartProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll("canvas").length, 1);
});

chartProjectorTestSuite.run();