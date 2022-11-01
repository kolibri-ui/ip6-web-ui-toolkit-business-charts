import { TestSuite } from "../../src/Kolibri/docs/src/kolibri/util/test.js";
import {SimpleBarChart} from "../../src/business-charts/projector/simpleBarChart.js";

const simpleBarChartDemoSuite = TestSuite("simpleBarChart");

/**
 * The purpose of a spike is not to test all possible user interactions and their outcome but rather
 * making sure that the view construction and the binding is properly set up.
 * Complex logic is to be tested against the controller (incl. model).
 */
simpleBarChartDemoSuite.add("demo/simple-bar-chart/simple-bar-char-demo", assert => {

    // const chartGridOptions = SimpleBarChart.options;
    // chartGridOptions.hasGrid = true;
    // chartGridOptions.hasHorizontalLines = true;
    // chartGridOptions.hasVerticalLines = false;
    // chartGridOptions.displayNumbers = true;
    // chartGridOptions.horizontalSteps = 5;
    // chartGridOptions.verticalSteps = 5;
    // chartGridOptions.primaryLineColor = 'black';
    // chartGridOptions.secondaryLineColor = 'grey';
    //
    //const simpleBarChart = SimpleBarChart(SimpleBarChart.options);

    const data = [{
        name: "Classical Music", value: 16,
    }, {
        name: "Alternative Rock", value: 12,
    }, {
        name: "Pop", value: 18,
    }, {
        name: "Jazz", value: 32,
    },];

    const gridOptions = {
        hasGrid: true,
        hasHorizontalLines: true,
        hasVerticalLines: false,
        displayNumbers: true,
        horizontalSteps: 5,
        verticalSteps: 5,
        primaryLineColor: 'black',
        secondaryLineColor: 'grey'
    };
    
    const simpleBarChart = SimpleBarChart({ data: data, width: 500, height: 400, padding: 5, gridOptions: gridOptions} );
    
    assert.is(typeof gridOptions, "ChartGridOptions");
    assert.is(typeof data, "Array.<BarChartDataElement>");
});

simpleBarChartDemoSuite.run();