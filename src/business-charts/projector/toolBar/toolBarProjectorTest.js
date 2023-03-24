// noinspection SpellCheckingInspection

import { TestSuite }                  from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { ToolBarController }          from "./toolBarController.js";
import { zoomInTool }                 from "./tools/ZoomInTool.js";
import { zoomOutTool }                from "./tools/ZoomOut.js";
import { bubbleTooltipSelectionTool } from "./tools/SelectionTool.js";
import { rubberBandTool }             from "./tools/RubberbandTool.js";
import { panningTool }                from "./tools/PanningTool.js";
import { ToolBarProjector }           from "./toolBarProjector.js";

/** @type { Array<ChartDataElement> } */
const data = [
    { name: 'A', xValue: 1, yValue: 2, },
    { name: 'B', xValue: 2, yValue: 3, },
    { name: 'C', xValue: 3, yValue: 1, },
    { name: 'D', xValue: 4, yValue: -5, },
];

/** @type { () => ChartOptions } */
const getOptions                = () => ({});
/** @type { (mouseX: Number, mouseY: Number) => Array<ChartDataElement> } */
const getDataPointsForPosition  = () => [ data[0] ];
/** @type { ( DomainPoint2D ) => CanvasPoint2D } */
const getCanvasPositionForPoint = (_) => ({ xValue: 200, yValue: 100 });
/** @type { (xMin: Number, xMax: Number, yMin: Number, yMax: Number) => void } */
const setCanvasBoundaries       = () => undefined;
const redraw                    = () => undefined;


const toolBarProjectorTestSuite = TestSuite("src/business-charts/projector/toolBar/toolBarProjector");

toolBarProjectorTestSuite.add("test toolBarProjector", assert => {
    const root              = document.createElement("div");
    const canvasElement     = document.createElement("canvas");
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
    const toolBar           = ToolBarProjector(
        toolBarController,
        {
            getOptions,
            getDataPointsForPosition,
            getCanvasPositionForPoint,
            setCanvasBoundaries,
            redraw
        },
        canvasElement
    );

    root.append(toolBar);

    assert.is(root.querySelectorAll(".tooltip").length, 5);
    assert.is(root.querySelectorAll(".tooltipText").length, 5);

    const buttons = root.querySelectorAll("button");
    assert.is(buttons.length, 5);

    const initialTool = toolBarController.selectedTool();
    assert.is(typeof initialTool, "object");

    buttons[3].click();
    assert.isTrue(toolBarController.selectedTool() !== initialTool);
    assert.is(toolBarController.selectedTool().title, "Rubberband Zoom");

    buttons[4].click();
    assert.isTrue(toolBarController.selectedTool() !== initialTool);
    assert.is(toolBarController.selectedTool().title, "Panning");

    buttons[2].click();
    assert.is(toolBarController.selectedTool(), initialTool);
    assert.is(toolBarController.selectedTool().title, "Selection");
});

toolBarProjectorTestSuite.run();