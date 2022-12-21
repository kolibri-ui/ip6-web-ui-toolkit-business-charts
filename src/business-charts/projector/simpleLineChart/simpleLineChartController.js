// noinspection SpellCheckingInspection

import {
    VALUE,
    Attribute
}                                      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController }       from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";

export { SimpleLineChartController }

/**
 * @typedef { Object } SimpleLineChartOptions
 * @property { ?String } id ID strin (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 */

/**
 * @typedef { Object } SimpleLineChartControllerType
 * @property { SimpleInputControllerType } xMin the smallest value to be displayed on the x-axis
 * @property { SimpleInputControllerType } xMax the highest value to be displayed on the x-axis
 * @property { SimpleInputControllerType } yMin the smallest value to be displayed on the y-axis
 * @property { SimpleInputControllerType } yMax the highest value to be displayed on the y-axis
 * @property { (data: Array<LineChartDataElement>) => void } setData the data series to be presented in the line chart
 * @property { () => Array<LineChartDataElement> }           getData the data series used in the line chart
 * @property { () => SimpleLineChartOptions }                getOptions the corresponding line chart options
 * @property { (callback: onValueChangeCallback<Array<LineChartDataElement>>) => void } onDataChanged when interaction with the data has occurred
 */

/**
 * @typedef LineChartOptionsModelType
 * @property { AttributeType<SimpleLineChartOptions> } options specific line chart options
 */

/**
 * @private
 * @pure
 * @return { LineChartOptionsModelType }
 * @constructor
 */
const LineChartOptionsModel = opts => {
    const options = Attribute(opts);
    return /** @type { LineChartOptionsModelType } */ { options };
};

/**
 * @typedef DataModelType
 * @property { AttributeType<Array<LineChartDataElement>> } data line chart data
 */

/**
 * @private
 * @pure
 * @return { DataModelType }
 * @constructor
 */
const DataModel = dataArray => {
    const data = Attribute(dataArray);
    return /** @type DataModelType */ { data };
};

/**
 *
 * @param { Array<LineChartDataElement> } dataArray
 * @param { ?SimpleLineChartOptions } opts
 * @returns { SimpleLineChartControllerType }
 * @constructor
 */
const SimpleLineChartController = ( dataArray, opts ) => {
    // TODO: id model

    if (opts === undefined) {
        opts = {
            xEvery: 1,
            yEvery: 1,
            drawOuterTicks: true,
        }
    }
    const { data } = DataModel(dataArray);
    const { options } = LineChartOptionsModel(opts);

    const xMinimum = dataArray.reduce((prev, curr) => prev < curr.xValue ? prev : curr.xValue) - 1;
    const xMaximum = dataArray.reduce((prev, curr) => prev > curr.xValue ? prev : curr.xValue) + 1;
    const yMinimum = dataArray.reduce((prev, curr) => prev < curr.yValue ? prev : curr.yValue) - 1;
    const yMaximum = dataArray.reduce((prev, curr) => prev > curr.yValue ? prev : curr.yValue) + 1;

    /** @type { SimpleInputControllerType<Number> } */
    const xMin = SimpleInputController({
        value: xMinimum,
        label: "X-Minimum",
        name: "x-min",
        type: "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const xMax = SimpleInputController({
        value: xMaximum,
        label: "X-Maximum",
        name: "x-max",
        type: "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMin = SimpleInputController({
        value: yMinimum,
        label: "Y-Minimum",
        name: "y-min",
        type: "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name: "y-max",
        type: "number"
    });

    const minMaxX = minMaxRule(xMin, xMax);
    const minMaxY = minMaxRule(yMin, yMax);

    xMin.onValueChanged( () => minMaxX());
    xMax.onValueChanged( () => minMaxX());
    yMin.onValueChanged( () => minMaxY());
    yMax.onValueChanged( () => minMaxY());
    
    return {
        xMin,
        xMax,
        yMin,
        yMax,
        setData: data.getObs(VALUE).setValue,
        getData: data.getObs(VALUE).getValue,
        getOptions: options.getObs(VALUE).getValue,
        onDataChanged: data.getObs(VALUE).onChange,
    };
};

/**
 * @description Rule to prevent, that max value is less or equal to min value
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

// /**
//  * @description Rule to prevent, that max value is less or equal to min value
//  * @param min { SimpleInputControllerType<Number> }
//  * @param max { SimpleInputControllerType<Number> }
//  * @return {(function(): void)|*}
//  */
// const minMaxRule = (min, max) => () => {
//     const minValue = Number(min.getValue());
//     const maxValue = Number(max.getValue());
//
//     if(maxValue <= minValue) {
//         const newValue = minValue + 1;
//         max.setValue(newValue);
//     }
// };