import {
    Attribute,
    VALUE
}                                     from "../../../Kolibri/docs/src/kolibri/presentationModel.js";
import { rubberBandTool }             from "./tools/RubberbandTool.js";
import { selectionTool }              from "./tools/SelectionTool.js";
import { panningTool }                from "./tools/PanningTool.js";
import { zoomInTool }                 from "./tools/ZoomInTool.js";
import { zoomOutTool }                from "./tools/ZoomOut.js";
import {
    selectionToolBubbleTooltip,
    selectionToolTooltipBottomCenter, 
    selectionToolTooltipLeftCenter
} from "./tools/selectionToolTooltipProjector.js";

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
 * @property { () => Array<ScatterChartDataElement>} getData
 * @property { (element: Array<ScatterChartDataElement>) => void } selectDataPoints
 * @property { () => ChartToolType } selectedTool
 * @property { (tool: ChartToolType) => void } selectTool
 */

/**
 *
 * @param controllerCallbacks
 * @param tools
 * @constructor
 */
const ToolBarController = (controllerCallbacks, tools) => {
    const { selectedTool } = SelectedToolModel();

    tools = [
        zoomInTool,
        zoomOutTool,
        selectionTool(selectionToolBubbleTooltip),
        //selectionTool(selectionToolTooltipBottomCenter),
        //selectionTool(selectionToolTooltipLeftCenter),
        rubberBandTool,
        panningTool,
        ...(tools ?? [])
    ];

    return {
        tools,
        selectedTool: () => selectedTool.getObs(VALUE).getValue(),
        selectTool: (tool) => selectedTool.getObs(VALUE).setValue(tool),
        getData: controllerCallbacks.getData,
        selectDataPoints: controllerCallbacks.selectDataPoints
    };
};