// noinspection SpellCheckingInspection
import {
    SimpleAreaChartController, SimpleLineChartController,
}                                  from "../../../src/business-charts/projector/chart/simpleChartController.js";
import { SimpleChartProjector }    from "../../../src/business-charts/projector/chart/simpleChartProjector.js";
import { zoomInTool }              from "../../../src/business-charts/projector/toolBar/tools/ZoomInTool.js";
import { zoomOutTool }             from "../../../src/business-charts/projector/toolBar/tools/ZoomOut.js";
import {
    bubbleTooltipSelectionTool
}                                  from "../../../src/business-charts/projector/toolBar/tools/SelectionTool.js";
import { rubberBandTool }          from "../../../src/business-charts/projector/toolBar/tools/RubberbandTool.js";
import { panningTool }             from "../../../src/business-charts/projector/toolBar/tools/PanningTool.js";
import { AdvancedChartProjector }  from "../../../src/business-charts/projector/chart/advancedChartProjector.js";
import {
    LineChartController,
}                                  from "../../../src/business-charts/projector/chart/advancedChartController.js";
import {
    ChartController,
    LINE_CHART,
    SCATTER_CHART
}                                  from "../../../src/business-charts/projector/chart/chartController.js";
import { DataTableViewProjector }  from "../../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { DataTableViewController } from "../../../src/business-charts/projector/dataTableView/dataTableViewController.js";
import {
    SimpleDetailView
}                                  from "../../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";

// Your data. These can be created directly here, for example.
/** @type { Array.<ChartDataElement> } */ const data = [ {
    name: 'A1', xValue: -4, yValue: 3,
}, {
    name: 'B1', xValue: -3, yValue: 2,
}, {
    name: 'C1', xValue: -2, yValue: 0,
}, {
    name: 'D1', xValue: -1, yValue: -3,
}, {
    name: 'E1', xValue: 0, yValue: 1,
}, {
    name: 'F1', xValue: 1, yValue: -1,
},{
    name: 'G1', xValue: 2, yValue: 4,
},{
    name: 'H1', xValue: 3, yValue: 2,
},{
    name: 'I1', xValue: 4, yValue: 9,
},];

// If you have more than one data serie, the advanced controller is the right choice.
/** @type { Array.<ChartDataElement> } */ const data2 = [ {
    name: 'A2', xValue: -4, yValue: 13,
}, {
    name: 'B2', xValue: -3, yValue: 12,
}, {
    name: 'C2', xValue: -2, yValue: 10,
}, {
    name: 'D2', xValue: -1, yValue: -13,
}, {
    name: 'E2', xValue: 0, yValue: 11,
}, {
    name: 'F2', xValue: 1, yValue: -11,
},{
    name: 'G2', xValue: 2, yValue: 14,
},{
    name: 'H2', xValue: 3, yValue: 12,
},{
    name: 'I2', xValue: 4, yValue: 19,
},];

// If you have more than one data serie, the advanced controller is the right choice.
/** @type { Array.<ChartDataElement> } */ const data3 = [ {
    name: 'A-avg', xValue: -4, yValue: 8,
}, {
    name: 'B-avg', xValue: -3, yValue: 7,
}, {
    name: 'C-avg', xValue: -2, yValue: 5,
}, {
    name: 'D-avg', xValue: -1, yValue: -8,
}, {
    name: 'E-avg', xValue: 0, yValue: 6,
}, {
    name: 'F-avg', xValue: 1, yValue: -6,
},{
    name: 'G-avg', xValue: 2, yValue: 9,
},{
    name: 'H-avg', xValue: 3, yValue: 8,
},{
    name: 'I-avg', xValue: 4, yValue: 14,
},];

const controller = ChartController([
    {data: data, type: "area"},
    {data: data2, type: "line"},
    {data: data3, type: "scatter"},
], {
    tools: [
        zoomInTool,
        zoomOutTool,
        bubbleTooltipSelectionTool,
        rubberBandTool,
        panningTool,
    ]
});

const detailViewMulti = document.getElementById('detail-view-multi');

const tableViews = document.createElement("div");
tableViews.classList.add("data-table-views");
tableViews.append(
    DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[0]), 'Data points serie 1'),
    DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[1]), 'Data points serie 2'),
    DataTableViewProjector(DataTableViewController(controller, controller.getSeries()[2]), 'Data points serie 3')
);
detailViewMulti.append(
    tableViews,
    SimpleDetailView(controller));


// at least pass on the data to your simple chart controller
const simpleController = SimpleAreaChartController(data,
    {
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool, // you can choose other tooltips
            rubberBandTool,
            panningTool,
        ]
    });

// append the projectors to your HTML bindings. 
// Pass the controller for one data serie as parameter in your simple projector.
document.getElementById('containerIntro').append(AdvancedChartProjector(controller));

const simpleController2 = SimpleLineChartController(data,
    {
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool, // you can choose other tooltips
            rubberBandTool,
            panningTool,
        ]
    });


// Simple Example with detail view
document.getElementById('containerSimple2').append(SimpleChartProjector(simpleController2));

const detailView = document.getElementById('detail-view-simple2');
detailView.append(
    DataTableViewProjector(DataTableViewController(simpleController2, simpleController2.getSeries()[0]), 'Data points'),
    SimpleDetailView(simpleController2));

// see the sample for the advanced version below:
const advancedController = LineChartController([data, data2],
    {
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool, // you can choose other tooltips
            rubberBandTool,
            panningTool,
        ]
    });
// Pass the controller for more than one data serie as parameter in your advanced projector.
document.getElementById('containerAdvanced').append(AdvancedChartProjector(advancedController));

// see the sample for the advanced version with different chart types below:
const multipleChartTypesController = ChartController(
    [{ type: SCATTER_CHART, data: data }, { type: SCATTER_CHART, data: data2 }, { type: LINE_CHART, data: data3 }],
    {
        tools:[
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool, // you can choose other tooltips
            rubberBandTool,
            panningTool,
        ]
    });
// Pass the controller for different chart types as parameter in your advanced projector.
document.getElementById('containerMultipleChartTypes').append(AdvancedChartProjector(multipleChartTypesController));




document.getElementById('containerDemo').append(AdvancedChartProjector(advancedController));
const detailViewDemo = document.getElementById('detailViewDemo');
detailViewDemo.append(
    DataTableViewProjector(DataTableViewController(advancedController, advancedController.getSeries()[0]), 'Serie 1'),
    DataTableViewProjector(DataTableViewController(advancedController, advancedController.getSeries()[1]), 'Serie 2'),
    SimpleDetailView(advancedController),
);