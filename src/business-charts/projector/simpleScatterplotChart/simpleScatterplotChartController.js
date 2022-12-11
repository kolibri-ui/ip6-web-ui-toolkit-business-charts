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
 * @property { ?Array<String> } colors Colors for points
 */

/**
 * @typedef { Object } SimpleScatterplotControllerType
 * @property { SimpleInputControllerType } xMin
 * @property { SimpleInputControllerType } xMax
 * @property { SimpleInputControllerType } yMin
 * @property { SimpleInputControllerType } yMax
 * @property { () => Array<ScatterplotChartDataElement> }               getData
 * @property { () => SimpleScatterplotChartOptions }                    getOptions
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
    if (opts === undefined) {
        opts = {
            xEvery: 1,
            yEvery: 1,
            drawOuterTicks: true,
            colors: [ "#a55ca5", "#67b6c7", "#bccd7a", "#eb9743" ]
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
    /** @type {SimpleInputControllerType<Number>} */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name : "y_max",
        type : "number"
    });

    return {
        xMin,
        xMax,
        yMin,
        yMax,
        getData: data.getObs(VALUE).getValue,
        getOptions: options.getObs(VALUE).getValue,
    };
};
