// noinspection SpellCheckingInspection

import { TestSuite } from "../../../src/Kolibri/docs/src/kolibri/util/test.js";
import { MvcScatterplotModel } from "./mvcScatterplotModel.js";
import { VALUE, X_MIN, X_MAX, Y_MIN, Y_MAX } from "../../../src/Kolibri/docs/src/kolibri/presentationModel.js";

const mvcScatterplotModelTestSuite = TestSuite("/playground/MVCScatterplotChart/projector/mvcScatterplotModelTest");

mvcScatterplotModelTestSuite.add("min, max of x and y axis", assert => {
    /** @type { Array<MvcScatterplotDataElement> } */ const data = [{
        name: 'A', xValue: 33, yValue: 22,
    }, {
        name: 'B', xValue: 40, yValue: 30,
    }, {
        name: 'C', xValue: 60, yValue: 40,
    }, {
        name: 'D', xValue: 66, yValue: 44,
    }];
    const model = MvcScatterplotModel({
        data: data, X_MIN: 33, X_MAX: 66, Y_MIN: 22, Y_MAX: 44 });
});