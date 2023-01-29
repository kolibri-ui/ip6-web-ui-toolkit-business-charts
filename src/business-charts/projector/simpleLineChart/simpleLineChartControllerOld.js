// noinspection SpellCheckingInspection

import { Attribute, VALUE }      from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { SimpleInputController } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import { ToolBarController }     from "../toolBar/toolBarController.js";

export {
    SimpleLineChartController,
    DataModel, LineChartOptionsModel
} //for test purposes only

//TODO eliminate duplicated code

/**
 * @typedef { Object } SimpleLineChartOptions
 * @property { ?String } id ID strin (optional)
 * @property { ?Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { ?Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { ?Boolean } drawOuterTicks indicates if outer ticks should be drawn
 * @property { ?Array<() => ChartToolType> } tools additional tools for toolbar
 */


/**
 * @typedef { Object } SimpleLineChartControllerType
 * @property { ToolBarControllerType }                                                  toolBarController
 * @property { SimpleInputControllerType }                                              xMin the smallest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                              xMax the highest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }                                              yMin the smallest value to be displayed on the y-axis
 * @property { SimpleInputControllerType }                                              yMax the highest value to be displayed on the y-axis
 * @property { (data: Array<LineChartDataElement>) => void }                            setData the data series to be presented in the line chart
 * @property { () => Array<LineChartDataElement> }                                      getData the data series used in the line chart
 * @property { (element: LineChartDataElement) => void }                                setSelectedElement set the selected data element
 * @property { () => Array<LineChartDataElement> }                                      getSelectedElement get the selected data element
 * @property { () => SimpleLineChartOptions }                                           getOptions the corresponding line chart options
 * @property { (callback: onValueChangeCallback<Array<LineChartDataElement>>) => void } onDataChanged when interaction
 *     with the data has occurred
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
 * @typedef SelectedElementModelType
 * @property { AttributeType<LineChartDataElement> } selectedElement selected line chart data element
 */

/**
 * @private
 * @pure
 * @return { SelectedElementModelType }
 * @constructor
 */
const SelectedElementModel = entry => {
    const selectedElement = Attribute(entry ?? undefined);
    return  /** @type { SelectedElementModelType } */ { selectedElement };
};

/**
 *
 * @param { Array<LineChartDataElement> } dataArray
 * @param { ?SimpleLineChartOptions } opts
 * @returns { SimpleLineChartControllerType }
 * @constructor
 */
const SimpleLineChartController = (dataArray, opts) => {
    // TODO: id model

    if (opts === undefined) {
        opts = {
            xEvery        : 1,
            yEvery        : 1,
            drawOuterTicks: true,
        }
    }
    const { data }    = DataModel(dataArray);
    const { options } = LineChartOptionsModel(opts);
    const { selectedElement } = SelectedElementModel();

    //TODO add offset +1, -1, adapt Unit Tests of the controller
    const xMinimum = dataArray.reduce((prev, curr, start) => 
        prev < curr.xValue ? prev : curr.xValue, dataArray[0].xValue) - 0;
    const xMaximum = dataArray.reduce((prev, curr, start) => 
        prev > curr.xValue ? prev : curr.xValue, dataArray[0].xValue) + 0;
    const yMinimum = dataArray.reduce((prev, curr, start) => 
        prev < curr.yValue ? prev : curr.yValue, dataArray[0].yValue) - 0;
    const yMaximum = dataArray.reduce((prev, curr, start) => 
        prev > curr.yValue ? prev : curr.yValue, dataArray[0].yValue) + 0;

    /** @type { SimpleInputControllerType<Number> } */
    const xMin = SimpleInputController({
        value: xMinimum,
        label: "X-Minimum",
        name : "x-min",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const xMax = SimpleInputController({
        value: xMaximum,
        label: "X-Maximum",
        name : "x-max",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMin = SimpleInputController({
        value: yMinimum,
        label: "Y-Minimum",
        name : "y-min",
        type : "number"
    });
    /** @type { SimpleInputControllerType<Number> } */
    const yMax = SimpleInputController({
        value: yMaximum,
        label: "Y-Maximum",
        name : "y-max",
        type : "number"
    });

    const minMaxX = minMaxRule(xMin, xMax);
    const minMaxY = minMaxRule(yMin, yMax);

    xMin.onValueChanged(() => minMaxX());
    xMax.onValueChanged(() => minMaxX());
    yMin.onValueChanged(() => minMaxY());
    yMax.onValueChanged(() => minMaxY());
    
    const toolBarController = ToolBarController(
        {
            getData: data.getObs(VALUE).getValue,
            selectedDataPoint: selectedElement.getObs(VALUE).setValue,
        },
        opts ? opts.tools : undefined
    );

    return {
        toolBarController,
        xMin,
        xMax,
        yMin,
        yMax,
        setData      : data.getObs(VALUE).setValue,
        getData      : data.getObs(VALUE).getValue,
        setSelectedElement: selectedElement.getObs(VALUE).setValue,
        getSelectedElement: selectedElement.getObs(VALUE).getValue,
        getOptions   : options.getObs(VALUE).getValue,
        onDataChanged: data.getObs(VALUE).onChange,
    };
};

/**
 * @description Rule to prevent, that max value is less or equal to min value. Max value is at the minimum +1 bigger
 * @param min { SimpleInputControllerType<Number> } Min value of ordered or unordered Numbers
 * @param max { SimpleInputControllerType<Number> } Max value of ordered or unordered Numbers
 * @returns {(function(changedValue: 'MIN'|'MAX'): void)|*}
 */
const minMaxRule = (min, max) => (changedValue) => {
    const minValue = min.getValue();
    const maxValue = max.getValue();

    if (maxValue === minValue) {
        if (changedValue === "MIN") {
            const newValue = minValue + 1;
            max.setValue(newValue) + 1;
        } else {
            const newValue = maxValue - 1;
            min.setValue(newValue) - 1;
        }
    }

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