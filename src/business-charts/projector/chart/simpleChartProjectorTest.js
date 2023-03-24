// noinspection SpellCheckingInspection

import { TestSuite }                    from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterChartController } from "./simpleChartController.js";
import { SimpleChartProjector }         from "./simpleChartProjector.js";

/** @type { Array<ChartDataElement> } */
const data = [
    { name: 'A', xValue: 1, yValue: 2, },
    { name: 'B', xValue: 2, yValue: 3, },
    { name: 'C', xValue: 3, yValue: 1, },
    { name: 'D', xValue: 4, yValue: -5, },
];

const simpleChartProjectorTestSuite = TestSuite("src/business-charts/projector/chart/simpleChartProjector");

simpleChartProjectorTestSuite.add("test simple chart projector", assert => {
    const root = document.createElement("div");
    const controller = SimpleScatterChartController(data);
    const chart = SimpleChartProjector(controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".chart-container").length, 1);
    assert.is(root.querySelectorAll(".canvas-wrap").length, 1);
    assert.is(root.querySelectorAll(".tool-bar").length, 1);
    assert.is(root.querySelectorAll(".x-axis-labeling").length, 1);
    assert.is(root.querySelectorAll(".x-axis").length, 1);
    assert.is(root.querySelectorAll(".y-axis-labeling").length, 1);
    assert.is(root.querySelectorAll(".y-axis").length, 1);
    assert.is(root.querySelectorAll("canvas").length, 3);
    assert.is(root.querySelectorAll(".chart-canvas").length, 1);
    assert.is(root.querySelectorAll("input").length, 4);

    const xAxisInputs = root.querySelector(".x-axis").querySelectorAll("input");
    assert.is(xAxisInputs.length, 2);
    assert.is(Number(xAxisInputs.item(0).value), 1);
    assert.is(Number(xAxisInputs.item(1).value), 4);

    const yAxisInputs = root.querySelector(".y-axis").querySelectorAll("input");
    assert.is(yAxisInputs.length, 2);
    assert.is(Number(yAxisInputs.item(0).value), 3);
    assert.is(Number(yAxisInputs.item(1).value), -5);
});

simpleChartProjectorTestSuite.run();