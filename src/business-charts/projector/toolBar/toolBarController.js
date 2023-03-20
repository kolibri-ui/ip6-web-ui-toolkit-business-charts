import {
    Attribute,
    VALUE
} from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

export { ToolBarController }

/**
 * @typedef SelectedToolModelType
 * @property { AttributeType<ChartToolType> } tool selected tool
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
 * @property { Array<() => ChartToolType> }                  tools chart toolbar tools
 * @property { () => Array<ChartDataElement>}                getData get data elements
 * @property { (elements: Array<ChartDataElement>) => void } selectDataPoints select data elements
 * @property { () => Array<ChartDataElement> }               getSelectedDataPoints get selected data elements
 * @property { () => ChartToolType }                         selectedTool get selected toolbar tool
 * @property { (tool: ChartToolType) => void }               selectTool change selected toolbar tool
 */

/**
 * @typedef ToolBarControllerCallbacks
 * @property { () => Array<ChartDataElement> }               getData get data elements
 * @property { (elements: Array<ChartDataElement>) => void } selectDataPoints select data elements
 * @property { () => Array<ChartDataElement> }               getSelectedDataPoints get selected data elements
 */

/**
 *
 * @param { ToolBarControllerCallbacks } controllerCallbacks controller callbacks
 * @param { Array<() => ChartToolType> } tools chart toolbar tools
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