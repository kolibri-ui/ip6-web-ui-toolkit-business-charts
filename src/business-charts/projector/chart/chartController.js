// noinspection SpellCheckingInspection

import {
    Attribute,
    VALUE
}                                from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import { ToolBarController }     from "../toolBar/toolBarController.js";

export {
    ChartController,
    SCATTER_CHART,
    AREA_CHART,
    LINE_CHART
}

/**
 * @typedef { Object } ChartDataElement
 * @property { String }  name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 */

/**
 * @typedef { 'scatter'|'area'|'line' } ChartTypeString
 */

/** @type ChartTypeString */ const SCATTER_CHART = "scatter";
/** @type ChartTypeString */ const AREA_CHART    = "area";
/** @type ChartTypeString */ const LINE_CHART    = "line";

/**
 * @typedef DataBoundaries
 * @property { Number } xMin
 * @property { Number } xMax
 * @property { Number } yMin
 * @property { Number } yMax
 */

/**
 * @typedef ChartDataSerie
 * @property { ChartTypeString } type
 * @property { Array<ChartDataElement> } data
 */

/**
 * @typedef { Object } ChartOptions
 * @property { ?String } id ID string (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 * @property { ?Array<() => ChartToolType> } tools additional tools for toolbar
 */

/**
 * @typedef ChartOptionsModelType
 * @property { AttributeType<ChartOptions> } options specific chart options
 */

/**
 * @private
 * @pure
 * @return { ChartOptionsModelType }
 * @constructor
 */
const ChartOptionsModel = opts => {
    const options = Attribute(opts);
    return /** @type { ChartOptionsModelType } */ { options };
};

/**
 * @typedef DataSeriesModelType
 * @property { AttributeType<Array<ChartDataSeriesControllerType>> } series data series
 */

/**
 * @private
 * @pure
 * @return { DataSeriesModelType }
 * @constructor
 */
const DataSeriesModel = dataArray => {
    const series = Attribute(dataArray ?? []);
    return /** @type { DataModelType } */ { series };
};

/**
 * @typedef DataModelType
 * @property { AttributeType<Array<ChartDataElement>> } data scatter chart data
 */

/**
 * @private
 * @pure
 * @return { DataModelType }
 * @constructor
 */
const DataModel = dataArray => {
    const data = Attribute(dataArray ?? []);
    return /** @type { DataModelType } */ { data };
};

/**
 * @typedef { Object } ChartControllerType
 * @property { () => Array<ChartDataSeriesControllerType> }                          getSeries data serie controllers
 * @property { SimpleInputControllerType }                                           xMin the smallest value to
 *     be displayed on the x-axis
 * @property { SimpleInputControllerType }                                           xMax the highest value to
 *     be displayed on the x-axis
 * @property { SimpleInputControllerType }                                           yMin the smallest value to
 *     be displayed on the y-axis
 * @property { SimpleInputControllerType }                                           yMax the highest value to
 *     be displayed on the y-axis
 * @property { DataBoundaries }                                                      boundaries
 * @property { () => Array<ChartDataElement> }                                       getData the data series
 *     used in the line chart
 * @property { (elements: Array<ChartDataElement>) => void }                         setSelectedElements set the
 *     selected data elements
 * @property { () => Array<ChartDataElement> }                                       getSelectedElements get the
 *     selected data elements
 * @property { () => ChartOptions }                                                  getOptions the
 *     corresponding scatter chart options
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onDataChanged when
 *     interaction with the data has occurred
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onSelectedElementsChanged
 *     when selected Elements change
 * @property { ToolBarControllerType } toolBarController
 */

/**
 *
 * @param { Array<ChartDataSerie> } dataSeries
 * @param { ChartOptions } opts
 * @return { ChartControllerType }
 */
const ChartController = (dataSeries, opts) => {
    opts                = opts === undefined ? {} : opts;
    opts.xEvery         = opts.xEvery === undefined ? 1 : opts.xEvery;
    opts.yEvery         = opts.yEvery === undefined ? 1 : opts.yEvery;
    opts.drawOuterTicks = opts.drawOuterTicks === undefined ? true : opts.drawOuterTicks;

    let lastControllerId   = 0;
    const { series }       = DataSeriesModel();
    const { options }      = ChartOptionsModel(opts);
    const selectedElements = DataModel().data;

    const xMinimum = Math.min(
        ...dataSeries.map(serie => serie.data.reduce(
            (prev, curr) => prev < curr.xValue ? prev : curr.xValue, serie.data[0].xValue)
        )
    );
    const xMaximum = Math.max(
        ...dataSeries.map(serie => serie.data.reduce(
            (prev, curr) => prev > curr.xValue ? prev : curr.xValue, serie.data[0].xValue)
        )
    );
    const yMinimum = Math.min(
        ...dataSeries.map(serie => serie.data.reduce(
            (prev, curr) => prev < curr.yValue ? prev : curr.yValue, serie.data[0].yValue)
        )
    );
    const yMaximum = Math.max(
        ...dataSeries.map(serie => serie.data.reduce(
            (prev, curr) => prev > curr.yValue ? prev : curr.yValue, serie.data[0].yValue)
        )
    );

    const { yMinBoundarie, yMaxBoundarie, factor } = calcYBoundaries(yMinimum, yMaximum);

    /** @type { DataBoundaries } */
    const boundaries = {
        xMin: xMinimum,
        xMax: xMaximum,
        yMin: yMinBoundarie,
        yMax: yMaxBoundarie
    };



    /** @type { SimpleInputControllerType<Number> } */
    const xMin = MinMaxValueController(xMinimum, "X-Minimum", "x_min");

    /** @type { SimpleInputControllerType<Number> } */
    const xMax = MinMaxValueController(xMaximum, "X-Maximum", "x_max");

    /** @type { SimpleInputControllerType<Number> } */
    const yMin = MinMaxValueController(yMinBoundarie, "Y-Minimum", "y_min");

    /** @type { SimpleInputControllerType<Number> } */
    const yMax = MinMaxValueController(yMaxBoundarie, "Y-Maximum", "y_max");

    const serieControllers = [];
    for (const serie of dataSeries) {
        const controller = DataSeriesController(serie, factor, ++lastControllerId);
        serieControllers.push(controller);
    }
    series.getObs(VALUE).setValue(serieControllers);

    const getData = () => series.getObs(VALUE).getValue().reduce((acc, curr) => [ ...acc, ...curr.getData() ], []);

    const toolBarController = ToolBarController(
        {
            getData,
            selectDataPoints     : selectedElements.getObs(VALUE).setValue,
            getSelectedDataPoints: selectedElements.getObs(VALUE).getValue,
        },
        opts ? opts.tools : undefined
    );

    return {
        getSeries                : series.getObs(VALUE).getValue,
        xMin,
        xMax,
        yMin,
        yMax,
        boundaries,
        getData,
        setSelectedElements      : selectedElements.getObs(VALUE).setValue,
        getSelectedElements      : selectedElements.getObs(VALUE).getValue,
        getOptions               : options.getObs(VALUE).getValue,
        onSelectedElementsChanged: selectedElements.getObs(VALUE).onChange,
        toolBarController
    };
};

