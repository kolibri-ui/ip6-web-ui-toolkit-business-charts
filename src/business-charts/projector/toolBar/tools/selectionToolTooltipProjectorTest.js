// noinspection SpellCheckingInspection

import { TestSuite } from "../../../../Kolibri/docs/src/kolibri/util/test.js";
import {
    selectionToolBubbleTooltip,
    selectionToolTooltipBottomCenter,
    selectionToolTooltipLeftCenter
}                    from "./selectionToolTooltipProjector.js";


const selectionToolTooltipProjectorTestSuite = TestSuite("src/business-charts/projector/toolBar/tools/selectionToolTooltipProjector");

selectionToolTooltipProjectorTestSuite.add("test selectionToolBubbleTooltip", assert => {
    document.documentElement.style.setProperty("--tooltip-min-height", "50px");
    document.documentElement.style.setProperty("--tooltip-bubble-arrow-border-right", "4px");

    const root    = document.createElement("div");
    const tooltip = selectionToolBubbleTooltip({ xValue: 200, yValue: 100 }, 3, "Tooltip");

    root.append(tooltip);

    assert.is(root.querySelectorAll(".tooltip-bubble").length, 1);
    assert.is(root.querySelector(".tooltip-bubble").style.top, "47px");
    assert.is(root.querySelector(".tooltip-bubble").style.left, "199px");
    assert.is(root.querySelector(".tooltip-bubble").innerText, "Tooltip");
});

selectionToolTooltipProjectorTestSuite.add("test selectionToolTooltipBottomCenter", assert => {
    document.documentElement.style.setProperty("--tooltip-width", "100px");
    document.documentElement.style.setProperty("--tooltip-arrow-border-width", "8px");

    const root    = document.createElement("div");
    const tooltip = selectionToolTooltipBottomCenter({ xValue: 200, yValue: 100 }, 3, "Tooltip");

    root.append(tooltip);

    assert.is(root.querySelectorAll(".tooltip-data-bottom-center").length, 1);
    assert.is(root.querySelector(".tooltip-data-bottom-center").style.top, "111px");
    assert.is(root.querySelector(".tooltip-data-bottom-center").style.left, "150px");
    assert.is(root.querySelector(".tooltip-data-bottom-center").innerText, "Tooltip");
});

selectionToolTooltipProjectorTestSuite.add("test selectionToolTooltipLeftCenter", assert => {
    document.documentElement.style.setProperty("--tooltip-width", "100px");
    document.documentElement.style.setProperty("--tooltip-height", "100px");
    document.documentElement.style.setProperty("--tooltip-arrow-border-width", "8px");

    const root    = document.createElement("div");
    const tooltip = selectionToolTooltipLeftCenter({ xValue: 200, yValue: 100 }, 3, "Tooltip");

    root.append(tooltip);

    assert.is(root.querySelectorAll(".tooltip-data-left-center").length, 1);
    assert.is(root.querySelector(".tooltip-data-left-center").style.top, "75px");
    assert.is(root.querySelector(".tooltip-data-left-center").style.left, "89px");
    assert.is(root.querySelector(".tooltip-data-left-center").innerText, "Tooltip");
});

selectionToolTooltipProjectorTestSuite.run();