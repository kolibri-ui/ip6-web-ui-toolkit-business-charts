// noinspection SpellCheckingInspection

import { SimpleLineChart }           from "../../src/business-charts/projector/simpleLineChart/simpleLineChartProjector.js";
import { SimpleLineChartController } from "../../src/business-charts/projector/simpleLineChart/simpleLineChartController.js";

//TODO Unit Tests that input fields are bigger than the biggest input value
//TODO Unit Tests that all data values are displayed in the canvas
//TODO GridLines are still not visible in canvas
/** @type { Array.<LineChartDataElement> } */ const data = [{
    name: 'A', xValue: 0, yValue: 0,
}, {
    name: 'B', xValue: 10, yValue: 10,
}, {
    name: 'C', xValue: 20, yValue: 0,
}, {
    name: 'D', xValue: 30, yValue: 30,
}, {
    name: 'E', xValue: 40, yValue: 0,
}, {
    name: 'F', xValue: 50, yValue: 50,
}, {
    name: 'G', xValue: 60, yValue: 0,
},
];

const controller = SimpleLineChartController(
    data
);

//append Projector
document.getElementById('container').append(SimpleLineChart(controller));

const dataButton = document.getElementById("data-point-random-data");
dataButton.onclick = (_) => {
    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];
    const xMin = controller.xMin.getValue();
    const xMax = controller.xMax.getValue();
    const yMin = controller.yMin.getValue();
    const yMax = controller.yMax.getValue();
    
    for (let i = xMin; i <= xMax; i++) {
        dataArray.push({
            name: '',
            xValue: i,
            yValue: Math.floor(Math.random() * (yMax - yMin + 1) + yMin )
        })
    }

    controller.setData(dataArray);
};

//TODO change for line chart
const pointSizeSlider = document.getElementById("data-point-size");
pointSizeSlider.value = Number(getComputedStyle(document.querySelector(".line-chart-canvas")).getPropertyValue("--data-point-size"));
pointSizeSlider.nextElementSibling.value = pointSizeSlider.value;
pointSizeSlider.onchange = (_) => document.querySelector(".line-chart-canvas").style.setProperty("--data-point-size", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".line-chart-canvas")).getPropertyValue("--data-point-color").trim();
colorPicker.onchange = (_) => document.querySelector(".line-chart-canvas").style.setProperty("--data-point-color", colorPicker.value);