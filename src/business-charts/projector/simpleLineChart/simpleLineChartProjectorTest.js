import { TestSuite }                 from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChart }           from "./simpleLineChartProjector.js";
import { SimpleLineChartController } from "./simpleLineChartController.js";
import { generateId }                from "../../util/functions.js";
import { AxisControlBarProjector }   from "../axisControlBar/axisControlBarProjector.js";
import {
    SimpleInputController
}                                    from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import {
    projectChangeInput
}                                    from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputProjector.js";
import { fireChangeEvent }           from "../../../Kolibri/docs/src/kolibri/util/dom.js";

const SimpleLineChartProjectorTestSuite = TestSuite("LCP: src/business-charts/projector/simpleLineChartProjector");

SimpleLineChartProjectorTestSuite.add("LCP: binding", assert => {
    /** @type { Array.<LineChartDataElement> } */
    const data = [
        { name: "A", xValue: 4, yValue: -4 },
        { name: "B", xValue: 88, yValue: -88 }
    ];
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const options = { xEvery, yEvery, drawOuterTicks };

    const lineChartController = SimpleLineChartController([
        data,
        options
    ]);
    
    // fireChangeEvent();
    
    // const [labelElement, spanElement] = projectChangeInput("TEST", lineChartController);
    // const inputElement = spanElement.querySelector("input");
    // assert.is(labelElement.getAttribute("for"),     inputElement.getAttribute("id"));
    // assert.is(spanElement .getAttribute("data-id"), inputElement.getAttribute("id"));
    //
    // // test the binding
    // inputElement.value = "345";
    // fireChangeEvent(inputElement);
    // assert.is(lineChartController.xMin, "new value");
    //
    // lineChartController.setValue("new value 2");
    // assert.is(inputElement.value, "new value 2");
});

SimpleLineChartProjectorTestSuite.add("LCP: simple line chart projector", assert => {

    /** @type { Array.<LineChartDataElement> } */
    const data = [
        { name: "A", xValue: 4, yValue: -4 },
        { name: "B", xValue: 88, yValue: -88 }
    ];
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const options = { xEvery, yEvery, drawOuterTicks };
    
    const lineChartController = SimpleLineChartController([
        data,
        options
    ]);
    
    const lineChart = SimpleLineChart(lineChartController);

    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: lineChartController.xMin, max: lineChartController.xMax });
    const yAxisBar = AxisControlBarProjector("Y_AXIS", { min: lineChartController.yMin, max: lineChartController.yMax });
    
    
    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");

    //canvasElement.id = generateId('line-chart');
    canvasElement.classList.add('line-chart-canvas');
    canvasElement.width = 666; //TODO wenn initialisiert, dann kann width nicht 0 sein..?
    canvasElement.height = 333; //TODO wenn initialisiert, dann kann height nicht 0 sein..?

    lineChart.append(yAxisBar, canvasElement, xAxisBar);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    //canvasElement.id = 'line-chart-1';
    // assert.is(canvasElement.id, 'line-chart-1');
    // const testId = canvasElement.id.toString();
    // assert.is(testId, 'line-chart-3pc01yr3qc');
    // canvasElement.id = generateId('line-chart');
    // const newGeneratedTestId = canvasElement.id;
    // assert.isTrue((newGeneratedTestId !== testId));

    /**
     * @description sum of the word length of id prefix and the symbol '-' and a random 10 digit character string
     * */
    //TODO check that the id generation is unique
    // assert.is(testId !== newGeneratedTestId);
    
    assert.is(context.canvas.ELEMENT_NODE, 1);
    assert.is(context.canvas.className, 'line-chart-canvas');
    assert.is(context.canvas.width, 666);
    assert.is(context.canvas.height, 333);
    
    assert.is(lineChartController.getOptions().xEvery, 1); //default value
    assert.is(lineChartController.getOptions().yEvery, 1); //default value
    assert.is(lineChartController.getOptions().drawOuterTicks, true); //default value

    assert.is(lineChart.localName, "div");
    assert.is(lineChart.className, "chart-container");
    
    assert.is(context.strokeStyle, "#000000");
    
    assert.is(xAxisBar.className, 'x-axis');
    assert.is(canvasElement.className, 'line-chart-canvas');
    assert.is(yAxisBar.className, 'y-axis');
    
    assert.is(yAxisBar.nextSibling.className, 'line-chart-canvas');
    assert.is(xAxisBar.previousSibling.className, 'line-chart-canvas');
    assert.is(context.canvas.nextSibling.parentElement.className, 'chart-container');
    assert.is(context.canvas.parentElement.className, 'chart-container');
    assert.is(xAxisBar.parentElement.className, 'chart-container');
    assert.is(canvasElement.parentElement.className, 'chart-container');
    assert.is(yAxisBar.parentElement.className, 'chart-container');
    assert.is(canvasElement.previousSibling.className, 'y-axis');
    assert.is(canvasElement.nextSibling.className, 'x-axis');
});
SimpleLineChartProjectorTestSuite.run();
