// noinspection SpellCheckingInspection

import { SimpleScatterChart }           from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartProjector.js";
import { SimpleScatterChartController } from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartController.js";

import { SimpleLineChart } from "../../src/business-charts/projector/simpleLineChart/simpleLineChartProjector.js";
import { SimpleLineChartController } from "../../src/business-charts/projector/simpleLineChart/simpleLineChartController.js";

/************************************** Simple Scatter Chart *********************************/
/** @type { Array.<ScatterChartDataElement> } */ const data = [ {
    name: '1', xValue: -4, yValue: 3,
}, {
    name: '2', xValue: 4, yValue: 3,
}, {
    name: '3', xValue: -4, yValue: -3,
}, {
    name: '4', xValue: 4, yValue: -3,
},];
const controller = SimpleScatterChartController(
    data
);
document.getElementById('container').append(SimpleScatterChart(controller));
/************************************** Simple Scatter Chart *********************************/

/************************************** Simple Line Chart *********************************/
// /** @type { Array.<LineChartDataElement> } */ const data = [ {
//     name: '001', xValue: 0, yValue: 0,
// }, {
//     name: '002', xValue: 1, yValue: 15,
// }, {
//     name: '003', xValue: 2, yValue: 3,
// }, {
//     name: '004', xValue: 3, yValue: 27,
// },{
//     name: '005', xValue: 4, yValue: -3,
// },{
//     name: '006', xValue: 5, yValue: 30,
// },
// ];
// const controller = SimpleLineChartController(
//     data
// );
// document.getElementById('container').append(SimpleLineChart(controller));
/************************************** Simple Line Chart *********************************/


const dataButton = document.getElementById("data-point-random-data");
dataButton.onclick                                          = (_) => {
    // /** @type { Array<ScatterChartDataElement> } */
    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];
    const xMin = controller.xMin.getValue();
    const xMax = controller.xMax.getValue();
    const yMin = controller.yMin.getValue();
    const yMax = controller.yMax.getValue();

    for (let i = xMin; i <= xMax; i++) {
        dataArray.push({
            name: `Point ${i}`,
            xValue: i,
            yValue: Math.floor(Math.random() * (yMax - yMin + 1) + yMin)
        })
    }

    controller.setData(dataArray);
};

const pointSizeSlider = document.getElementById("data-point-size");
pointSizeSlider.value = Number(getComputedStyle(document.querySelector(".scatter-chart-canvas")).getPropertyValue("--data-point-size"));
pointSizeSlider.nextElementSibling.value = pointSizeSlider.value;
pointSizeSlider.onchange = (_) => document.querySelector(".scatter-chart-canvas").style.setProperty("--data-point-size", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".scatter-chart-canvas")).getPropertyValue("--data-point-color").trim();
colorPicker.onchange = (_) => document.querySelector(".scatter-chart-canvas").style.setProperty("--data-point-color", colorPicker.value);

const selectedColorPicker = document.getElementById("data-point-selected-color");
selectedColorPicker.value = getComputedStyle(document.querySelector(".scatter-chart-canvas")).getPropertyValue("--data-point-selected-color").trim();
selectedColorPicker.onchange = (_) => document.querySelector(".scatter-chart-canvas").style.setProperty("--data-point-selected-color", selectedColorPicker.value);