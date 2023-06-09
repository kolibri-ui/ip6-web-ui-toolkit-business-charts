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
 * @description type for the definition of the data series as ChartDataElement
 * @typedef { Object } ChartDataElement
 * @property { String }  name name of the data element
 * @property { !Number } xValue value on the horizontal Axis of the data element
 * @property { !Number } yValue value on the vertical Axis of the data element
 * @example
 * /** @type { Array<ChartDataElement> }
 * const dataSerie1 = [ {
 *     name: 'A1', xValue: -4, yValue: 2,
 * },];
 */

/**
 * @typedef { 'scatter'|'area'|'line' } ChartTypeString
 */

/** @type ChartTypeString */ const SCATTER_CHART = "scatter";
/** @type ChartTypeString */ const AREA_CHART    = "area";
/** @type ChartTypeString */ const LINE_CHART    = "line";

/**
 * @typedef DataBoundaries
 * @property { Number } xMin boundarie of xMin
 * @property { Number } xMax boundarie of xMax
 * @property { Number } yMin boundarie of yMin
 * @property { Number } yMax boundarie of yMax
 */

/**
 * @typedef ChartDataSerie
 * @property { ChartTypeString }         type type of data serie
 * @property { Array<ChartDataElement> } data elements of data serie
 */

/**
 * @typedef { Object } ChartOptions
 * @property { ?Map<Number, String> }        xAxisLabeling labeling for x values
 * @property { ?Array<() => ChartToolType> } tools tools for toolbar
 */

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
 * @typedef DataBoundariesModelType
 * @property { AttributeType<DataBoundaries> } boundaries boundaries
 */

/**
 * @private
 * @pure
 * @return { DataBoundariesModelType }
 * @constructor
 */
const DataBoundariesModel = dataBoundaries => {
    const boundaries = Attribute(dataBoundaries);
    return /** @type { DataModelType } */ { boundaries };
};

let lastControllerId = 0;

/**
 * @description Choice of following controller types:
 * For one data serie:
 *
 * ***SimpleAreaChartController***, ***SimpleLineChartController***, ***SimpleScatterChartController***
 *
 *
 * For more than one data serie:
 *
 * ***AreaChartController***, ***LineChartController***, ***ScatterChartController***
 *
 * For mixed chart types:
 *
 * ***ChartController***
 * @typedef { Object } ChartControllerType
 * @property { Number }                                                              id controller id
 * @property { () => Array<ChartDataSeriesControllerType> }                          getSeries data serie controllers
 * @property { ?Map<Number, String> }                                                 xAxisLabeling labeling for x
 *     values
 * @property { SimpleInputControllerType }                                           xMin the smallest value to
 *     be displayed on the x-axis
 * @property { SimpleInputControllerType }                                           xMax the highest value to
 *     be displayed on the x-axis
 * @property { SimpleInputControllerType }                                           yMin the smallest value to
 *     be displayed on the y-axis
 * @property { SimpleInputControllerType }                                           yMax the highest value to
 *     be displayed on the y-axis
 * @property { () => DataBoundaries }                                                getBoundaries
 * @property { () => Array<ChartDataElement> }                                       getData the data series
 *     used in the line chart
 * @property { (elements: Array<ChartDataElement>) => void }                         setSelectedElements set the
 *     selected data elements
 * @property { () => Array<ChartDataElement> }                                       getSelectedElements get the
 *     selected data elements
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onDataChanged when
 *     interaction with the data has occurred
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onSelectedElementsChanged
 *     when selected Elements change
 * @property { (callback: onValueChangeCallback<DataBoundaries>)  => void }          onBoundariesChanged when
 *     boundaries change
 * @property { ToolBarControllerType }                                               toolBarController toolbar
 *     controller
 */

/**
 * @description chart controller for more than one data serie with various chart types
 * @param { Array<ChartDataSerie> } dataSeries data series for the chart
 * @param { ChartOptions }          opts chart options
 * @return { ChartControllerType }
 * @example
 * const controller = ChartController([{ type: LINE_CHART, data: ds1 }, { type: SCATTER_CHART, data: ds2 }], {
 *     tools: [
 *         zoomInTool,
 *         zoomOutTool,
 *         bubbleTooltipSelectionTool,
 *         rubberBandTool,
 *         panningTool,
 *     ]
 * });
 * Required projector: AdvancedChartProjector(controller);
 */
