import { TestSuite }             from "../../src/Kolibri/docs/src/kolibri/util/test.js";
import {SimpleScatterplotChart } from "../../src/business-charts/projector/simpleScatterplotChart/simpleScatterplotChartProjector.js";
import { start }                 from "../../src/Kolibri/docs/src/examples/simpleForm/starter.js";

const simpleScatterplotChartDemoSuite = TestSuite("simpleScatterplotChart");

/**
 * The purpose of a spike is not to test all possible user interactions and their outcome but rather
 * making sure that the view construction and the binding is properly set up.
 * Complex logic is to be tested against the controller (incl. model).
 */

simpleScatterplotChartDemoSuite.add("test View Scatterplot Demo", assert => {
    const root = document.createElement("div"); // created but never mounted
    root.append(...start(root));

    // assert properties of the generated DOM elements
    assert.is(root.querySelectorAll("container").length, 2);

    // work with DOM elements just like user would do in the browser

});

simpleScatterplotChartDemoSuite.run();

