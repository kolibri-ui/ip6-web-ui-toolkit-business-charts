// noinspection SpellCheckingInspection

import { Attribute, VALUE }      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import { ToolBarController }     from "../toolBar/toolBarController.js";

export { SimpleLineChartController }

/**
 * @typedef { Object } SimpleLineChartOptions
 * @property { ?String } id ID string (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 * @property { ?Array<() => ChartToolType> } tools additional tools for toolbar
 */

/**
 * @typedef { Object } SimpleLineChartControllerType
 * @property { ToolBarControllerType }                                                      toolBarController
 * @property { SimpleInputControllerType }                                                  xMin the smallest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                                  xMax the highest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                                  yMin the smallest value to be displayed on the y-axis
 * @property { SimpleInputControllerType }                                                  yMax the highest value to be displayed on the y-axis
 * @property { (data: Array<LineChartDataElement>) => void }                             setData the data series to be presented in the line chart
 * @property { () => Array<LineChartDataElement> }                                       getData the data series used in the line chart
 * @property { (elements: Array<LineChartDataElement>) => void }                         setSelectedElements set the selected data elements
 * @property { () => Array<LineChartDataElement> }                                       getSelectedElements get the selected data elements
 * @property { () => SimpleLineChartOptions }                                            getOptions the corresponding scatter chart options
 * @property { (callback: onValueChangeCallback<Array<LineChartDataElement>>)  => void } onDataChanged when interaction with the data has occurred
 * @property { (callback: onValueChangeCallback<Array<LineChartDataElement>>)  => void } onSelectedElementsChanged when selected Elements change
 */

/**
 * @typedef LineChartOptionsModelType
 * @property { AttributeType<SimpleLineChartOptions> } options specific scatter chart options
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
 * @property { AttributeType<Array<LineChartDataElement>> } data scatter chart data
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
 * @typedef SelectedElementsModelType
 * @property { AttributeType<Array<LineChartDataElement>> } selectedElements selected scatter elements
 */

/**
 * @private
 * @pure
 * @return { SelectedElementsModelType }
 * @constructor
 */
const SelectedElementsModel = entries => {
    const selectedElements = Attribute(entries ?? []);
    return /** @type { SelectedElementsModelType } */ { selectedElements };
};

/**
 *
 * @param   { Array<LineChartDataElement> }  dataArray
 * @param   { ?SimpleLineChartOptions }      opts
 * @returns { SimpleLineChartControllerType }
 * @constructor
 */
const SimpleLineChartController = (dataArray, opts) => {
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
    const { selectedElements } = SelectedElementsModel();

    const xMinimum = dataArray.reduce((prev, curr) =>
        prev < curr.xValue ? prev : curr.xValue) - 1;
    const xMaximum = dataArray.reduce((prev, curr) =>
        prev > curr.xValue ? prev : curr.xValue) + 1;
    const yMinimum = dataArray.reduce((prev, curr) =>
        prev < curr.yValue ? prev : curr.yValue) - 1;
    const yMaximum = dataArray.reduce((prev, curr) =>
        prev > curr.yValue ? prev : curr.yValue) + 1;

    /** @type { SimpleInputControllerType<Number> } */
    const xMin = SimpleInputController({
        value: xMinimum,
        label: "X-Minimum",
        name : "x_min",
        type : "number"
    });
    xMin.setConverter((input) => Number(input));

    /** @type { SimpleInputControllerType<Number> } */
    const xMax = SimpleInputController({
        value: xMaximum,
        label: "X-Maximum",
        name : "x_max",
        type : "number"
    });
    xMax.setConverter((input) => Number(input));

    /** @type { SimpleInputControllerType<Number> } */
    const yMin = SimpleInputController({
        value: yMinimum,
        label: "Y-Minimum",
        name : "y_min",
        type : "number"
    });
    yMin.setConverter((input) => Number(input));

    /** @type { SimpleInputControllerType<Number> } */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name : "y_max",
        type : "number"
    });
    yMax.setConverter((input) => Number(input));

    const minMaxX = minMaxRule(xMin, xMax);
    const minMaxY = minMaxRule(yMin, yMax);

    xMin.onValueChanged(() => minMaxX("MIN"));
    xMax.onValueChanged(() => minMaxX("MAX"));
    yMin.onValueChanged(() => minMaxY("MIN"));
    yMax.onValueChanged(() => minMaxY("MAX"));

    const toolBarController = ToolBarController(
        {
            getData: data.getObs(VALUE).getValue,
            selectDataPoints: selectedElements.getObs(VALUE).setValue,
        },
        opts ? opts.tools : undefined
    );


    return {
        toolBarController,
        xMin,
        xMax,
        yMin,
        yMax,
        setData:                   data.getObs(VALUE).setValue,
        getData:                   data.getObs(VALUE).getValue,
        setSelectedElements:       selectedElements.getObs(VALUE).setValue,
        getSelectedElements:       selectedElements.getObs(VALUE).getValue,
        getOptions:                options.getObs(VALUE).getValue,
        onDataChanged:             data.getObs(VALUE).onChange,
        onSelectedElementsChanged: selectedElements.getObs(VALUE).onChange
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
