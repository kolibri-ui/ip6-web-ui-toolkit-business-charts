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

simpleScatterplotChartModelSuite.add("Scatter Chart attributes get correct observable values", assert => {
    /** @type { Array.<ScatterChartDataElement> } */ const data = [ {
        name: '1', xValue: -4, yValue: 8,
    }, {
        name: '2', xValue: 4, yValue: 3,
    }, {
        name: '3', xValue: -2, yValue: -3,
    }, {
        name: '4', xValue: 2, yValue: -8,
    },];
    const model                                                 = SimpleScatterChartModel({
        data:  data,
        colors: "#BDBDBD",
        canvasWidth: 654,
        canvasHeight: 965,
    });
    assert.is(model.getObs(FILTERED_DATA).getValue().at(0).xValue, -4);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(0).yValue, 8);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(1).xValue, 4);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(1).yValue, 3);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(2).xValue, -2);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(2).yValue, -3);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(3).xValue, 2);
    assert.is(model.getObs(FILTERED_DATA).getValue().at(3).yValue, -8);
    
    //default values from model
    assert.is(model.getObs(X_RATIO).getValue(), 20);
    assert.is(model.getObs(Y_RATIO).getValue(), 20);
    assert.is(model.getObs(X_EVERY).getValue(), 1);
    assert.is(model.getObs(Y_EVERY).getValue(), 1);
    //TODO: observable of CANVAS_WIDTH shows the value of CANVAS_HEIGHT
    assert.is(model.getObs(CANVAS_WIDTH).getValue(), 654); //TODO 400 instead of 600
    assert.is(model.getObs(CANVAS_HEIGHT).getValue(), 965);
    assert.is(model.getObs(DOMAIN_NULL_POINT).getValue().xValue, 200);
    assert.is(model.getObs(DOMAIN_NULL_POINT).getValue().yValue, 200);
    assert.is(model.getObs(DRAW_OUTER_TICKS).getValue(), false);
    
    assert.is(model.getObs(COLORS).getValue(), "#BDBDBD");
});
simpleScatterplotChartModelSuite.run();
