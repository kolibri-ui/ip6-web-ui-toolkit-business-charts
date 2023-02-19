import { drawScatterplotPoints } from "../../util/scatterChartFunctions.js";
import {
    xCanvasToDomain,
    xDomainToCanvas
} from "../../util/geometryFunctions.js";
import {
    drawLine,
    drawRect
} from "../../util/chartFunctions.js";

export { AdvancedXAxisControlBarProjector }

/**
 * @typedef { Object } AdvancedXAxisControlBarControllers
 * @property { SimpleInputControllerType }            xMin the smallest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }            xMax the highest value to be displayed on the x-axis
 * @property { SimpleInputControllerType }            yMin the smallest value to be displayed on the y-axis
 * @property { SimpleInputControllerType }            yMax the highest value to be displayed on the y-axis
 * @property { DataBoundaries }                       boundaries
 * @property { () => Array<ScatterChartDataElement> } getData
 * @property { () => SimpleScatterChartOptions }      getOptions
 * @property { (callback: onValueChangeCallback<Array<ScatterChartDataElement>>)  => void } onDataChanged when
 *     interaction with the data has occurred
 */

/**
 *
 * @param { AdvancedXAxisControlBarControllers } controller
 * @returns {HTMLDivElement}
 */
const AdvancedXAxisControlBarProjector = (controller) => {
    /** @type { HTMLDivElement } */
    const xAxisControlBarElement = document.createElement("div");
    xAxisControlBarElement.classList.add("x-axis");

    /** @type { HTMLCanvasElement } */
    const canvasElement  = document.createElement("canvas");
    canvasElement.width  = 500;
    canvasElement.height = 80;

    /**
     *
     * @returns { ScatterplotChartOptions }
     */
    const getOptions = () => {
        let { width, height }    = canvasElement.getBoundingClientRect();
        const pointSize          = 3;
        const pointColor         = getComputedStyle(canvasElement).getPropertyValue("--data-point-color");
        const selectedPointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-selected-color");

        width  = width === 0 ? 500 : width;
        height = height === 0 ? 85 : height;

        /** @type { ScatterplotChartOptions } */
        return {
            width,
            height,
            boundaries   : controller.boundaries,
            color        : pointColor,
            selectedColor: selectedPointColor,
            pointSize    : pointSize,
        }
    };

    const redraw = () => {
        const options = getOptions();

        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, options.width, options.height);
        drawScatterplotPoints(ctx, controller.getData(), [], options);

        const xMinimum = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaximum = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );

        const width = xMaximum - xMinimum;

        const areaColor = getComputedStyle(canvasElement).getPropertyValue("--advanced-control-bar-area-color");
        const borderColor = getComputedStyle(canvasElement).getPropertyValue("--advanced-control-bar-border-color");

        drawRect(ctx, xMinimum, 0, width, options.height, areaColor, 0.2);
        drawLine(ctx, xMinimum, 0, xMinimum, options.height, borderColor, 2);
        drawLine(ctx, xMaximum, 0, xMaximum, options.height, borderColor, 2);
    };

    let mouseStartX;
    let resizeActive = false;
    /** @type { 'CHANGE_MIN'|'CHANGE_MAX'|'CHANGE_POS' } */
    let changeType;

    canvasElement.onmousedown = (event) => {
        const options = getOptions();
        const xMinPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaxPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );
        const rect   = canvasElement.getBoundingClientRect();
        mouseStartX  = event.x - rect.left;

        if ((xMinPos - 5) < mouseStartX && (xMaxPos + 5) > mouseStartX) {
            resizeActive = true;

            if ((xMinPos + 5) > mouseStartX) {
                changeType = 'CHANGE_MIN';
            } else if ((xMaxPos -5) < mouseStartX) {
                changeType = 'CHANGE_MAX';
            } else {
                changeType = 'CHANGE_POS';
            }
        }

    };

    canvasElement.onmousemove = (event) => {
        const options = getOptions();
        const rect = canvasElement.getBoundingClientRect();

        const xMinPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMin.getValue()
        );
        const xMaxPos = xDomainToCanvas(
            options.width,
            options.boundaries.xMin,
            options.boundaries.xMax,
            controller.xMax.getValue()
        );
        const posX = event.x - rect.left;

        if (resizeActive) {
            const posX = event.x - rect.left;
            const moveX = posX - mouseStartX;

            if (changeType === 'CHANGE_MIN') {
                const xMin = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMin.getValue());
                const changedX = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMin + moveX);
                if (changedX < options.boundaries.xMin) {
                    controller.xMin.setValue(options.boundaries.xMin);
                } else {
                    controller.xMin.setValue(changedX);
                }
            } else if (changeType === 'CHANGE_MAX') {
                const xMax = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMax.getValue());
                const changedX = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMax + moveX);
                if (changedX > options.boundaries.xMax) {
                    controller.xMax.setValue(options.boundaries.xMax);
                } else {
                    controller.xMax.setValue(changedX);
                }

            } else {
                const xMin = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMin.getValue());
                const xMax = xDomainToCanvas(options.width, options.boundaries.xMin, options.boundaries.xMax, controller.xMax.getValue());
                const changedXMin = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMin + moveX);
                const changedXMax = xCanvasToDomain(options.width, options.boundaries.xMin, options.boundaries.xMax, xMax + moveX);
                if (changedXMin >= options.boundaries.xMin && changedXMax <= options.boundaries.xMax) {
                    controller.xMin.setValue(changedXMin);
                    controller.xMax.setValue(changedXMax);
                }
            }

            mouseStartX = posX;
        } else {
            if ((xMinPos - 5) < posX && (xMaxPos + 5) > posX) {
                if ((xMinPos + 5) > posX || (xMaxPos -5) < posX) {
                    canvasElement.classList.add('control-bar-resize');
                    canvasElement.classList.remove('control-bar-move');
                } else {
                    canvasElement.classList.add('control-bar-move');
                    canvasElement.classList.remove('control-bar-resize');
                }
            } else {
                canvasElement.classList.remove('control-bar-move');
                canvasElement.classList.remove('control-bar-resize');
            }
        }
    };

    canvasElement.onmouseenter = (event) => {
        if (event.buttons === 0) {
            resizeActive = false;
        }
    };

    canvasElement.onmouseup = (_) => {
        resizeActive = false;
    };

    controller.xMin.onValueChanged(() => redraw());
    controller.xMax.onValueChanged(() => redraw());

    //resize
    const resizeHandler = new ResizeObserver((_) => {
        const options        = getOptions();
        canvasElement.width  = options.width;
        canvasElement.height = options.height;

        redraw();
    });
    resizeHandler.observe(canvasElement);

    const styleChangeHandler = new MutationObserver((_) => {
        redraw();
    });
    styleChangeHandler.observe(document.documentElement, { attributes: true, attributeFilter: [ "style" ] });

    controller.onDataChanged(() => redraw());

    redraw();

    xAxisControlBarElement.append(canvasElement);

    return xAxisControlBarElement;
};