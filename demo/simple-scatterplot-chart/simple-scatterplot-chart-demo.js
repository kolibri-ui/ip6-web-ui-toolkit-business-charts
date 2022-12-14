// noinspection SpellCheckingInspection

import { SimpleScatterplotChart }      from "../../src/business-charts/projector/simpleScatterplotChart/simpleScatterplotChartProjector.js";
import { SimpleScatterplotController } from "../../src/business-charts/projector/simpleScatterplotChart/simpleScatterplotChartController.js";

/** @type { Array.<ScatterplotChartDataElement> } */ const data = [{
    name: '1', xValue: -4, yValue: 3,
}, {
    name: '2', xValue: 4, yValue: 3,
}, {
    name: '3', xValue: -4, yValue: -3,
}, {
    name: '4', xValue: 4, yValue: -3,
},];

// /** @type { CanvasPoint2D } */
// const nullPoint = { xValue: 255, yValue: 300 };
//
// /** @type { GridOptions }*/
// const gridOptions = {
//     nullPoint: nullPoint,
//     canvasWidth: 500,
//     canvasHeight: 500,
//     xRatio: 20,
//     yRatio: 20,
//     xEvery: 5,
//     yEvery: 1,
//     drawOuterTicks: true
// };
//
// const simpleScatterplotChart = SimpleScatterplotChart(
//     data,
//     {
//         width: 500,
//         height: 500,
//         padding: 5,
//         colors: ["#a55ca5", "#67b6c7", "#bccd7a", "#eb9743"],
//         gridOptions: gridOptions
//     }
// );

const controller = SimpleScatterplotController(
    data
);

document.getElementById('container').append(SimpleScatterplotChart(controller));

const dataButton = document.getElementById("data-point-random-data");
dataButton.onclick = _ => {
    /** @type { Array<ScatterplotChartDataElement> } */
    const dataArray = [];
    const xMin = controller.xMin.getValue();
    const xMax = controller.xMax.getValue();
    const yMin = controller.yMin.getValue();
    const yMax = controller.yMax.getValue();

    for (let i = xMin; i <= xMax; i++) {
        dataArray.push({
            name: '',
            xValue: i,
            yValue: Math.floor(Math.random() * (yMax - yMin + 1) + yMin)
        })
    }

    controller.setData(dataArray);
};

const pointSizeSlider = document.getElementById("data-point-size");
pointSizeSlider.value = controller.getPointSize();
pointSizeSlider.onchange = _ => controller.setPointSize(pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = controller.getColor();
colorPicker.onchange = _ => controller.setColor(colorPicker.value);