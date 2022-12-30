// noinspection SpellCheckingInspection

import {
    VALUE,
    Attribute
}                                      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController }       from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";

export { SimpleScatterChartController }

/**
 * @typedef { Object } SimpleScatterChartOptions
 * @property { ?String } id ID string (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 */

/**
 * @typedef { Object } SimpleScatterChartControllerType
 * @property { SimpleInputControllerType }                                                      xMin the smallest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                                      xMax the highest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                                      yMin the smallest value to be displayed on the y-axis
 * @property { SimpleInputControllerType }                                                      yMax the highest value to be displayed on the y-axis
 * @property { (data: Array<ScatterChartDataElement>) => void }                             setData the data series to be presented in the line chart
 * @property { () => Array<ScatterChartDataElement> }                                       getData the data series used in the line chart
 * @property { () => SimpleScatterChartOptions }                                            getOptions the corresponding scatter chart options
 * @property { (callback: onValueChangeCallback<Array<ScatterChartDataElement>>)  => void } onDataChanged when interaction with the data has occurred
 */

/**
 * @typedef ScatterChartOptionsModelType
 * @property { AttributeType<SimpleScatterChartOptions> } options specific scatter chart options
 */

/**
 * @private
 * @pure
 * @return { ScatterChartOptionsModelType }
 * @constructor
 */
const ScatterChartOptionsModel = opts => {
    const options = Attribute(opts);
    return /** @type { ScatterChartOptionsModelType } */ { options };
};

/**
 * @typedef DataModelType
 * @property { AttributeType<Array<ScatterChartDataElement>> } data scatter chart data
 */

/**
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
 * @param   { Array<ScatterChartDataElement> }  dataArray
 * @param   { ?SimpleScatterChartOptions }      opts
 * @returns { SimpleScatterChartControllerType }
 * @constructor
 */
const SimpleScatterChartController = (dataArray, opts) => {
    // TODO: id model

    if (opts === undefined) {
        opts = {
            xEvery: 1,
            yEvery: 1,
            drawOuterTicks: true,
        }
    }
    const { data } = DataModel(dataArray);
    const { options } = ScatterChartOptionsModel(opts);

    const xMinimum = dataArray.reduce((prev, curr) => prev < curr.xValue ? prev : curr.xValue) - 1;
    const xMaximum = dataArray.reduce((prev, curr) => prev > curr.xValue ? prev : curr.xValue) + 1;
    const yMinimum = dataArray.reduce((prev, curr) => prev < curr.yValue ? prev : curr.yValue) - 1;
    const yMaximum = dataArray.reduce((prev, curr) => prev > curr.yValue ? prev : curr.yValue) + 1;

    /** @type { SimpleInputControllerType<Number> } */
    const xMin = SimpleInputController({
        value: xMinimum,
        label: "X-Minimum",
        name : "x_min",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const xMax = SimpleInputController({
        value: xMaximum,
        label: "X-Maximum",
        name : "x_max",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMin = SimpleInputController({
        value: yMinimum,
        label: "Y-Minimum",
        name : "y_min",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name : "y_max",
        type : "number"
    });

    const minMaxX = minMaxRule(xMin, xMax);
    const minMaxY = minMaxRule(yMin, yMax);

    xMin.onValueChanged(() => minMaxX("MIN"));
    xMax.onValueChanged(() => minMaxX("MAX"));
    yMin.onValueChanged(() => minMaxY("MIN"));
    yMax.onValueChanged(() => minMaxY("MAX"));

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
 * @description Rule to prevent, that max value is less or equal to min value
 * @param min { SimpleInputControllerType<Number> }
 * @param max { SimpleInputControllerType<Number> }
 * @returns {(function(changedValue: 'MIN'|'MAX'): void)|*}
 */
const minMaxRule = (min, max) => (changedValue) => {
    const minValue = min.getValue();
    const maxValue = max.getValue();

    if (maxValue <= minValue) {
        if (changedValue === "MIN") {
            const newValue = minValue + 1;
            max.setValue(newValue);
        } else {
            const newValue = maxValue - 1;
            min.setValue(newValue);
        }

    }
};
