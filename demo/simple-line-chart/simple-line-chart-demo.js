// noinspection SpellCheckingInspection

import { SimpleLineChart } from "../../src/business-charts/projector/simpleLineChart/";
import { SimpleLineChartController } from "../../src/business-charts/projector/simpleLineChart/";

/** @type { Array<LineChartDataElement> } */ const data = [{
    name: 'A', xValue: 0, yValue: 0,
}, {
    name: 'B', xValue: 1, yValue: 1,
}, {
    name: 'C', xValue: 2, yValue: 5,
}, {
    name: 'D', xValue: 3, yValue: 2,
}, {
    name: 'E', xValue: 4, yValue: 5,
}, {
    name: 'F', xValue: 5, yValue: 1,
}, {
    name: 'G', xValue: 6, yValue: 7,
},];

const controller = SimpleLineChartController(
    data
);

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