/**
 * @typedef YBoundaries
 * @property { !Number } yMaxBoundarie
 * @property { !Number } yMinBoundarie
 * @property { !Number } factor
 */

/**
 *
 * @param { !Number } yMin
 * @param { !Number } yMax
 * @returns { !YBoundaries }
 */
const calcYBoundaries = (yMin, yMax) => {
    /** @type { Number } */
    let yMinBoundarie;

    /** @type { Number } */
    let yMaxBoundarie;

    const yMinAbs = Math.abs(yMin);
    const yMaxAbs = Math.abs(yMax);

    if (yMinAbs < yMaxAbs) {
        yMaxBoundarie = 1.0;
        yMinBoundarie = yMin >= 0 ? 0 : (yMin / yMax);
    } else if (yMinAbs === yMaxAbs) {
        if (yMin === yMax) {
            yMaxBoundarie = yMax > 0 ? 1.0 : 0;
            yMinBoundarie = yMin > 0 ? 0 : -1.0;
        } else {
            yMaxBoundarie = 1.0;
            yMinBoundarie = -1.0;
        }
    } else {
        yMaxBoundarie = yMax <= 0 ? 0 : (yMax / yMin);
        yMinBoundarie = -1.0;
    }

    const factor = yMinAbs <= yMaxAbs ? yMaxAbs : yMinAbs;

    return {
        yMinBoundarie,
        yMaxBoundarie,
        factor
    }
};

/**
 *
 * @param { Number } value
 * @param { String } label
 * @param { String } name
 * @returns { SimpleInputControllerType<Number> }
 * @constructor
 */
const MinMaxValueController = (value, label, name) => {
    const controller = SimpleInputController({
        value: value,
        label: label,
        name : name,
        type : "number"
    });
    controller.setConverter((input) => Number(input));

    return controller;
};

/**
 * @typedef ChartDataSeriesControllerType
 * @property { !String } id
 * @property { !ChartTypeString } type
 * @property { () => !Array<ChartDataElement> } getData
 * @property { (Number) => void } updateFactor
 * @property { () => Number } getFactor
 * @property { (Number) => void } updateShifting
 * @property { () => Number } getShifting
 * @property { !SimpleInputControllerType } yMin
 * @property { !SimpleInputControllerType } yMax
 */

/**
 *
 * @param { !ChartDataSerie } dataSerie
 * @param { !Number } initialFactor
 * @param { !Number } id
 * @returns { ChartDataSeriesControllerType }
 */
const DataSeriesController = (dataSerie, initialFactor, id) => {
    const { data } = DataModel();
    let factor     = initialFactor;
    let shifting   = 0;

    data.getObs(VALUE).setValue(dataSerie.data.sort((a, b) => a.xValue - b.xValue));

    /**
     *
     * @param { !Number } f new factor
     */
    const updateFactor   = (f) => factor = f;
    /**
     *
     * @param { !Number } s new shifting
     */
    const updateShifting = (s) => shifting = s;

    const yMinimum = Math.min(dataSerie.data.reduce(
        (prev, curr) => prev < curr.yValue ? prev : curr.yValue)
    );
    const yMaximum = Math.max(dataSerie.data.reduce(
        (prev, curr) => prev > curr.yValue ? prev : curr.yValue)
    );

    /** @type { SimpleInputControllerType<Number> } */
    const yMin = MinMaxValueController(yMinimum, "Y-Minimum", "y_min");

    /** @type { SimpleInputControllerType<Number> } */
    const yMax = MinMaxValueController(yMaximum, "Y-Maximum", "y_max");

    return {
        id,
        type       : dataSerie.type,
        getData    : data.getObs(VALUE).getValue,
        updateFactor,
        getFactor  : () => factor,
        updateShifting,
        getShifting: () => shifting,
        yMin,
        yMax
    }
};