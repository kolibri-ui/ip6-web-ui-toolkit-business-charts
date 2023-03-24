// noinspection SpellCheckingInspection

import { TestSuite }                     from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleInputController } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import { SimpleAxisControlBarProjector } from "./simpleAxisControlBarProjector.js";

const simpleAxisControlBarProjectorTestSuite = TestSuite("src/business-charts/projector/axisControlBar/simpleAxisControlBarProjector");

simpleAxisControlBarProjectorTestSuite.add("test simpleAxisControlBarProjector for x-axis", assert => {
    const root       = document.createElement("div");
    const controller = {
        min: SimpleInputController({ value: 1, name: "x-min", label: "x-min", type: "number" }),
        max: SimpleInputController({ value: 5, name: "x-max", label: "x-max", type: "number" })
    };
    const chart      = SimpleAxisControlBarProjector("X_AXIS", controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".x-axis").length, 1);
    assert.is(root.querySelectorAll("input").length, 2);

    const xAxisInputs = root.querySelector(".x-axis").querySelectorAll("input");
    assert.is(xAxisInputs.length, 2);
    assert.is(Number(xAxisInputs.item(0).value), 1);
    assert.is(Number(xAxisInputs.item(1).value), 5);
});

simpleAxisControlBarProjectorTestSuite.add("test simpleAxisControlBarProjector for y-axis", assert => {
    const root       = document.createElement("div");
    const controller = {
        min: SimpleInputController({ value: -5, name: "y-min", label: "y-min", type: "number" }),
        max: SimpleInputController({ value: 1, name: "y-max", label: "y-max", type: "number" })
    };
    const chart      = SimpleAxisControlBarProjector("Y_AXIS", controller);

    root.append(chart);

    assert.is(root.querySelectorAll(".y-axis").length, 1);
    assert.is(root.querySelectorAll("input").length, 2);

    const xAxisInputs = root.querySelector(".y-axis").querySelectorAll("input");
    assert.is(xAxisInputs.length, 2);
    assert.is(Number(xAxisInputs.item(0).value), 1);
    assert.is(Number(xAxisInputs.item(1).value), -5);
});

simpleAxisControlBarProjectorTestSuite.run();