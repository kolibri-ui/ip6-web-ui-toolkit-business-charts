import {
    Attribute,
    VALUE
} from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

export { ToolBarController }

/**
 * @typedef SelectedToolModelType
 * @property { AttributeType<ChartToolType> } tool
 */

/**
 * @private
 * @pure
 * @return { SelectedToolModelType }
 * @constructor
 */
const SelectedToolModel = () => {
    const selectedTool = Attribute();
    return /** @type { ChartToolType } */ { selectedTool };
};

/**
 * @typedef ToolBarControllerType
 * @property { Array<() => ChartToolType> } tools
 * @property { () => Array<ScatterChartDataElement>} getData
 * @property { (elements: Array<ScatterChartDataElement>) => void } selectDataPoints
 * @property { () => Array<ScatterChartDataElement> } getSelectedDataPoints
 * @property { () => ChartToolType } selectedTool
 * @property { (tool: ChartToolType) => void } selectTool
 */

/**
 * @typedef ToolBarControllerCallbacks
 * @property { () => Array<ScatterChartDataElement> } getData
 * @property { (elements: Array<ScatterChartDataElement>) => void } selectDataPoints
 * @property { () => Array<ScatterChartDataElement> } getSelectedDataPoints
 */

/**
 *
 * @param { ToolBarControllerCallbacks } controllerCallbacks
 * @param { Array<() => ChartToolType> } tools
 * @returns { ToolBarControllerType }
 */
const ToolBarController = (controllerCallbacks, tools) => {
    const { selectedTool } = SelectedToolModel();

    tools = [ ...(tools ?? []) ];

    return {
        tools,
        selectedTool         : () => selectedTool.getObs(VALUE).getValue(),
        selectTool           : (tool) => selectedTool.getObs(VALUE).setValue(tool),
        getData              : controllerCallbacks.getData,
        selectDataPoints     : controllerCallbacks.selectDataPoints,
        getSelectedDataPoints: controllerCallbacks.getSelectedDataPoints
    };
};