// noinspection SpellCheckingInspection

import { TestSuite }               from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterChartModel } from "./simpleScatterChartModel.js";
import {
    CANVAS_HEIGHT,
    CANVAS_WIDTH, COLORS, DOMAIN_NULL_POINT, DRAW_OUTER_TICKS,
    ELEMENT_ID,
    FILTERED_DATA,
    VALUE,
    X_EVERY,
    X_RATIO, Y_EVERY,
    Y_RATIO
}                                  from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

const simpleScatterplotChartModelSuite = TestSuite("src/business-charts/projector/simpleScatterplotChartModel");

simpleScatterplotChartModelSuite.add("Scatter Chart attributes have observables", assert => {
    /** @type { Array.<ScatterChartDataElement> } */ const data = [ {
        name: '1', xValue: -4, yValue: 3,
    }, {
        name: '2', xValue: 4, yValue: 3,
    }, {
        name: '3', xValue: -4, yValue: -3,
    }, {
        name: '4', xValue: 4, yValue: -3,
    },];
    const model                                                 = SimpleScatterChartModel({
        data:  data,
    });
    assert.is(model.hasObs(VALUE),   true);
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

});

simpleScatterplotChartModelSuite.run();