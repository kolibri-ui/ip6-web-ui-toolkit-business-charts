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

export { SimpleScatterChartModel }

/**
 * @typedef { Object } ScatterChartDataElement
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
 * @typedef { Object } SimpleScatterChartAttributes
 * @property { Array<ScatterChartDataElement> } data
 * @property { ?String } id
 * @property { ?Number } xRatio
 * @property { ?Number } yRatio
 * @property { ?Number } xEvery
 * @property { ?Number } yEvery
 * @property { ?Number } canvasWidth
 * @property { ?Number } canvasHeight
 * @property { ?CanvasPoint2D } domainNullPoint
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 * @property { ?Array<String> } colors Colors for points
 */


/**
 * TODO: pointSize as configurable parameter
 * @param { SimpleScatterChartAttributes } options
 * @returns { AttributeType<*> }
 * @constructor
 */
const SimpleScatterChartModel = ({
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
    const scatterChartAttr = Attribute(data);
    scatterChartAttr.getObs(FILTERED_DATA).setValue(data);
    scatterChartAttr.getObs(ELEMENT_ID).setValue(id ?? generateId('scatterplot-chart'));
    scatterChartAttr.getObs(X_RATIO).setValue(xRatio ?? 20);
    scatterChartAttr.getObs(Y_RATIO).setValue(yRatio ?? 20);
    scatterChartAttr.getObs(X_EVERY).setValue(xEvery ?? 1);
    scatterChartAttr.getObs(Y_EVERY).setValue(yEvery ?? 1);
    scatterChartAttr.getObs(CANVAS_WIDTH).setValue(canvasWidth ?? 600); //TODO bug: sets canvasHeight instead of canvasWidth
    scatterChartAttr.getObs(CANVAS_HEIGHT).setValue(canvasHeight ?? 400);
    scatterChartAttr.getObs(DOMAIN_NULL_POINT).setValue(domainNullPoint ?? { xValue: 200, yValue: 200 });
    scatterChartAttr.getObs(DRAW_OUTER_TICKS).setValue(drawOuterTicks ?? false);
    scatterChartAttr.getObs(COLORS).setValue(colors ?? [ "#a55ca5", "#67b6c7", "#bccd7a", "#eb9743" ]);
    //TODO use kolibri colors as default value

    return /** AttributeType<*> */ scatterChartAttr;
};