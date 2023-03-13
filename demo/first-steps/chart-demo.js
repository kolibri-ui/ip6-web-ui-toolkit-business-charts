// noinspection SpellCheckingInspection
import {
    SimpleAreaChartController,
    SimpleLineChartController,
    SimpleScatterChartController
} from "../../src/business-charts/projector/chart/simpleChartController.js";
import { SimpleChartProjector }         from "../../src/business-charts/projector/chart/simpleChartProjector.js";
import { DataTableView }          from "../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { SimpleDetailView }       from "../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";
import { zoomInTool }             from "../../src/business-charts/projector/toolBar/tools/ZoomInTool.js";
import { zoomOutTool }            from "../../src/business-charts/projector/toolBar/tools/ZoomOut.js";
import {
    bottomCenterTooltipSelectionTool,
    bubbleTooltipSelectionTool, leftCenterTooltipSelectionTool
}                                 from "../../src/business-charts/projector/toolBar/tools/SelectionTool.js";
import { rubberBandTool }         from "../../src/business-charts/projector/toolBar/tools/RubberbandTool.js";
import { panningTool }            from "../../src/business-charts/projector/toolBar/tools/PanningTool.js";
import { AdvancedChartProjector } from "../../src/business-charts/projector/chart/advancedChartProjector.js";
import {
    AreaChartController, LineChartController,
    ScatterChartController
} from "../../src/business-charts/projector/chart/advancedChartController.js";

// Your data. These can be created directly here, for example.
/** @type { Array.<ChartDataElement> } */ const data = [ {
    name: 'A', xValue: -4, yValue: 3,
}, {
    name: 'B', xValue: -3, yValue: 2,
}, {
    name: 'C', xValue: -2, yValue: 0,
}, {
    name: 'D', xValue: -1, yValue: -3,
}, {
    name: 'E', xValue: 0, yValue: 1,
}, {
    name: 'F', xValue: 1, yValue: -1,
},{
    name: 'G', xValue: 2, yValue: 4,
},{
    name: 'H', xValue: 3, yValue: 2,
},{
    name: 'I', xValue: 4, yValue: 9,
},];

// If you have more than one data serie, the advanced contoller is the right choice.
/** @type { Array.<ChartDataElement> } */ const data2 = [ {
    name: 'A', xValue: -4, yValue: 13,
}, {
    name: 'B', xValue: -3, yValue: 12,
}, {
    name: 'C', xValue: -2, yValue: 10,
}, {
    name: 'D', xValue: -1, yValue: -13,
}, {
    name: 'E', xValue: 0, yValue: 11,
}, {
    name: 'F', xValue: 1, yValue: -11,
},{
    name: 'G', xValue: 2, yValue: 14,
},{
    name: 'H', xValue: 3, yValue: 12,
},{
    name: 'I', xValue: 4, yValue: 19,
},];


// at least pass on the data to your simple chart controller
const controller = SimpleAreaChartController(data);

// see the sample for the advanced version below:
const advancedController = LineChartController([data, data2],
    { //pass the optional toolbar
        tools: [
            zoomInTool,
            zoomOutTool,
            bubbleTooltipSelectionTool, // you can choose other tooltips
            rubberBandTool,
            panningTool,
        ]
    }
);


// append the projectors to your HTML bindings. 
// Pass the controller as parameter in your simple projector.
document.getElementById('containerSimple').append(SimpleChartProjector(controller));

// Pass the controller as parameter in your advanced projector.
document.getElementById('containerAdvanced').append(AdvancedChartProjector(advancedController));


//TODO add detail and table view when the corresponding projectors work
// const detailView = document.getElementById('detail-view');
// detailView.append(DataTableView(controller, 'Datenpunkte'), SimpleDetailView(controller));