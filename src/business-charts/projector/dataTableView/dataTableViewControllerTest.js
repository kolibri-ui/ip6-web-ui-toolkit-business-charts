// noinspection SpellCheckingInspection

import {
    ChartController,
    SCATTER_CHART
}                                  from "../chart/chartController.js";
import { TestSuite }               from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { DataTableViewController } from "./dataTableViewController.js";

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

const dataTableViewControllerTestSuite = TestSuite("src/business-charts/projector/dataTableView/dataTableViewController");

dataTableViewControllerTestSuite.add("test dataTableViewController", assert => {
    const chartController     = ChartController([ dataSerie ]);
    const tableViewController = DataTableViewController(chartController, chartController.getSeries()[0]);
    let count                 = 0;
    tableViewController.onSelectedElementsChanged(() => count++);

    assert.is(tableViewController.getData(), dataSerie.data);

    assert.is(tableViewController.getSelectedElements().length, 0);
    chartController.setSelectedElements([ dataSerie.data[0] ]);
    assert.is(tableViewController.getSelectedElements().length, 1);
    assert.isTrue(tableViewController.getSelectedElements().includes(dataSerie.data[0]));
    assert.is(count, 2);

    tableViewController.setSelectedElements([ dataSerie.data[1] ]);
    assert.is(tableViewController.getSelectedElements().length, 1);
    assert.isTrue(tableViewController.getSelectedElements().includes(dataSerie.data[1]));
    assert.is(count, 3);
});

dataTableViewControllerTestSuite.run();