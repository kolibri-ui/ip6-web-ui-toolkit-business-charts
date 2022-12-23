// noinspection SpellCheckingInspection

import { TestSuite }                   from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotChart }      from "./simpleScatterplotChartProjector.js";
import { SimpleScatterplotController } from "./simpleScatterplotChartController.js";
import { AxisControlBarProjector }     from "../axisControlBar/axisControlBarProjector.js";
import { generateId }                  from "../../util/functions.js";

const SimpleScatterplotChartTestSuite = TestSuite("src/business-charts/projector/simpleScatterplotChartProjector");

SimpleScatterplotChartTestSuite.add("simple scatter chart projector", assert => {

    /** @type { Array.<ScatterplotChartDataElement> } */
    const data = [
        { name: "A", xValue: 4, yValue: -4 },
        { name: "B", xValue: 88, yValue: -88 }
    ];
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const options = { xEvery, yEvery, drawOuterTicks };

    const scatterChartController = SimpleScatterplotController([
        data,
        options
    ]);

    const scatterChart = SimpleScatterplotChart(scatterChartController);

    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");

    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: scatterChartController.xMin, max: scatterChartController.xMax });
    const yAxisBar = AxisControlBarProjector("Y_AXIS", { min: scatterChartController.yMin, max: scatterChartController.yMax });

    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");

    canvasElement.id = generateId('scatterplot');
    canvasElement.classList.add('scatterplot-canvas');
    canvasElement.width = 500; //TODO wenn initialisiert, dann kann width nicht 0 sein..?
    canvasElement.height = 400; //TODO wenn initialisiert, dann kann height nicht 0 sein..?

    chartElement.append(yAxisBar, canvasElement, xAxisBar);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');
    
    canvasElement.id = 'scatterplot-vcforjh5ka';
    assert.is(context.canvas.id, 'scatterplot-vcforjh5ka');
    const testId = canvasElement.id;
    assert.is(testId, 'scatterplot-vcforjh5ka');
    canvasElement.id = generateId('scatterplot');
    const newGeneratedTestId = canvasElement.id;
    assert.isTrue((newGeneratedTestId !== testId));
    
    /** 
     * @description sum of the word length of id prefix and the symbol '-' and a random 10 digit character string
     * */
    //TODO not sure if the id creation works correctly. Sometimes the sum is 23, not 22
    assert.is(context.canvas.id.length, 22 || 23);

    assert.is(context.canvas.ELEMENT_NODE, 1);
    assert.is(context.canvas.className, 'scatterplot-canvas');
    assert.is(context.canvas.width, 500);
    assert.is(context.canvas.height, 400);

    assert.is(scatterChartController.getOptions().xEvery, 1); //default value
    assert.is(scatterChartController.getOptions().yEvery, 1); //default value
    assert.is(scatterChartController.getOptions().drawOuterTicks, true); //default value

    assert.is(scatterChart.localName, "div");
    assert.is(scatterChart.className, "chart-container");

    assert.is(context.strokeStyle, "#000000");

    assert.is(chartElement.className, 'chart-container');
    assert.is(xAxisBar.className, 'x-axis');
    assert.is(canvasElement.className, 'scatterplot-canvas');
    assert.is(yAxisBar.className, 'y-axis');

    assert.is(yAxisBar.nextSibling.className, 'scatterplot-canvas');
    assert.is(xAxisBar.previousSibling.className, 'scatterplot-canvas');
    assert.is(context.canvas.nextSibling.parentElement.className, 'chart-container');
    assert.is(context.canvas.parentElement.className, 'chart-container');
    assert.is(xAxisBar.parentElement.className, 'chart-container');
    assert.is(canvasElement.parentElement.className, 'chart-container');
    assert.is(yAxisBar.parentElement.className, 'chart-container');
});
SimpleScatterplotChartTestSuite.run();