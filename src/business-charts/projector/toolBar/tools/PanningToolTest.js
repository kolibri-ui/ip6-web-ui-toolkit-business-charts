// noinspection SpellCheckingInspection

import { TestSuite }         from "../../../../Kolibri/docs/src/kolibri/util/test.js";
import { ToolBarController } from "../toolBarController.js";
import { panningTool }       from "./PanningTool.js";
import { ToolBarProjector }  from "../toolBarProjector.js";

let xMinimum    = 0;
let xMaximum    = 0;
let yMinimum    = 0;
let yMaximum    = 0;
let redrawCount = 0;

/** @type { () => ChartOptions } */
const getOptions                = () => ({});
/** @type { (mouseX: Number, mouseY: Number) => Array<ChartDataElement> } */
const getDataPointsForPosition  = () => [];
/** @type { ( DomainPoint2D ) => CanvasPoint2D } */
const getCanvasPositionForPoint = (_) => ({ xValue: 200, yValue: 100 });

/** @type { (xMin: Number, xMax: Number, yMin: Number, yMax: Number) => void } */
const setCanvasBoundaries = (xMin, xMax, yMin, yMax) => {
    xMinimum = xMin;
    xMaximum = xMax;
    yMinimum = yMin;
    yMaximum = yMax;
};
/** @type { () => void } */
const redraw              = () => redrawCount++;

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
    xMinimum    = 0;
    xMaximum    = 0;
    yMinimum    = 0;
    yMaximum    = 0;
    redrawCount = 0;

    const root                          = document.createElement("div");

    let selectedDataPoints              = [];
    const toolBarController             = ToolBarController({
            getData              : () => [],
            selectDataPoints     : (elements) => selectedDataPoints = elements,
            getSelectedDataPoints: () => selectedDataPoints
        },
        [
            panningTool,
        ]
    );
    const toolBar                       = ToolBarProjector(
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

    return { root, toolBarController, toolBar };
};

const panningToolTestSuite = TestSuite("src/business-charts/projector/toolBar/tools/PanningTool");

panningToolTestSuite.add("test PanningTool", assert => {
    const { toolBarController } = initValues();
    const tool = toolBarController.selectedTool();
    assert.is(tool.title, "Panning");
    assert.is(tool.tooltip, "panning");
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseDown"));
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseMove"));
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseUp"));
    assert.isTrue(Object.prototype.hasOwnProperty.call(tool, "mouseEnter"));
});

panningToolTestSuite.add("test PanningTool mouse move", assert => {
    initValues();

    const mouseMove = new MouseEvent("mousemove", {
        view   : window,
        clientX: 30,
        clientY: 30
    });
    canvasElement.dispatchEvent(mouseMove);
    assert.is(xMinimum, 0);
    assert.is(xMaximum, 0);
    assert.is(yMinimum, 0);
    assert.is(yMaximum, 0);
});

panningToolTestSuite.add("test PanningTool dragging", assert => {
    initValues();

    const mouseDown = new MouseEvent("mousedown", {
        view   : window,
        clientX: 15,
        clientY: 20
    });
    canvasElement.dispatchEvent(mouseDown);
    const mouseMove = new MouseEvent("mousemove", {
        view   : window,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseMove);
    assert.is(xMinimum, -5);
    assert.is(xMaximum, 195);
    assert.is(yMinimum, 5);
    assert.is(yMaximum, 105);
    assert.is(redrawCount, 0);

    const mouseUp = new MouseEvent("mouseup", {
        view   : window,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseUp);
    assert.is(redrawCount, 1);

    const mouseMove2 = new MouseEvent("mousemove", {
        view   : window,
        clientX: 30,
        clientY: 30
    });
    canvasElement.dispatchEvent(mouseMove2);
    assert.is(xMinimum, -5);
    assert.is(xMaximum, 195);
    assert.is(yMinimum, 5);
    assert.is(yMaximum, 105);
});

panningToolTestSuite.add("test PanningTool mouse enter while dragging", assert => {
    initValues();

    const mouseDown = new MouseEvent("mousedown", {
        view   : window,
        clientX: 15,
        clientY: 20
    });
    canvasElement.dispatchEvent(mouseDown);
    const mouseEnter = new MouseEvent("mouseenter", {
        view   : window,
        buttons: 1,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseEnter);
    const mouseMove = new MouseEvent("mousemove", {
        view   : window,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseMove);
    assert.is(xMinimum, -5);
    assert.is(xMaximum, 195);
    assert.is(yMinimum, 5);
    assert.is(yMaximum, 105);
});

panningToolTestSuite.add("test PanningTool mouse enter while dragging after releasing mouse button", assert => {
    initValues();

    const mouseDown = new MouseEvent("mousedown", {
        view   : window,
        clientX: 15,
        clientY: 20
    });
    canvasElement.dispatchEvent(mouseDown);
    const mouseEnter = new MouseEvent("mouseenter", {
        view   : window,
        buttons: 0,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseEnter);
    const mouseMove = new MouseEvent("mousemove", {
        view   : window,
        clientX: 20,
        clientY: 15
    });
    canvasElement.dispatchEvent(mouseMove);
    assert.is(xMinimum, 0);
    assert.is(xMaximum, 0);
    assert.is(yMinimum, 0);
    assert.is(yMaximum, 0);
});

panningToolTestSuite.run();