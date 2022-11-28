// // noinspection SpellCheckingInspection
//
// import { TestSuite } from "../../../src/Kolibri/docs/src/kolibri/util/test.js";
// import { SimpleScatterplotChartModel } from "./simpleScatterplotChartModel.js";
// import { VALUE, X_RATIO, Y_RATIO } from "../../../src/Kolibri/docs/src/kolibri/presentationModel.js";
//
// const simpleScatterplotChartModelSuite = TestSuite("/playground/mvc/simpleScatterplotChartModel");
//
// //Input von Controller.
// //Wenn oldValue !== newValue, dann xRatio auf newValue setzen
// //Controller informiert View dass sie sich updaten muss
// simpleScatterplotChartModelSuite.add("xRatio Value", assert => {
//     // /** @type { Array.<ScatterplotChartDataElement> } */ const data = [{
//     //     name: '1', xValue: -4, yValue: 3,
//     // }, {
//     //     name: '2', xValue: 4, yValue: 3,
//     // }, {
//     //     name: '3', xValue: -4, yValue: -3,
//     // }, {
//     //     name: '4', xValue: 4, yValue: -3,
//     // },];
//     const model = SimpleScatterplotChartModel({
//         // data:  data,
//         xRatio: 10,
//         yRatio: 15
//     });
//     // assert.is(model.hasObs(VALUE),   true);
//     assert.is(model.hasObs(X_RATIO), true);
//     assert.is(model.hasObs(Y_RATIO), true);
// });
//
// simpleScatterplotChartModelSuite.run();