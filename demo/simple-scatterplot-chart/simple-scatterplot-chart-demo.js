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

const controller = SimpleScatterplotController(
    data
);

document.getElementById('container').append(SimpleScatterplotChart(controller));

const dataButton = document.getElementById("data-point-random-data");
dataButton.onclick = (_) => {
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
pointSizeSlider.value = Number(getComputedStyle(document.querySelector(".scatterplot-canvas")).getPropertyValue("--data-point-size"));
pointSizeSlider.nextElementSibling.value = pointSizeSlider.value;
pointSizeSlider.onchange = (_) => document.querySelector(".scatterplot-canvas").style.setProperty("--data-point-size", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".scatterplot-canvas")).getPropertyValue("--data-point-color").trim();
colorPicker.onchange = (_) => document.querySelector(".scatterplot-canvas").style.setProperty("--data-point-color", colorPicker.value);