const ChartController = (dataSeries, opts) => {
    let lastSerieControllerId = 0;
    const { series }          = DataSeriesModel();
    const selectedElements    = DataModel().data;

    const { xMinimum, xMaximum, yMinimum, yMaximum, } = getDataMinAndMax(dataSeries);

    const { yMinBoundarie, yMaxBoundarie, factor } = calcInitialYBoundaries(yMinimum, yMaximum);

    /** @type { DataBoundaries } */
    const { boundaries } = DataBoundariesModel({
        xMin: xMinimum,
        xMax: xMaximum,
        yMin: yMinBoundarie,
        yMax: yMaxBoundarie
    });

    /** @type { SimpleInputControllerType<Number> } */
    const xMin = MinMaxValueController(xMinimum, "X-Minimum", "x_min");

    /** @type { SimpleInputControllerType<Number> } */
    const xMax = MinMaxValueController(xMaximum, "X-Maximum", "x_max");

    /** @type { SimpleInputControllerType<Number> } */
    const yMin = MinMaxValueController(yMinBoundarie, "Y-Minimum", "y_min");

    /** @type { SimpleInputControllerType<Number> } */
    const yMax = MinMaxValueController(yMaxBoundarie, "Y-Maximum", "y_max");

    const initControllers = () => {
        const serieControllers = [];
        for (const serie of dataSeries) {
            const controller = DataSeriesController(serie, factor, ++lastSerieControllerId);

            yMin.onValueChanged(() => controller.yMin.setValue(yMin.getValue()
                                                               * controller.factor.getValue()
                                                               + controller.shifting.getValue()));
            yMax.onValueChanged(() => controller.yMax.setValue(yMax.getValue()
                                                               * controller.factor.getValue()
                                                               + controller.shifting.getValue()));

            serieControllers.push(controller);
        }
        series.getObs(VALUE).setValue(serieControllers);
    };

    const updateBoundaries = () => {
        const activeBoundaries = boundaries.getObs(VALUE).getValue();

        let min = 0;
        let max = 0;

        for (const serie of series.getObs(VALUE).getValue()) {
            const minBoundarie = (serie.getDataYMin() - serie.shifting.getValue()) / serie.factor.getValue();
            const maxBoundarie = (serie.getDataYMax() - serie.shifting.getValue()) / serie.factor.getValue();

            min = minBoundarie < min ? minBoundarie : min;
            max = maxBoundarie > max ? maxBoundarie : max;
        }

        boundaries.getObs(VALUE).setValue({
            xMin: activeBoundaries.xMin,
            xMax: activeBoundaries.xMax,
            yMin: min,
            yMax: max,
        });
    };

    initControllers();

    for (const serie of series.getObs(VALUE).getValue()) {
        serie.shifting.onValueChanged(() => updateBoundaries());
        serie.factor.onValueChanged(() => updateBoundaries());
    }

    boundaries.getObs(VALUE).onChange(() => {
        const activeBoundaries = boundaries.getObs(VALUE).getValue();
        const min              = yMin.getValue();
        const max              = yMax.getValue();
        const boundariesDiff   = activeBoundaries.yMax - activeBoundaries.yMin;
        const diff             = max - min;

        if (diff > boundariesDiff) {
            yMin.setValue(activeBoundaries.yMin);
            yMax.setValue(activeBoundaries.yMax);
        } else if (activeBoundaries.yMin > min) {
            yMin.setValue(activeBoundaries.yMin);
            yMax.setValue(activeBoundaries.yMin + diff);
        } else if (activeBoundaries.yMax < max) {
            yMax.setValue(activeBoundaries.yMax);
            yMin.setValue(activeBoundaries.yMax - diff);
        }
    });

    const getData = () => series.getObs(VALUE).getValue().reduce((acc, curr) => [ ...acc, ...curr.getData() ], []);

    const toolBarController = ToolBarController(
        {
            getData,
            selectDataPoints     : selectedElements.getObs(VALUE).setValue,
            getSelectedDataPoints: selectedElements.getObs(VALUE).getValue,
        },
        opts ? opts.tools : undefined
    );

    const controller = {
        id                       : ++lastControllerId,
        getSeries                : series.getObs(VALUE).getValue,
        xMin,
        xMax,
        yMin,
        yMax,
        getBoundaries            : boundaries.getObs(VALUE).getValue,
        getData,
        setSelectedElements      : selectedElements.getObs(VALUE).setValue,
        getSelectedElements      : selectedElements.getObs(VALUE).getValue,
        onSelectedElementsChanged: selectedElements.getObs(VALUE).onChange,
        onBoundariesChanged      : boundaries.getObs(VALUE).onChange,
        toolBarController
    };

    if (opts && opts.xAxisLabeling) {
        controller.xAxisLabeling = opts.xAxisLabeling;
    }

    return controller;
};

