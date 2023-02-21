// noinspection SpellCheckingInspection

// Your module imports
import { SimpleScatterChart }           from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartProjector.js";
import { SimpleScatterChartController } from "../../src/business-charts/projector/simpleScatterChart/simpleScatterChartController.js";
import { DataTableView }                from "../../src/business-charts/projector/dataTableView/dataTableViewProjector.js";
import { SimpleDetailView }             from "../../src/business-charts/projector/simpleDetailView/simpleDetailViewProjector.js";

// Your data. These can be created directly here, for example.
/** @type { Array.<ScatterChartDataElement> } */ const data = [ {
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


// pass the data to your controller
const controller = SimpleScatterChartController(
    data
);

// append the projectors to your HTML bindings. Pass the controller as parameter in your projectors.
document.getElementById('container').append(SimpleScatterChart(controller));

const detailView = document.getElementById('detail-view');
detailView.append(DataTableView(controller, 'Datenpunkte'), SimpleDetailView(controller));