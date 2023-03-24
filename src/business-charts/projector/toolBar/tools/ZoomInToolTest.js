// noinspection SpellCheckingInspection

import { TestSuite }         from "../../../../Kolibri/docs/src/kolibri/util/test.js";
import { ToolBarController } from "../toolBarController.js";
import { ToolBarProjector }  from "../toolBarProjector.js";
import { zoomInTool }        from "./ZoomInTool.js";

let xMinimum = 0;
let xMaximum = 0;
let yMinimum = 0;
let yMaximum = 0;

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
    xMinimum    = 0;
    xMaximum    = 0;
    yMinimum    = 0;
    yMaximum    = 0;

    const root              = document.createElement("div");
    let selectedDataPoints  = [];
    const toolBarController = ToolBarController({
            getData              : () => [],
            selectDataPoints     : (elements) => selectedDataPoints = elements,
            getSelectedDataPoints: () => selectedDataPoints
        },
        [
            zoomInTool,
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

    return { root, toolBarController, toolBar };
};

const zoomInToolTestSuite = TestSuite("src/business-charts/projector/toolBar/tools/ZoomInTool");

zoomInToolTestSuite.add("test ZoomInTool click", assert => {
    const { toolBar } = initValues();

    assert.is(toolBar.querySelectorAll("button").length, 1);
    toolBar.querySelector("button").click();

    assert.is(xMinimum, 10);
    assert.is(xMaximum, 190);
    assert.is(yMinimum, 5);
    assert.is(yMaximum, 95);
});

zoomInToolTestSuite.run();