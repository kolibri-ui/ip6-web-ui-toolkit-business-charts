// noinspection SpellCheckingInspection

import { dom }              from "../../../../Kolibri/docs/src/kolibri/util/dom.js";
import { ctrlOrCmdPressed } from "../../../util/functions.js";
import {
    selectionToolBubbleTooltip,
    selectionToolTooltipBottomCenter,
    selectionToolTooltipLeftCenter
}                           from "./selectionToolTooltipProjector.js";

export {
    selectionTool,
    bubbleTooltipSelectionTool,
    bottomCenterTooltipSelectionTool,
    leftCenterTooltipSelectionTool
}

/**
 *
 * @param { (position: CanvasPoint2D, pointRadius: Number, title: String) => HTMLElement } tooltipProjector
 * @returns {  (canvasElement: HTMLCanvasElement, callbacks: ChartToolBarCallbacks) => ChartToolType }
 */
const selectionTool = (tooltipProjector) => (canvasElement, callbacks) => {
    let dataPointHovered;
    let tooltip;

    return {
        title     : 'Selection',
        type      : 'ACTIVATE',
        tooltip   : 'select',
        icon      : dom('<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">'
                        + '<path d="M19.9945 35.7531L17.473 15L35.4969 27.9563L34.2932 28.0095C28.5916 28.2613 23.321 31.1157 19.9945 35.7531Z" fill="white" stroke="#612EEA"/>'
                        + '</svg>')[0],
        mouseMove : (event) => {
            const rect   = canvasElement.getBoundingClientRect();
            const mouseX = event.x - rect.left;
            const mouseY = event.y - rect.top;

            const points = callbacks.getDataPointsForPosition(mouseX, mouseY);

            const point = points.length > 0 ? points[0] : undefined;

            if (dataPointHovered !== point) {
                dataPointHovered = point;

                if (dataPointHovered !== undefined) {
                    const position    = callbacks.getCanvasPositionForPoint(dataPointHovered);
                    const pointRadius = callbacks.getOptions().pointSize;

                    tooltip = tooltipProjector(position, pointRadius, point.name);
                    canvasElement.parentElement.append(tooltip);
                } else {
                    canvasElement.parentElement.removeChild(tooltip);
                    tooltip = undefined;
                }
            }


        },
        mouseClick: (event) => {
            const rect   = canvasElement.getBoundingClientRect();
            const mouseX = event.x - rect.left;
            const mouseY = event.y - rect.top;

            const points = callbacks.getDataPointsForPosition(mouseX, mouseY);

            if (event && ctrlOrCmdPressed(event)) {
                let selectedPoints = callbacks.getSelectedDataPoints();

                for (const point of points) {

                    if (selectedPoints.includes(point)) {
                        selectedPoints = selectedPoints.filter(p => p !== point);
                    } else {
                        selectedPoints = [ point, ...selectedPoints ];
                    }
                }

                callbacks.selectDataPoints(selectedPoints);
            } else {
                callbacks.selectDataPoints(points);
            }

        }
    };
};

const bubbleTooltipSelectionTool       = selectionTool(selectionToolBubbleTooltip);
const bottomCenterTooltipSelectionTool = selectionTool(selectionToolTooltipBottomCenter);
const leftCenterTooltipSelectionTool   = selectionTool(selectionToolTooltipLeftCenter);