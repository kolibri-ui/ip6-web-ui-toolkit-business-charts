import { TestSuite }                 from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChart }           from "./simpleLineChartProjector.js";
import { SimpleLineChartController } from "./simpleLineChartController.js";
import { generateId }                from "../../util/functions.js";
import { AxisControlBarProjector }   from "../axisControlBar/axisControlBarProjector.js";

const SimpleLineChartProjectorTestSuite = TestSuite("src/business-charts/projector/simpleLineChartProjector");

SimpleLineChartProjectorTestSuite.add("simple line chart projector", assert => {



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
    
    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: lineChartController.xMin, max: lineChartController.xMax });
    
    const lineChart = SimpleLineChart(lineChartController);

    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");


    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");

    canvasElement.id = generateId('line-chart'); //TODO change for line chart
    canvasElement.classList.add('line-chart-canvas'); //TODO Fehler in getComputedStyle mit line-chart-canvas
    canvasElement.width = 500; //TODO wenn initialisiert, dann kann width nicht 0 sein..?
    canvasElement.height = 400; //TODO wenn initialisiert, dann kann height nicht 0 sein..?

    chartElement.append(canvasElement);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');
    
    canvasElement.id = 'line-chart-3pc01yr3qc';

    assert.is(context.canvas.id, 'line-chart-3pc01yr3qc');
    assert.is(context.canvas.id.length, 21);
    assert.is(context.canvas.ELEMENT_NODE, 1);
    assert.is(context.canvas.className, 'line-chart-canvas');
    assert.is(context.canvas.width, 500);
    assert.is(context.canvas.height, 400);
    
    assert.is(lineChartController.getOptions().xEvery, 1); //default value
    assert.is(lineChartController.getOptions().yEvery, 1); //default value
    assert.is(lineChartController.getOptions().drawOuterTicks, true); //default value

    assert.is(lineChart.localName, "div");
    assert.is(lineChart.className, "chart-container");
    
    assert.is(context.strokeStyle, "#000000");
    
});
SimpleLineChartProjectorTestSuite.run();
