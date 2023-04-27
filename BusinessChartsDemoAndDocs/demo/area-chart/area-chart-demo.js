// noinspection SpellCheckingInspection

import {
    AreaChartController,
}                                     from "../../../src/business-charts/projector/chart/advancedChartController.js";
import { AdvancedChartProjector }     from "../../../src/business-charts/projector/chart/advancedChartProjector.js";
import { zoomInTool }                 from "../../../src/business-charts/projector/toolBar/tools/ZoomInTool.js";
import { zoomOutTool }                from "../../../src/business-charts/projector/toolBar/tools/ZoomOut.js";
import { bubbleTooltipSelectionTool } from "../../../src/business-charts/projector/toolBar/tools/SelectionTool.js";
import { rubberBandTool }             from "../../../src/business-charts/projector/toolBar/tools/RubberbandTool.js";
import { panningTool }                from "../../../src/business-charts/projector/toolBar/tools/PanningTool.js";
import { DataTableViewProjector }     from "../../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { DataTableViewController }    from "../../../src/business-charts/projector/dataTableView/dataTableViewController.js";
import { SimpleDetailView }           from "../../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";

/** @type { Array<ChartDataElement> } */ const dataSerie1 = [ {
    name: 'A1', xValue: -4, yValue: 2,
}, {
    name: 'B1', xValue: -3, yValue: 3,
}, {
    name: 'C1', xValue: -2, yValue: 1,
}, {
    name: 'D1', xValue: -1, yValue: -5,
}, {
    name: 'E1', xValue: 0, yValue: 3,
},{
    name: 'F1', xValue: 1, yValue: -4,
},{
    name: 'G1', xValue: 2, yValue: 2,
},{
    name: 'H1', xValue: 3, yValue: 3,
},{
    name: 'I1', xValue: 4, yValue: 7,
},];

/** @type { Array<ChartDataElement> } */ const dataSerie2 = [ {
    name: 'A2', xValue: -4, yValue: 3,
}, {
    name: 'B2', xValue: -3, yValue: 2,
}, {
    name: 'C2', xValue: -2, yValue: 0,
}, {
    name: 'D2', xValue: -1, yValue: -3,
}, {
    name: 'E2', xValue: 0, yValue: 1,
},{
    name: 'F2', xValue: 1, yValue: -1,
},{
    name: 'G2', xValue: 2, yValue: 4,
},{
    name: 'H2', xValue: 3, yValue: 2,
},{
    name: 'I2', xValue: 4, yValue: 9,
},];

const controller = AreaChartController([dataSerie1, dataSerie2], {
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool,
            rubberBandTool,
            panningTool,
        ]
    });

document.getElementById('container').append(AdvancedChartProjector(controller));

const detailView = document.getElementById('detail-view');
const tableViews = document.createElement("div");
tableViews.classList.add("data-table-views");
tableViews.append(
    DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[0]), 'Data points serie 1'),
    DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[1]), 'Data points serie 2')
);
detailView.append(tableViews, SimpleDetailView(controller));

const pointSizeSlider1 = document.getElementById("data-point-size-1");
pointSizeSlider1.value = Number(getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-size-1-1")) || 5;
pointSizeSlider1.nextElementSibling.value = pointSizeSlider1.value;
pointSizeSlider1.onchange = (_) => document.documentElement.style.setProperty("--data-point-size-1-1", pointSizeSlider1.value);

const pointSizeSlider2 = document.getElementById("data-point-size-2");
pointSizeSlider2.value = Number(getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-size-2")) || 5;
pointSizeSlider2.nextElementSibling.value = pointSizeSlider2.value;
pointSizeSlider2.onchange = (_) => document.documentElement.style.setProperty("--data-point-size-1-2", pointSizeSlider2.value);

const colorPicker1 = document.getElementById("data-point-color-1");
colorPicker1.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-color-1-1").trim();
colorPicker1.onchange = (_) => document.documentElement.style.setProperty("--data-point-color-1-1", colorPicker1.value);

const colorPicker2 = document.getElementById("data-point-color-2");
colorPicker2.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-color-1-2").trim();
colorPicker2.onchange = (_) => document.documentElement.style.setProperty("--data-point-color-1-2", colorPicker2.value);

const selectedColorPicker = document.getElementById("data-point-selected-color");
selectedColorPicker.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-selected-color").trim();
selectedColorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-selected-color", selectedColorPicker.value);