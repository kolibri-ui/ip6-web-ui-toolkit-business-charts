// noinspection SpellCheckingInspection

import { TestSuite }            from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChartModel } from "./simpleLineChartModel.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH, COLORS, DOMAIN_NULL_POINT, DRAW_OUTER_TICKS,
    ELEMENT_ID,
    FILTERED_DATA,
    VALUE, X_EVERY,
    X_RATIO, Y_EVERY,
    Y_RATIO
}                               from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

const simpleLineChartModelTestSuite = TestSuite("LCM: src/business-charts/projector/simpleLineChartModel");

simpleLineChartModelTestSuite.add("LCM: Line Chart attributes have observables", assert => {
    /** @type { Array<LineChartDataElement> }*/ const data = [{
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
    const model = SimpleLineChartModel({
        data: data,
        canvasWidth: 658,
        canvasHeight: 777,
    });
    assert.is(model.hasObs(VALUE), true);
    assert.is(model.hasObs(FILTERED_DATA), true);
    assert.is(model.hasObs(ELEMENT_ID), true);
    assert.is(model.hasObs(X_RATIO), true);
    assert.is(model.hasObs(Y_RATIO), true);
    assert.is(model.hasObs(X_EVERY), true);
    assert.is(model.hasObs(Y_EVERY), true);
    assert.is(model.hasObs(CANVAS_WIDTH), true);
    assert.is(model.hasObs(CANVAS_HEIGHT), true);
    assert.is(model.hasObs(DOMAIN_NULL_POINT), true);
    assert.is(model.hasObs(DRAW_OUTER_TICKS), true);
    assert.is(model.hasObs(COLORS), true);

    assert.is(model.getObs(CANVAS_WIDTH).getValue(), 658); //TODO 400 instead of 600
    assert.is(model.getObs(CANVAS_HEIGHT).getValue(), 777);
    assert.is(model.getObs(DOMAIN_NULL_POINT).getValue().xValue, 200);
    assert.is(model.getObs(DOMAIN_NULL_POINT).getValue().yValue, 200);
});

simpleLineChartModelTestSuite.run();