//import { data } from "./20221223_ogd51_wochenstatistik_elektrizitaetsbilanz.csv";

export { energyDataFile }

/** @type { Array.<LineChartDataElement> } */ const energyDataFile = [{
    name: 'A', xValue: -20, yValue: 10,
}, {
    name: 'B', xValue: -10, yValue: -10, //input field listens only from this value
}, {
    name: 'C', xValue: 0, yValue: 10,
}, {
    name: 'D', xValue: 10, yValue: -10,
}, {
    name: 'E', xValue: 20, yValue: 10,
}, {
    name: 'F', xValue: 30, yValue: -10,
}, {
    name: 'G', xValue: 40, yValue: 10,
},
];

/**
 * based on https://stackoverflow.com/questions/28543821/convert-csv-lines-into-javascript-objects
 * */
/************** csv data ************* */
// const [headerLine, ...lines] = data.split('\\n');

