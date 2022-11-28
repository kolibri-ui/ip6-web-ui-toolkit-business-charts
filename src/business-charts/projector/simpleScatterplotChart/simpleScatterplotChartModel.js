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

export { SimpleScatterplotChartModel }

/**
 * @typedef { Object } ScatterplotChartDataElement
 * @property { String }  name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 * @example
 * const data = [{
 *         name: '1', xValue: -4, yValue: 3,
 *     }, {
 *         name: '2', xValue: 4, yValue: 3,
 *     }, {
 *         name: '3', xValue: -4, yValue: -3,
 *     }, {
 *         name: '4', xValue: 4, yValue: -3,
 *     },];
 */

/**
 * @typedef { Object } SimpleScatterplotAttributes
 * @property { Array<ScatterplotChartDataElement> } data
 * @property { ?String } id
 * @property { ?Number } xRatio
 * @property { ?Number } yRatio
 * @property { ?Number } xEvery
 * @property { ?Number } yEvery
 * @property { ?Number } canvasWidth
 * @property { ?Number } canvasHeight
 * @property { ?CanvasPoint2D } domainNullPoint
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be dawn
 * @property { ?Array<String> } colors Colors for points
 */


/**
 * TODO: pointSize as configurable parameter
 * @param { SimpleScatterplotAttributes } options
 * @returns { AttributeType<*> }
 * @constructor
 */
const SimpleScatterplotChartModel = ({
                                         data,
                                         id,
                                         xRatio,
                                         yRatio,
                                         xEvery,
                                         yEvery,
                                         canvasWidth,
                                         canvasHeight,
                                         domainNullPoint,
                                         drawOuterTicks,
                                         colors
                                     }) => {
    const scatterplotAttr = Attribute(data);
    scatterplotAttr.getObs(FILTERED_DATA).setValue(data);
    scatterplotAttr.getObs(ELEMENT_ID).setValue(id ?? generateId('scatterplot-chart'));
    scatterplotAttr.getObs(X_RATIO).setValue(xRatio ?? 20);
    scatterplotAttr.getObs(Y_RATIO).setValue(yRatio ?? 20);
    scatterplotAttr.getObs(X_EVERY).setValue(xEvery ?? 1);
    scatterplotAttr.getObs(Y_EVERY).setValue(yEvery ?? 1);
    scatterplotAttr.getObs(CANVAS_WIDTH).setValue(canvasWidth ?? 600);
    scatterplotAttr.getObs(CANVAS_HEIGHT).setValue(canvasHeight ?? 400);
    scatterplotAttr.getObs(DOMAIN_NULL_POINT).setValue(domainNullPoint ?? { xValue: 200, yValue: 200 });
    scatterplotAttr.getObs(DRAW_OUTER_TICKS).setValue(drawOuterTicks ?? false);
    scatterplotAttr.getObs(COLORS).setValue(colors ?? [ "#a55ca5", "#67b6c7", "#bccd7a", "#eb9743" ]);

    return /** AttributeType<*> */ scatterplotAttr;
};