/**
 * @typedef { Object } MinAndMaxValues
 * @property { Number } xMinimum minimum of x
 * @property { Number } xMaximum maximum of x
 * @property { Number } yMinimum minimum of y
 * @property { Number } yMaximum maximum of x
 *
 */

/**
 *
 * @param { Array<ChartDataSerie> } dataSeries data series of chart
 * @return { MinAndMaxValues }
 */
const getDataMinAndMax = (dataSeries) => {
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

    return {
        xMinimum,
        xMaximum,
        yMinimum,
        yMaximum,
    }
};

/**
 * @typedef YBoundaries
 * @property { !Number } yMaxBoundarie maximum boundarie for y
 * @property { !Number } yMinBoundarie minimum boundarie for y
 * @property { !Number } factor
 */

/**
 * Function to initially calculate y boundaries
 * @param { !Number } yMin minimum data value for y
 * @param { !Number } yMax maximum data value for y
 * @returns { !YBoundaries }
 */
const calcInitialYBoundaries = (yMin, yMax) => {
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
        yMaxBoundarie = yMax <= 0 ? 0 : (yMax / yMinAbs);
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
 * @param { Number } value value for the controller
 * @param { String } label label for the controller
 * @param { String } name name of the value
 * @returns { SimpleInputControllerType<Number> }
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
 * @property { !String }                        id id of the data serie
 * @property { !ChartTypeString }               type type of the data serie
 * @property { () => !Array<ChartDataElement> } getData get data of serie
 * @property { () => Number }                   getDataYMin get the minimum data value of y
 * @property { () => Number }                   getDataYMax get the maximum data value of y
 * @property { !SimpleInputControllerType }     factor factor of the data serie for drawing
 * @property { !SimpleInputControllerType }     shifting shifting of the data serie for drawing
 * @property { !SimpleInputControllerType }     yMin minimum y value for drawing data serie
 * @property { !SimpleInputControllerType }     yMax maximum y value for drawing data serie
 */

/**
 *
 * @param { !ChartDataSerie } dataSerie data serie
 * @param { !Number }         initialFactor initial drawing factor
 * @param { !Number }         id id for data serie (managed by chart controller)
 * @returns { ChartDataSeriesControllerType }
 */
const DataSeriesController = (dataSerie, initialFactor, id) => {
    const { data } = DataModel();
    const factor   = MinMaxValueController(initialFactor, "factor", "factor");
    const shifting = MinMaxValueController(0, "shifting", "shifting");

    data.getObs(VALUE).setValue(dataSerie.data.sort((a, b) => a.xValue - b.xValue));

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

    const getDataYMin = () => Math.min(data.getObs(VALUE).getValue().reduce(
        (prev, curr) => prev < curr.yValue ? prev : curr.yValue, 0)
    );
    const getDataYMax = () => Math.max(data.getObs(VALUE).getValue().reduce(
        (prev, curr) => prev > curr.yValue ? prev : curr.yValue, 0)
    );

    return {
        id,
        type   : dataSerie.type,
        getData: data.getObs(VALUE).getValue,
        getDataYMin,
        getDataYMax,
        factor,
        shifting,
        yMin,
        yMax
    }
};