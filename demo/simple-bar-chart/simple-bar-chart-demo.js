import {SimpleBarChart} from "../../src/business-charts/projector/SimpleBarChart.js";

/** @type { Array.<BarChartDataElement> } */ const data = [{
    name: "Classical Music", value: 16,
}, {
    name: "Alternative Rock", value: 12,
}, {
    name: "Pop", value: 18,
}, {
    name: "Jazz", value: 32,
},];

/** @type { ChartGridOptions } */ const gridOptions = {
    hasGrid: true,
    hasHorizontalLines: true,
    hasVerticalLines: false,
    displayNumbers: true,
    horizontalSteps: 5,
    verticalSteps: 5,
    primaryLineColor: 'black',
    secondaryLineColor: 'grey'
}

const simpleBarChart = SimpleBarChart({ data: data, width: 500, height: 400, padding: 5, gridOptions: gridOptions} )
document.getElementById('container').append(simpleBarChart);