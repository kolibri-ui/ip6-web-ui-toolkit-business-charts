// noinspection SpellCheckingInspection

import { SimpleChartProjector }         from "../../src/business-charts/projector/chart/simpleChartProjector.js";
import { SimpleScatterChartController } from "../../src/business-charts/projector/chart/simpleChartController.js";
import { zoomInTool }                   from "../../src/business-charts/projector/toolBar/tools/ZoomInTool.js";
import { zoomOutTool }                  from "../../src/business-charts/projector/toolBar/tools/ZoomOut.js";
import { bubbleTooltipSelectionTool }   from "../../src/business-charts/projector/toolBar/tools/SelectionTool.js";
import { rubberBandTool }               from "../../src/business-charts/projector/toolBar/tools/RubberbandTool.js";
import { panningTool }                  from "../../src/business-charts/projector/toolBar/tools/PanningTool.js";
import { DataTableViewProjector }       from "../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { SimpleDetailView }             from "../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";
import { DataTableViewController }      from "../../src/business-charts/projector/dataTableView/dataTableViewController.js";

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

const controller = SimpleScatterChartController(data, {
    tools: [
        zoomInTool,
        zoomOutTool,
        bubbleTooltipSelectionTool,
        rubberBandTool,
        panningTool,
    ]
});

document.getElementById('container').append(SimpleChartProjector(controller));

const detailView = document.getElementById('detail-view');
detailView.append(DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[0]), 'Data points'), SimpleDetailView(controller));

const pointSizeSlider = document.getElementById("data-point-size");
pointSizeSlider.value = Number(getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-size-1-1")) || 5;
pointSizeSlider.nextElementSibling.value = pointSizeSlider.value;
pointSizeSlider.onchange = (_) => document.documentElement.style.setProperty("--data-point-size-1-1", pointSizeSlider.value);

const colorPicker = document.getElementById("data-point-color");
colorPicker.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-color-1-1").trim();
colorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-color-1", colorPicker.value);

const selectedColorPicker = document.getElementById("data-point-selected-color");
selectedColorPicker.value = getComputedStyle(document.querySelector(".chart-canvas")).getPropertyValue("--data-point-selected-color").trim();
selectedColorPicker.onchange = (_) => document.documentElement.style.setProperty("--data-point-selected-color", selectedColorPicker.value);