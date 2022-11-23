// noinspection SpellCheckingInspection

import {
    Attribute,
    X_RATIO,
    Y_RATIO
} from "../../../src/Kolibri/docs/src/kolibri/presentationModel.js";

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
 * @property { Array.<ScatterplotChartDataElement> } data
 * @property { Number } xRatio
 // * @property { Number } yRatio
 * @example
 *  const model = SimpleScatterplotModel({
 *      data: data,
 *      xRatio: 10,
 *      yRatio: 20
 *  });
 */

/**
 *
 */

/**
 *
 * @param { SimpleScatterplotChartModel }
 * @returns { AttributeType<*> }
 * @constructor
 */
const SimpleScatterplotChartModel = ( { data , xRatio }) => {
    const scatterplotAttr = Attribute(data);
    scatterplotAttr.getObs(X_RATIO).setValue(xRatio);
    // scatterplotAttr.getObs(Y_RATIO).setValue(yRatio);

    return /** AttributeType<T> */ scatterplotAttr;
};