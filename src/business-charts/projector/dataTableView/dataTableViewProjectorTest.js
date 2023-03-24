// noinspection SpellCheckingInspection

import {
    ChartController,
    SCATTER_CHART
}                                  from "../chart/chartController.js";
import { TestSuite }               from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { DataTableViewController } from "./dataTableViewController.js";
import { DataTableViewProjector }  from "./dataTableViewProjector.js";

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

const dataTableViewControllerTestSuite = TestSuite("src/business-charts/projector/dataTableView/dataTableViewProjector");

dataTableViewControllerTestSuite.add("test dataTableViewProjector", assert => {
    const root                = document.createElement("div");
    const chartController     = ChartController([ dataSerie ]);
    const tableViewController = DataTableViewController(chartController, chartController.getSeries()[0]);
    const tableView           = DataTableViewProjector(tableViewController, "table view");

    root.append(tableView);

    assert.is(root.querySelectorAll("table").length, 1);
    assert.is(root.querySelectorAll("tr").length, 5);

    const tHead = root.querySelector("thead");
    assert.is(tHead.querySelectorAll("tr").length, 1);

    const tBody = root.querySelector("tbody");
    const rows = tBody.querySelectorAll("tr");
    assert.is(rows.length, 4);
    assert.is(rows[0].querySelector("td").innerText, "A");
    assert.is(rows[1].querySelector("td").innerText, "B");
    assert.is(rows[2].querySelector("td").innerText, "C");
    assert.is(rows[3].querySelector("td").innerText, "D");
});

dataTableViewControllerTestSuite.run();