// noinspection SpellCheckingInspection

import {
    X_RATIO,
    Y_RATIO,
    VALUE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    X_EVERY,
    Y_EVERY,
    DOMAIN_NULL_POINT,
    DRAW_OUTER_TICKS,
    FILTERED_DATA,
    COLORS
} from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleScatterplotChartModel } from "./simpleScatterplotChartModel.js";

export {
    SimpleScatterplotController,
    SimpleAttributeScatterplotController
}

/**
 * @typedef { Object } SimpleScatterplotChartOptions
 * @property { ?String } id ID string (optional)
 * @property { Number } [canvasWidth] width of the canvas
 * @property { Number } [canvasHeight] height of the canvas
 * @property { Number } [xEvery] value to define which ticks should be drawn for x-axis
 * @property { Number } [yEvery] value to define which ticks should be drawn for y-axis
 * @property { Boolean } [drawOuterTicks] indicates if outer ticks should be dawn
 * @property { Array<String> } [colors] Colors for points
 */

/**
 * @typedef { Object } SimpleScatterplotControllerType
 * @property { data: ScatterplotChartDataElement } setData
 * @property { () => Array<ScatterplotChartDataElement> }  getData
 * @property { Number }          setXRatio
 * @property { void }            getXRatio
 * @property { Number }          setYRatio
 * @property { void }            getYRatio
 * @property { (callback: onDataChangeCallback<ScatterplotChartDataElement>) => void } onDataChanged
 * @property { (callback: onXRatioChangeCallback<Number>) => void } onXRatioChanged
 * @property { (callback: onYRatioChangeCallback<Number>) => void } onXRatioChanged
 */

/**
 *
 * @param { ScatterplotChartDataElement } data
 * @param { SimpleScatterplotChartOptions } options
 * @returns { Array<SimpleScatterplotController> }
 * @constructor
 */
const SimpleScatterplotController = (data, options) => {
    const controller = {
        ...SimpleAttributeScatterplotController(SimpleScatterplotChartModel(
            { data }
        ))
    };

    if (undefined === options.canvasWidth) {
        controller.setWidth(options.canvasWidth);
    }
    if (options.canvasHeight) {
        controller.setHeight(options.canvasHeight);
    }

    return controller;
};

/**
 *
 * @param { AttributeType<ScatterplotChartDataElement> } attribute
 * @returns { SimpleScatterplotControllerType }
 * @constructor
 */
const SimpleAttributeScatterplotController = attribute => ({
    getData                 : attribute.getObs(VALUE).getValue,
    setFilteredData         : attribute.getObs(FILTERED_DATA).setValue,
    getFilteredData         : attribute.getObs(FILTERED_DATA).getValue,
    setXRatio               : attribute.getObs(X_RATIO).setValue,
    getXRatio               : attribute.getObs(X_RATIO).getValue,
    setYRatio               : attribute.getObs(Y_RATIO).setValue,
    getYRatio               : attribute.getObs(Y_RATIO).getValue,
    setXEvery               : attribute.getObs(X_EVERY).setValue,
    getXEvery               : attribute.getObs(X_EVERY).getValue,
    setYEvery               : attribute.getObs(Y_EVERY).setValue,
    getYEvery               : attribute.getObs(Y_EVERY).getValue,
    setWidth                : attribute.getObs(CANVAS_WIDTH).setValue,
    getWidth                : attribute.getObs(CANVAS_WIDTH).getValue,
    setHeight               : attribute.getObs(CANVAS_HEIGHT).setValue,
    getHeight               : attribute.getObs(CANVAS_HEIGHT).getValue,
    setDomainNullPoint      : attribute.getObs(DOMAIN_NULL_POINT).setValue,
    getDomainNullPoint      : attribute.getObs(DOMAIN_NULL_POINT).getValue,
    setDrawOuterTicks       : attribute.getObs(DRAW_OUTER_TICKS).setValue,
    getDrawOuterTicks       : attribute.getObs(DRAW_OUTER_TICKS).getValue,
    getColors               : attribute.getObs(COLORS).getValue,
    onFilteredDataChanged   : attribute.getObs(FILTERED_DATA).onChange,
    onXRatioChanged         : attribute.getObs(X_RATIO).onChange,
    onYRatioChanged         : attribute.getObs(Y_RATIO).onChange,
    onXEveryChanged         : attribute.getObs(X_EVERY).onChange,
    onYEveryChanged         : attribute.getObs(Y_EVERY).onChange,
    onWidthChanged          : attribute.getObs(CANVAS_WIDTH).onChange,
    onHeightChanged         : attribute.getObs(CANVAS_HEIGHT).onChange,
    onDomainNullPointChanged: attribute.getObs(DOMAIN_NULL_POINT).onChange,
    onDrawOuterTicksChanged : attribute.getObs(DRAW_OUTER_TICKS).onChange,
});

