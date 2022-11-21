// noinspection SpellCheckingInspection

import {
    Attribute,
    X_RATIO,
    Y_RATIO
} from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

export { SimpleScatterplotChartModel }

/**
 * @typedef { Object } ScatterplotChartDataElement
 * @property { String }  name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 */

/**
 * @typedef { Object } SimpleScatterplotAttributes
 * @property { Array.<ScatterplotChartDataElement> } data
 * @property { Number } xRatio
 * @property { Number } yRatio
 */

/**
 *
 * @param { SimpleScatterplotChartModel }
 * @returns {AttributeType<*>}
 * @constructor
 */
const SimpleScatterplotChartModel = ({ data, xRatio, yRatio }) => {
    const scatterplotAttr = Attribute(data);
    scatterplotAttr.getObs(X_RATIO).setValue(xRatio);
    scatterplotAttr.getObs(Y_RATIO).setValue(yRatio);

    return /** AttributeType<T> */ scatterplotAttr;
}