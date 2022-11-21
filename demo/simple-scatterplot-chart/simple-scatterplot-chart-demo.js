// noinspection SpellCheckingInspection

import { SimpleScatterplotChart } from "../../src/business-charts/projector/simpleScatterplotChart/simpleScatterplotChart.js";

/** @type { Array.<ScatterplotChartDataElement> } */ const data = [{
    name: '1', xValue: -4, yValue: 3,
}, {
    name: '2', xValue: 4, yValue: 3,
}, {
    name: '3', xValue: -4, yValue: -3,
}, {
    name: '4', xValue: 4, yValue: -3,
},];

/** @type { CanvasPoint2D } */
const nullPoint = { xValue: 255, yValue: 300 };

/** @type { GridOptions }*/
const gridOptions = {
    nullPoint: nullPoint,
    canvasWidth: 500,
    canvasHeight: 500,
    xRatio: 20,
    yRatio: 20,
    xEvery: 5,
    yEvery: 1,
    drawOuterTicks: true
};

const simpleScatterplotChart = SimpleScatterplotChart(
    data,
    {
        width: 500,
        height: 500,
        padding: 5,
        colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
        gridOptions: gridOptions
    }
);

document.getElementById('container').append(simpleScatterplotChart);