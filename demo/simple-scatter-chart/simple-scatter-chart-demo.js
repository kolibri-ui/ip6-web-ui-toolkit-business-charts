// noinspection SpellCheckingInspection

import { SimpleScatterChart }           from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartProjector.js";
import { SimpleScatterChartController } from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartController.js";
import { DataTableView }                from "../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { SimpleDetailView }             from "../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";
import { zoomInTool }                   from "../../src/business-charts/projector/toolBar/tools/ZoomInTool.js";
import { zoomOutTool }                  from "../../src/business-charts/projector/toolBar/tools/ZoomOut.js";
import { bubbleTooltipSelectionTool }   from "../../src/business-charts/projector/toolBar/tools/SelectionTool.js";
import { rubberBandTool }               from "../../src/business-charts/projector/toolBar/tools/RubberbandTool.js";
import { panningTool }                  from "../../src/business-charts/projector/toolBar/tools/PanningTool.js";

import { data } from "../data-files/testData.mjs";

// /** @type { Array.<ScatterChartDataElement> } */ const data = [ {
//     name: '1', xValue: -4, yValue: 3,
// }, {
//     name: '2', xValue: 4, yValue: 3,
// }, {
//     name: '3', xValue: -4, yValue: -3,
// }, {
//     name: '4', xValue: 4, yValue: -3,
// },];

const controller = SimpleScatterChartController(
    data,
    {
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool,
            rubberBandTool,
            panningTool,
        ]
    }
);

document.getElementById('container').append(SimpleScatterChart(controller));
const detailView = document.getElementById('detail-view');
detailView.append(DataTableView(controller, 'Datenpunkte'), SimpleDetailView(controller));

const dataButton = document.getElementById("data-point-random-data");
dataButton.onclick                                          = (_) => {
    /** @type { Array<ScatterChartDataElement> } */
    const dataArray = [];
    const xMin = controller.boundaries.xMin + 1;
    const xMax = controller.boundaries.xMax - 1;
    const yMin = controller.boundaries.yMin + 1;
    const yMax = controller.boundaries.yMax - 1;

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
pointSizeSlider.onchange = (_) => document.documentElement.style.setProperty("--data-point-size", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".scatter-chart-canvas")).getPropertyValue("--data-point-color").trim();
colorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-color", colorPicker.value);

const selectedColorPicker = document.getElementById("data-point-selected-color");
selectedColorPicker.value = getComputedStyle(document.querySelector(".scatter-chart-canvas")).getPropertyValue("--data-point-selected-color").trim();
selectedColorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-selected-color", selectedColorPicker.value);