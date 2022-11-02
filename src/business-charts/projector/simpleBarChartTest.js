import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleBarChart } from "./simpleBarChart.js";

const simpleBarChartSuite = TestSuite("src/business-charts/projector/simpleBarChart");

simpleBarChartSuite.add("parameter length of simple bar chart", assert => {
    const simpleBarChart = SimpleBarChart.length;
    assert.is(simpleBarChart, 1);

});

simpleBarChartSuite.add("simple bar chart", assert => {

    const data = () =>
        [{
            name: "Classical Music", value: 16,
        }, {
            name: "Alternative Rock", value: 12,
        }, {
            name: "Pop", value: 18,
        }, {
            name: "Jazz", value: 32,
        },];

    const gridOptions = () => ({
        hasGrid: true,
        hasHorizontalLines: true,
        hasVerticalLines: false,
        displayNumbers: true,
        horizontalSteps: 5,
        verticalSteps: 5,
        primaryLineColor: 'black',
        secondaryLineColor: 'grey'
    });

    const simpleBarChart = SimpleBarChart({
        data: data(),
        width: 500,
        height: 400,
        padding: 5,
        gridOptions: gridOptions()
    } );

    assert.is(simpleBarChart.localName, "canvas");

});

simpleBarChartSuite.run();