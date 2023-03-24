// noinspection SpellCheckingInspection

import { TestSuite }                  from "../../../../Kolibri/docs/src/kolibri/util/test.js";
import { ToolBarController }          from "../toolBarController.js";
import { ToolBarProjector }           from "../toolBarProjector.js";
import { bubbleTooltipSelectionTool } from "./SelectionTool.js";

/** @type { ChartDataElementAndSerie } */
const dataPoint = { serie: {}, point: { name: "Point", xValue: 2, yValue: 3 } };

/** @type { () => ChartOptions } */
const getOptions                = () => ({ pointSize: 3 });
/** @type { (mouseX: Number, mouseY: Number) => Array<ChartDataElement> } */
const getDataPointsForPosition  = (mouseX, mouseY) => mouseX === 20 && mouseY === 20
                                                      ? [ dataPoint ]
                                                      : [];
/** @type { ( DomainPoint2D ) => CanvasPoint2D } */
const getCanvasPositionForPoint = (_) => ({ xValue: 200, yValue: 100 });

/** @type { (xMin: Number, xMax: Number, yMin: Number, yMax: Number) => void } */
const setCanvasBoundaries = () => undefined;
/** @type { () => void } */
const redraw              = () => undefined;

const canvasElement                 = document.createElement("canvas");
// simulate getBoundingClientRect function
canvasElement.getBoundingClientRect = () => ({
    x     : 10,
    y     : 10,
    width : 200,
    height: 100,
    top   : 10,
    right : 220,
    bottom: 110,
    left  : 10,
});

const initValues = () => {
    const root       = document.createElement("div");
    const canvasWrap = document.createElement("div");
    canvasWrap.append(canvasElement);
    let selectedDataPoints  = [];
    const toolBarController = ToolBarController({
            getData              : () => [],
            selectDataPoints     : (elements) => selectedDataPoints = elements,
            getSelectedDataPoints: () => selectedDataPoints
        },
        [
            bubbleTooltipSelectionTool,
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

    return { root, canvasWrap, toolBarController, toolBar };
};

const panningToolTestSuite = TestSuite("src/business-charts/projector/toolBar/tools/SelectionTool");

panningToolTestSuite.add("test SelectionTool", assert => {
    const { toolBarController } = initValues();
    const tool                  = toolBarController.selectedTool();
    assert.is(tool.title, "Selection");
    assert.is(tool.tooltip, "select");
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseClick"));
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseMove"));
});

panningToolTestSuite.add("test SelectionTool mouse click", assert => {
    const { toolBarController } = initValues();

    assert.is(toolBarController.getSelectedDataPoints().length, 0);

    const mouseClick = new MouseEvent("click", {
        view   : window,
        clientX: 30,
        clientY: 30
    });
    canvasElement.dispatchEvent(mouseClick);

    assert.is(toolBarController.getSelectedDataPoints().length, 1);
    assert.is(toolBarController.getSelectedDataPoints()[0], dataPoint.point);

    const mouseClick2 = new MouseEvent("click", {
        view   : window,
        clientX: 40,
        clientY: 40
    });
    canvasElement.dispatchEvent(mouseClick2);

    assert.is(toolBarController.getSelectedDataPoints().length, 0);

    toolBarController.selectDataPoints([{ name: "Point 2", xValue: 1, yValue: 1 }]);

    const mouseClick3 = new MouseEvent("click", {
        view   : window,
        clientX: 30,
        clientY: 30,
        metaKey: true, // for mac
        ctrlKey: true  // for other os
    });
    canvasElement.dispatchEvent(mouseClick3);

    assert.is(toolBarController.getSelectedDataPoints().length, 2);
});

panningToolTestSuite.add("test SelectionTool mouse move", assert => {
    const { canvasWrap } = initValues();

    assert.is(canvasWrap.querySelectorAll(".tooltip-bubble").length, 0);

    const mouseMove = new MouseEvent("mousemove", {
        view   : window,
        clientX: 30,
        clientY: 30
    });
    canvasElement.dispatchEvent(mouseMove);

    assert.is(canvasWrap.querySelectorAll(".tooltip-bubble").length, 1);

    const mouseMove2 = new MouseEvent("mousemove", {
        view   : window,
        clientX: 40,
        clientY: 40
    });
    canvasElement.dispatchEvent(mouseMove2);

    assert.is(canvasWrap.querySelectorAll(".tooltip-bubble").length, 0);
});

panningToolTestSuite.run();