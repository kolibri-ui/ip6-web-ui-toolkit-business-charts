// noinspection SpellCheckingInspection

import {
    ChartController,
    SCATTER_CHART
}                           from "../chart/chartController.js";
import { TestSuite }        from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleDetailView } from "./simpleDetailViewProjector.js";

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

const simpleDetailViewControllerTestSuite = TestSuite("src/business-charts/projector/simpleDetailView/simpleDetailViewProjector");

simpleDetailViewControllerTestSuite.add("test simpleDetailViewProjector", assert => {
    const root       = document.createElement("div");
    const controller = ChartController([ dataSerie ]);
    const detailView = SimpleDetailView(controller);

    root.append(detailView);

    const list = root.querySelector(".simple-detail-view-list");
    assert.is(list.children.length, 0);

    controller.setSelectedElements([ dataSerie.data[0] ]);
    assert.is(list.children.length, 1);
    assert.is(list.children.item(0).querySelector(".detail-view-name").innerText, "A");
    assert.is(list.children.item(0).querySelectorAll(".detail-view-value")[0].innerText, "X: 1");
    assert.is(list.children.item(0).querySelectorAll(".detail-view-value")[1].innerText, "Y: 2");

    controller.setSelectedElements([ dataSerie.data[0], dataSerie.data[3] ]);
    assert.is(list.children.length, 2);
});

simpleDetailViewControllerTestSuite.run();