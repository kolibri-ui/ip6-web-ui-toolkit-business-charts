// noinspection SpellCheckingInspection

import {
    X_RATIO,
    VALUE
}                                      from "../../../src/Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleScatterplotChartModel } from "./simpleScatterplotChartModel.js";

export { SimpleScatterplotController, SimpleAttributeScatterplotController }

/**
 * @typedef { Object } SimpleScatterplotControllerType<T>
 // * @property { data: ScatterplotChartDataElement } setData
 * @property { () => Array<T> }  getData
 * @property { Number }          setXRatio
 * @property { void }            getXRatio
 // * @property { Number }          setYRatio
 // * @property { void }            getYRatio
 * @property { (callback: onDataChangeCallback<T>) => void } onDataChanged
 * @property { (callback: onXRatioChangeCallback<Number>) => void } onXRatioChanged
 // * @property { (callback: onYRatioChangeCallback<Number>) => void } onYRatioChanged
 */

/**
 *
 * @param { ScatterplotChartDataElement } data
 * @param { SimpleScatterplotAttributes } options
 * @returns { Array<SimpleScatterplotController> }
 * @constructor
 */
const SimpleScatterplotController = (data, options) => (
    {
    _initialData: data,
    ...SimpleAttributeScatterplotController(SimpleScatterplotChartModel(
        { data, xRatio: options.xRatio }
    ))
}
);

/**
 *
 * @param attribute
 * @returns { SimpleScatterplotControllerType<T> }
 * @constructor
 */
const SimpleAttributeScatterplotController = attribute => ({
    setData        : attribute.getObs(VALUE).setValue,
    getData        : attribute.getObs(VALUE).getValue,
    setXRatio      : attribute.getObs(X_RATIO).setValue,
    getXRatio      : attribute.getObs(X_RATIO).getValue,
    // setYRatio      : attribute.getObs(Y_RATIO).setValue,
    // getYRatio      : attribute.getObs(Y_RATIO).getValue,
    onDataChanged  : attribute.getObs(VALUE).onChange,
    onXRatioChanged: attribute.getObs(X_RATIO).onChange
    // onYRatioChanged: attribute.getObs(Y_RATIO).onChange
});

