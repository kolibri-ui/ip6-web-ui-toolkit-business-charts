// noinspection SpellCheckingInspection

import { SimpleChartProjector }         from "../../src/business-charts/projector/chart/simpleChartProjector.js";
import {
    SimpleAreaChartController,
} from "../../src/business-charts/projector/chart/simpleChartController.js";

/** @type { Array<ChartDataElement> } */ const data = [ {
    name: 'A', xValue: -4, yValue: 3,
}, {
    name: 'B', xValue: -3, yValue: 2,
}, {
    name: 'C', xValue: -2, yValue: 0,
}, {
    name: 'D', xValue: -1, yValue: -3,
}, {
    name: 'E', xValue: 0, yValue: 1,
},{
    name: 'F', xValue: 1, yValue: -1,
},{
    name: 'G', xValue: 2, yValue: 4,
},{
    name: 'H', xValue: 3, yValue: 2,
},{
    name: 'I', xValue: 4, yValue: 9,
},];

const controller = SimpleAreaChartController(data);

document.getElementById('container').append(SimpleChartProjector(controller));

const pointSizeSlider = document.getElementById("data-point-size");
pointSizeSlider.value = Number(getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-size-1")) || 5;
pointSizeSlider.nextElementSibling.value = pointSizeSlider.value;
pointSizeSlider.onchange = (_) => document.documentElement.style.setProperty("--data-point-size-1", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-color-1").trim();
colorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-color-1", colorPicker.value);