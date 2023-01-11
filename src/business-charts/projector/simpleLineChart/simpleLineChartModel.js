// noinspection SpellCheckingInspection

import {
    Attribute,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
    COLORS,
    DOMAIN_NULL_POINT,
    DRAW_OUTER_TICKS,
    ELEMENT_ID,
    FILTERED_DATA,
    X_EVERY,
    X_RATIO,
    Y_EVERY,
    Y_RATIO
}                     from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { generateId } from "../../util/functions.js";

export { SimpleLineChartModel }

/**
 * @typedef { Object } LineChartDataElement
 * @property { String } name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 * @example
 * const data = const data = [{
         name: '1', xValue: -4, yValue: 3,
    }, {
        name: '2', xValue: 4, yValue: 3,
    }, {
        name: '3', xValue: -4, yValue: -3,
    }, {
        name: '4', xValue: 4, yValue: -3,
    },];
 */

/**
 * @typedef { Object } SimpleLineChartAttributes
 * @property { Array<LineChartDataElement> } data
 * @property { ?String } id
 * @property { ?Number } xRatio
 * @property { ?Number } yRatio
 * @property { ?Number } xEvery
 * @property { ?Number } yEvery
 * @property { ?Number } canvasWidth
 * @property { ?Number } canvasHeight
 * @property { ?CanvasPoint2D } domainNullPoint
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 * @property { ?Array<String> } colors Colors for points //TODO change for line chart
 */

/**
 * @private
 * @type { String } id-prefix to identify a unique simple line chart
 */
const chartPrefix = 'simple-line-chart-model-';

/**
 * @private
 * @type { !number } accending numbered id-suffix to identify a unique simple line chart
 */
let numbering = 0;

/**
 * TODO: pointSize as configurable parameter
 * @param { SimpleLineChartAttributes } options
 * @return { AttributeType<*> }
 * @constructor
 */
const SimpleLineChartModel = ({
    data,
    xRatio,
    yRatio,
    xEvery,
    yEvery,
    canvasWidth,
    canvasHeight,
    domainNullPoint,
    drwawOuterTicks,
    colors
}) => {
    const lineChartAttr = Attribute(data);
    lineChartAttr.getObs(FILTERED_DATA).setValue(data);
    lineChartAttr.getObs(ELEMENT_ID).setValue(chartPrefix + String(numbering++));
    lineChartAttr.getObs(X_RATIO).setValue(xRatio ?? 20);
    lineChartAttr.getObs(Y_RATIO).setValue(yRatio ?? 20);
    lineChartAttr.getObs(X_EVERY).setValue(xEvery ?? 1);
    lineChartAttr.getObs(Y_EVERY).setValue(yEvery ?? 1);
    lineChartAttr.getObs(CANVAS_WIDTH).setValue(canvasWidth ?? 600);
    lineChartAttr.getObs(CANVAS_HEIGHT).setValue(canvasHeight ?? 400);
    lineChartAttr.getObs(DOMAIN_NULL_POINT).setValue(domainNullPoint ?? { xValue: 200, yValue: 200 });
    lineChartAttr.getObs(DRAW_OUTER_TICKS).setValue(drwawOuterTicks ?? false);
    lineChartAttr.getObs(COLORS).setValue(colors ?? [ "#a55ca5", "#67b6c7", "#bccd7a", "#eb9743" ]);
    //TODO use kolibri colors as default value

    return /** AttributeType<*> */ lineChartAttr;
};