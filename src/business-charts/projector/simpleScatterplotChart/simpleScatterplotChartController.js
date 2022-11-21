// noinspection SpellCheckingInspection

import {
    X_RATIO,
    Y_RATIO,
    VALUE
}                                      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleScatterplotChartModel } from "./simpleScatterplotChartModel.js";

/**
 *
 * @param data
 * @param {  } options
 * @returns {{setData: *, onXRatioChanged: *, setXRatio: *, _initialData, getXRatio: *, onYRatioChanged: *, getYRatio:
 *     *, onDataChanged: *, setYRatio: *, getData: *}}
 * @constructor
 */
const SimpleScatterplotController = (data, options) => {
    return {
        _initialData: data,
        ...SimpleAttributeScatterplotController(SimpleScatterplotChartModel(
            { data, xRatio: options.xRatio, yRatio: options.yRatio }
        ))
    }
};

/**
 *
 * @param attribute
 * @returns {{setData: ((<T>function(T): void)|*), onXRatioChanged: ((<T>function(onValueChangeCallback<T>): void)|*),
 *     setXRatio: ((<T>function(T): void)|*), getXRatio: *, onYRatioChanged: ((<T>function(onValueChangeCallback<T>):
 *     void)|*), getYRatio: *, onDataChanged: ((<T>function(onValueChangeCallback<T>): void)|*), setYRatio:
 *     ((<T>function(T): void)|*), getData: *}}
 * @constructor
 */
const SimpleAttributeScatterplotController = attribute => ({
    setData        : attribute.getObs(VALUE).setValue,
    getData        : attribute.getObs(VALUE).getValue,
    setXRatio      : attribute.getObs(X_RATIO).setValue,
    getXRatio      : attribute.getObs(X_RATIO).getValue,
    setYRatio      : attribute.getObs(Y_RATIO).setValue,
    getYRatio      : attribute.getObs(Y_RATIO).getValue,
    onDataChanged  : attribute.getObs(VALUE).onChange,
    onXRatioChanged: attribute.getObs(X_RATIO).onChange,
    onYRatioChanged: attribute.getObs(Y_RATIO).onChange
});