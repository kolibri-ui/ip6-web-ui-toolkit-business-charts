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
}                                      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleScatterplotChartModel } from "./simpleScatterplotChartModel.js";

export {
    SimpleScatterplotController,
    SimpleAttributeScatterplotController
}

/**
 * @typedef { Object } SimpleScatterplotChartOptions
 * @property { ?String } id ID string (optional)
 * @property { ?Number } canvasWidth width of the canvas
 * @property { ?Number } canvasHeight height of the canvas
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be dawn
 * @property { ?Array<String> } colors Colors for points
 */

/**
 * @typedef { Object } SimpleScatterplotControllerType
 * @property { () => Array<ScatterplotChartDataElement> }               getData
 * @property { (data: Array<ScatterplotChartDataElement>) => void }     setFilteredData
 * @property { () => Array<ScatterplotChartDataElement> }               getFilteredData
 * @property { (Number) => void }                                       setXRatio
 * @property { () => Number }                                           getXRatio
 * @property { (Number) => void }                                       setYRatio
 * @property { () => Number }                                           getYRatio
 * @property { (Number) => void }                                       setXEvery
 * @property { () => Number }                                           getXEvery
 * @property { (Number) => void }                                       setYEvery
 * @property { () => Number }                                           getYEvery
 * @property { (Number) => void }                                       setWidth
 * @property { () => Number }                                           getWidth
 * @property { (Number) => void }                                       setHeight
 * @property { () => Number }                                           getHeight
 * @property { () => Array<String> }                                    getColors
 * @property { (CanvasPoint2D) => void }                                setDomainNullPoint
 * @property { () => CanvasPoint2D }                                    getDomainNullPoint
 * @property { (Boolean) => void }                                      setDrawOuterTicks
 * @property { () => Boolean }                                          getDrawOuterTicks
 *
 * @property { (callback: onFilteredDataChangeCallback<Array<ScatterplotChartDataElement>>) => void }  onFilteredDataChanged
 * @property { (callback: onXRatioChangeCallback<Number>) => void }                             onXRatioChanged
 * @property { (callback: onYRatioChangeCallback<Number>) => void }                             onYRatioChanged
 * @property { (callback: onXEveryChangeCallback<Number>) => void }                             onXEveryChanged
 * @property { (callback: onYRatioChangeCallback<Number>) => void }                             onYEveryChanged
 * @property { (callback: onWidthChangeCallback<Number>) => void }                              onWidthChanged
 * @property { (callback: onHeightChangeCallback<Number>) => void }                             onHeightChanged
 * @property { (callback: onDomainNullPointChangeCallback<CanvasPoint2D>) => void }             onDomainNullPointChanged
 * @property { (callback: onDrawOuterTicksChangeCallback<Boolean>) => void }                    onDrawOuterTicksChanged
 */

/**
 *
 * @param { ScatterplotChartDataElement } data
 * @param { ?SimpleScatterplotChartOptions } options
 * @returns { Array<SimpleScatterplotController> }
 * @constructor
 */
const SimpleScatterplotController = (data, options) => {
    /** @type { SimpleScatterplotAttributes } */
    const dataOpts = { data };

    if (options !== undefined) {
        if (typeof options.canvasWidth === 'number' && options.canvasWidth > 0) {
            dataOpts.canvasWidth = options.canvasWidth;
        }

        if (typeof options.canvasHeight === 'number' && options.canvasHeight > 0) {
            dataOpts.canvasHeight = options.canvasHeight;
        }

        if (typeof options.xEvery === 'number' && options.xEvery > 0) {
            dataOpts.xEvery = options.xEvery;
        }

        if (typeof options.yEvery === 'number' && options.yEvery > 0) {
            dataOpts.yEvery = options.yEvery;
        }

        if (typeof options.drawOuterTicks === 'boolean') {
            dataOpts.drawOuterTicks = options.drawOuterTicks;
        }

        if (Array.isArray(options.colors) && options.colors.length > 0) {
            dataOpts.colors = options.colors;
        }
    }

    // TODO: Calculate xRatio and yRatio
    // TODO: Calculate domainNullPoint

    return {
        ...SimpleAttributeScatterplotController(SimpleScatterplotChartModel(
            dataOpts
        ))
    };
};

/**
 *
 * @param { AttributeType<*> } attribute
 * @returns { SimpleScatterplotControllerType }
 * @constructor
 */
const SimpleAttributeScatterplotController = attribute => ({
    // initial data, should not change
    getData: attribute.getObs(VALUE).getValue,

    // data filtered ord unfiltered for drawing
    setFilteredData   : attribute.getObs(FILTERED_DATA).setValue,
    getFilteredData   : attribute.getObs(FILTERED_DATA).getValue,
    setXRatio         : attribute.getObs(X_RATIO).setValue,
    getXRatio         : attribute.getObs(X_RATIO).getValue,
    setYRatio         : attribute.getObs(Y_RATIO).setValue,
    getYRatio         : attribute.getObs(Y_RATIO).getValue,
    setXEvery         : attribute.getObs(X_EVERY).setValue,
    getXEvery         : attribute.getObs(X_EVERY).getValue,
    setYEvery         : attribute.getObs(Y_EVERY).setValue,
    getYEvery         : attribute.getObs(Y_EVERY).getValue,
    setWidth          : attribute.getObs(CANVAS_WIDTH).setValue,
    getWidth          : attribute.getObs(CANVAS_WIDTH).getValue,
    setHeight         : attribute.getObs(CANVAS_HEIGHT).setValue,
    getHeight         : attribute.getObs(CANVAS_HEIGHT).getValue,
    setDomainNullPoint: attribute.getObs(DOMAIN_NULL_POINT).setValue,
    getDomainNullPoint: attribute.getObs(DOMAIN_NULL_POINT).getValue,
    setDrawOuterTicks : attribute.getObs(DRAW_OUTER_TICKS).setValue,
    getDrawOuterTicks : attribute.getObs(DRAW_OUTER_TICKS).getValue,
    getColors         : attribute.getObs(COLORS).getValue,

    // change events
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

