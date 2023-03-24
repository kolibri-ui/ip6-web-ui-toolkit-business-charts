// noinspection SpellCheckingInspection

import { TestSuite }                  from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { ToolBarController }          from "./toolBarController.js";
import { zoomInTool }                 from "./tools/ZoomInTool.js";
import { zoomOutTool }                from "./tools/ZoomOut.js";
import { bubbleTooltipSelectionTool } from "./tools/SelectionTool.js";
import { rubberBandTool }             from "./tools/RubberbandTool.js";
import { panningTool }                from "./tools/PanningTool.js";

/** @type { ChartDataSerie } */
const data = [
    { name: 'A', xValue: 1, yValue: 2, },
    { name: 'B', xValue: 2, yValue: 3, },
    { name: 'C', xValue: 3, yValue: 1, },
    { name: 'D', xValue: 4, yValue: -5, },
];

const toolBarControllerTestSuite = TestSuite("src/business-charts/projector/toolBar/toolBarController");

toolBarControllerTestSuite.add("test toolBarController without tools", assert => {
    let selectedDataPoints  = [];
    const toolBarController = ToolBarController({
        getData              : () => data,
        selectDataPoints     : (elements) => selectedDataPoints = elements,
        getSelectedDataPoints: () => selectedDataPoints
    });

    assert.is(toolBarController.tools.length, 0);
    assert.is(toolBarController.getData(), data);
    assert.is(toolBarController.getSelectedDataPoints().length, 0);

    toolBarController.selectDataPoints([ data[0] ]);
    assert.is(toolBarController.getSelectedDataPoints().length, 1);
});

toolBarControllerTestSuite.add("test toolBarController with tools", assert => {
    let selectedDataPoints  = [];
    const toolBarController = ToolBarController({
            getData              : () => data,
            selectDataPoints     : (elements) => selectedDataPoints = elements,
            getSelectedDataPoints: () => selectedDataPoints
        },
        [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool,
            rubberBandTool,
            panningTool,
        ]
    );

    assert.is(toolBarController.tools.length, 5);
});

toolBarControllerTestSuite.add("test toolBarController tool selection", assert => {
    let selectedDataPoints  = [];
    const toolBarController = ToolBarController({
        getData              : () => data,
        selectDataPoints     : (elements) => selectedDataPoints = elements,
        getSelectedDataPoints: () => selectedDataPoints
    });
    /** @type { ChartToolType } */
    const pseudoTool = {
        title: "pseudo tool",
        type: "CLICK",
        tooltip: "pseudoTool",
        icon: document.createElement("div"),
    };

    assert.is(toolBarController.selectedTool(), null);
    toolBarController.selectTool(pseudoTool);
    assert.is(toolBarController.selectedTool(), pseudoTool);
});


toolBarControllerTestSuite.run();