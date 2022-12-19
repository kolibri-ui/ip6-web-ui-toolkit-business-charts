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
 * @typedef { Object } LineChartAttributes
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
 * @property { ?Array<String> } colors Colors for lines
 */

/**
 * @param { LineChartAttributes } options
 * @return { AttributeType<*> }
 * @constructor
 */
const SimpleLineChartModel = ({
    data,
    id,
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
    lineChartAttr.getObs(ELEMENT_ID).setValue(id ?? generateId('line-chart'));
    lineChartAttr.getObs(X_RATIO).setValue(xRatio ?? 20);
    lineChartAttr.getObs(Y_RATIO).setValue(yRatio ?? 20);
    lineChartAttr.getObs(X_EVERY).setValue(xEvery ?? 1);
    lineChartAttr.getObs(Y_EVERY).setValue(yEvery ?? 1);
    lineChartAttr.getObs(CANVAS_WIDTH).setValue(canvasWidth ?? 600);
    lineChartAttr.getObs(CANVAS_HEIGHT).setValue(canvasHeight ?? 400);
    lineChartAttr.getObs(DOMAIN_NULL_POINT).setValue(domainNullPoint ?? { xValue: 200, yValue: 200 });
    lineChartAttr.getObs(DRAW_OUTER_TICKS).setValue(drwawOuterTicks ?? false);
    lineChartAttr.getObs(COLORS).setValue(colors ?? ["#DE2A9C"]);

    return /** AttributeType<*> */ lineChartAttr;
};