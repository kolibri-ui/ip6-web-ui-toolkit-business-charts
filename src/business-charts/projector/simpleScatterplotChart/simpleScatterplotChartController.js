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
 * @property { SimpleInputControllerType }                                                      xMin
 * @property { SimpleInputControllerType }                                                      xMax
 * @property { SimpleInputControllerType }                                                      yMin
 * @property { SimpleInputControllerType }                                                      yMax
 * @property { (data: Array<ScatterplotChartDataElement>) => void }                             setData
 * @property { () => Array<ScatterplotChartDataElement> }                                       getData
 * @property { (Number) => void }                                                               setPointSize
 * @property { () => Number }                                                                   getPointSize
 * @property { (String) => void }                                                               setColor
 * @property { () => String }                                                                   getColor
 * @property { () => SimpleScatterplotChartOptions }                                            getOptions
 * @property { (callback: onValueChangeCallback<Array<ScatterplotChartDataElement>>)  => void } onDataChanged
 * @property { (callback: onValueChangeCallback<Number>)  => void }                             onPointSizeChanged
 * @property { (callback: onValueChangeCallback<String>)  => void }                             onColorChanged
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
 * @typedef PointSizeModelType
 * @property { AttributeType<Number> } size point size
 */

/**
 *
 * @private
 * @pure
 * @return { PointSizeModelType }
 * @constructor
 */
const PointSizeModel = pointSize => {
    const size = Attribute(pointSize);
    return /** @type { PointSizeModelType } */ { size };
};

/**
 * @typedef ColorModelType
 * @property { AttributeType<String> } color data point color
 */

/**
 *
 * @private
 * @pure
 * @return { ColorModelType }
 * @constructor
 */
const ColorModel = colorString => {
    const color = Attribute(colorString);
    return /** @type { ColorModelType } */ { color };
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
            colors: [ "#a55ca5", "#67b6c7", "#bccd7a", "#eb9743" ]
        }
    }
    const { data } = DataModel(dataArray);
    const { options } = ScatterplotOptionsModel(opts);
    const { size } = PointSizeModel(3);
    const { color } = ColorModel("#a55ca5");

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
        setData:            data.getObs(VALUE).setValue,
        getData:            data.getObs(VALUE).getValue,
        setPointSize:       size.getObs(VALUE).setValue,
        getPointSize:       size.getObs(VALUE).getValue,
        setColor:           color.getObs(VALUE).setValue,
        getColor:           color.getObs(VALUE).getValue,
        getOptions:         options.getObs(VALUE).getValue,
        onDataChanged:      data.getObs(VALUE).onChange,
        onPointSizeChanged: size.getObs(VALUE).onChange,
        onColorChanged:     color.getObs(VALUE).onChange
    };
};
