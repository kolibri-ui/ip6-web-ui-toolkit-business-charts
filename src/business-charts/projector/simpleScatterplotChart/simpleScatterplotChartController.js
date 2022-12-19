// noinspection SpellCheckingInspection

import {
    VALUE,
    Attribute
}                                      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController }       from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";

export {
    SimpleScatterplotController
}

/**
 * @typedef { Object } SimpleScatterplotChartOptions
 * @property { ?String } id ID string (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be dawn
 */

/**
 * @typedef { Object } SimpleScatterplotControllerType
 * @property { SimpleInputControllerType }                                                      xMin
 * @property { SimpleInputControllerType }                                                      xMax
 * @property { SimpleInputControllerType }                                                      yMin
 * @property { SimpleInputControllerType }                                                      yMax
 * @property { (data: Array<ScatterplotChartDataElement>) => void }                             setData
 * @property { () => Array<ScatterplotChartDataElement> }                                       getData
 * @property { () => SimpleScatterplotChartOptions }                                            getOptions
 * @property { (callback: onValueChangeCallback<Array<ScatterplotChartDataElement>>)  => void } onDataChanged
 */

/**
 * @typedef ScatterplotOptionsModelType
 * @property { AttributeType<SimpleScatterplotChartOptions> } options chart options
 */

/**
 *
 * @private
 * @pure
 * @return { ScatterplotOptionsModelType }
 * @constructor
 */
const ScatterplotOptionsModel = opts => {
    const options = Attribute(opts);
    return /** @type { ScatterplotOptionsModelType } */ { options };
};

/**
 * @typedef DataModelType
 * @property { AttributeType<Array<ScatterplotChartDataElement>> } data chart data
 */

/**
 *
 * @private
 * @pure
 * @return { DataModelType }
 * @constructor
 */
const DataModel = dataArray => {
    const data = Attribute(dataArray);
    return /** @type { DataModelType } */ { data };
};

/**
 *
 * @param   { Array<ScatterplotChartDataElement> }  dataArray
 * @param   { ?SimpleScatterplotChartOptions }      opts
 * @returns { SimpleScatterplotControllerType }
 * @constructor
 */
const SimpleScatterplotController = (dataArray, opts) => {
    // TODO: id model

    if (opts === undefined) {
        opts = {
            xEvery: 1,
            yEvery: 1,
            drawOuterTicks: true,
        }
    }
    const { data } = DataModel(dataArray);
    const { options } = ScatterplotOptionsModel(opts);

    const xMinimum = dataArray.reduce((prev, curr) => prev < curr.xValue ? prev : curr.xValue) - 1;
    const xMaximum = dataArray.reduce((prev, curr) => prev > curr.xValue ? prev : curr.xValue) + 1;
    const yMinimum = dataArray.reduce((prev, curr) => prev < curr.yValue ? prev : curr.yValue) - 1;
    const yMaximum = dataArray.reduce((prev, curr) => prev > curr.yValue ? prev : curr.yValue) + 1;

    /** @type {SimpleInputControllerType<Number>} */
    const xMin = SimpleInputController({
        value: xMinimum,
        label: "X-Minimum",
        name : "x_min",
        type : "number"
    });
    /** @type {SimpleInputControllerType<Number>} */
    const xMax = SimpleInputController({
        value: xMaximum,
        label: "X-Maximum",
        name : "x_max",
        type : "number"
    });
    /** @type {SimpleInputControllerType<Number>} */
    const yMin = SimpleInputController({
        value: yMinimum,
        label: "Y-Minimum",
        name : "y_min",
        type : "number"
    });
    /** @type {SimpleInputControllerType<Number>} 
     * @param { name } name */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name : "y_max",
        type : "number"
    });

    const minMaxX = minMaxRule(xMin, xMax);
    const minMaxY = minMaxRule(yMin, yMax);

    xMin.onValueChanged(() => minMaxX());
    xMax.onValueChanged(() => minMaxX());
    yMin.onValueChanged(() => minMaxY());
    yMax.onValueChanged(() => minMaxY());

    return {
        xMin,
        xMax,
        yMin,
        yMax,
        setData:               data.getObs(VALUE).setValue,
        getData:               data.getObs(VALUE).getValue,
        getOptions:            options.getObs(VALUE).getValue,
        onDataChanged:         data.getObs(VALUE).onChange,
    };
};

/**
 * Rule to prevent, that max value is less or equal to min value
 * @param min { SimpleInputControllerType<Number> }
 * @param max { SimpleInputControllerType<Number> }
 * @returns {(function(): void)|*}
 */
const minMaxRule = (min, max) => () => {
    const minValue = Number(min.getValue());
    const maxValue = Number(max.getValue());

    if (maxValue <= minValue) {
        const newValue = minValue + 1;
        max.setValue(newValue);
    }
};
