import { SimpleScatterplotChart } from "../../src/business-charts/projector/simpleScatterplotChart.js";

/** @type { Array.<ScatterplotChartDataElement> } */ const data = [{
    name: '1', xValue: -4, yValue: 3,
}, {
    name: '2', xValue: 4, yValue: 3,
}, {
    name: '3', xValue: -4, yValue: -3,
}, {
    name: '4', xValue: 4, yValue: -3,
},];

/** @type { ChartGridOptions }*/ const gridOptions = {
    hasGrid: true,
    hasHorizontalLines: true,
    hasVerticalLines: true,
    displayNumbers: true,
    horizontalSteps: 10,
    verticalSteps: 10,
    primaryLineColor: 'black',
    secondaryLineColor: 'grey'
};

const simpleScatterplotChart = SimpleScatterplotChart(
    data,
    {
        width: 100,
        height: 100,
        padding: 5,
        colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
        gridOptions: gridOptions
    }
);

document.getElementById('container').append(simpleScatterplotChart);