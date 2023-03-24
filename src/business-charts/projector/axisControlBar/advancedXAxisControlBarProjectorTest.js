// noinspection SpellCheckingInspection

import { TestSuite }                        from "../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ChartController,
    SCATTER_CHART
}                                           from "../chart/chartController.js";
import { AdvancedXAxisControlBarProjector } from "./advancedXAxisControlBarProjector.js";

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

const advancedXAxisControlBarProjectorTestSuite = TestSuite("src/business-charts/projector/axisControlBar/advancedXAxisControlBarProjector");

advancedXAxisControlBarProjectorTestSuite.add("test advancedAxisControlBarProjector for x-axis", assert => {
    const root       = document.createElement("div");
    const controller = ChartController([ dataSerie ]);
    const chart      = AdvancedXAxisControlBarProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".x-axis").length, 1);
    assert.is(root.querySelectorAll("canvas").length, 1);
});

advancedXAxisControlBarProjectorTestSuite.run();