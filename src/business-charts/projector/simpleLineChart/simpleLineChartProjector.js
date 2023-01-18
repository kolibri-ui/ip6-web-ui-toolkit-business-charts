// noinspection SpellCheckingInspection

import { drawLine, drawPoint } from "../../util/chartFunctions.js";
import { drawGrid }            from "../../util/chartGridFunctions.js";
import {
    calcXRatio,
    calcYRatio,
    domainToCanvasXY, pointCanvasToDomain,
    pointDomainToCanvas
} from "../../util/geometryFunctions.js";
import { generateId }          from "../../util/functions.js";
import { AxisControlBarProjector } from "../axisControlBar/axisControlBarProjector.js";
import { ToolBarProjector }        from "../toolBar/toolBarProjector.js";

export { SimpleLineChart }

/**
 * @typedef { Object } LineChartOptions
 * @property { !Number } width chart width in pixel
 * @property { !Number } height chart height in pixel
 * @property { String } color Color for points //TODO change for line chart
 * @property { !Number } pointSize size of scatterplot points //TODO change for line chart
 * @property { GridOptions } gridOptions grid options
 */

/**
 * @description Implementation of a simple line chart based on canvas.
 * @author Valentina Giampa & Roger Kreienbühl
 * @param { SimpleLineChartControllerType } controller
 * @return { HTMLCanvasElement }
 */
const SimpleLineChart = controller => {
    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");
    
    // const xAxisBar = AxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    // const yAxisBar = AxisControlBarProjector("Y_AXIS", { min: controller.yMin, max: controller.yMax });
    //
    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");
    
    canvasElement.id = generateId('line-chart');
    canvasElement.classList.add('line-chart-canvas');
    canvasElement.width = 500; //TODO wenn initialisiert, dann kann width nicht 0 sein..?
    canvasElement.height = 400; //TODO wenn initialisiert, dann kann height nicht 0 sein..?
    
    // chartElement.append(yAxisBar, canvasElement, xAxisBar);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    // /**
    //  *
    //  * @returns {{pointSize: number, color: string, gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: number, xRatio:
    //  *     Number, yRatio: Number, xEvery: (number|Number|?Number|*), drawOuterTicks: (Boolean|?Boolean|*),
    //  *     canvasHeight: number, yEvery: (number|Number|?Number|*)}, width: number, height: number}}
    //  */
    
    /**
     * @returns { LineChartOptions }
     // * @returns {{gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: Number, xRatio: Number, yRatio: Number, xEvery: Number, drawOuterTicks: Boolean, canvasHeight: Number, yEvery: Number}, width: Number, colors: Array<String>, height: Number}}
     */
    const getOptions = () => {
        let { width, height } = canvasElement.getBoundingClientRect();
        const pointSize = Number(getComputedStyle(canvasElement).getPropertyValue("--data-point-size")); //TODO change for line chart
        const pointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-color"); //TODO change for line chart

        width = width === 0 ? 500 : width; //TODO bereits initialisiert mit 500
        height = height === 0 ? 400 : height; //TODO bereits initialisiert 400 //TODO wo werden die default-Werte bewirtschaftet, sodass es konsistent bleibt? Im Model? Oder im Projector?

        const xMin = controller.xMin.getValue();
        const xMax = controller.xMax.getValue();
        const yMin = controller.yMin.getValue();
        const yMax = controller.yMax.getValue();

        const nullPoint = pointDomainToCanvas(
            width,
            height,
            xMin,
            xMax,
            yMin,
            yMax,
            { xValue: 0, yValue: 0 }
        );

        const xRatio = calcXRatio(width, xMin, xMax);
        const yRatio = calcYRatio(width, yMin, yMax);

        /** @type { LineChartOptions } */
        return {
            width,
            height,
            color       : pointColor, //TODO change for line chart
            pointSize   : pointSize, //TODO change for line chart
            gridOptions : {
                nullPoint   : nullPoint,
                canvasWidth : width,
                canvasHeight: height,
                xRatio,
                yRatio,
                xEvery:         controller.getOptions().xEvery,
                yEvery:         controller.getOptions().yEvery,
                drawOuterTicks: controller.getOptions().drawOuterTicks,
            }
        }
    };

    /**
     * @description draws all data points
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<LineChartDataElement> } data
     * @param { LineChartOptions } options
     */
    const drawlinePlotPoints = (
        ctx,
        data,
        options
    ) => {
        for (const v of data) {
            const point = domainToCanvasXY(
                options.gridOptions.nullPoint,
                options.gridOptions.xRatio,
                options.gridOptions.yRatio,
                v
            );

            drawPoint(ctx, point.xValue, point.yValue, options.color, options.pointSize);
        }
    };

    /**
     * @description draws 
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<LineChartDataElement> } data
     * @param { LineChartOptions } options
     */
    const drawLineChartPoints = (
        ctx,
        data,
        options
    ) => {
        for (let i = 0; i < data.length-1; i++) {
            let pointFromPosition = i;
            const pointToPosition = pointFromPosition + 1;
            const pointFrom       = domainToCanvasXY(
                options.gridOptions.nullPoint,
                options.gridOptions.xRatio,
                options.gridOptions.yRatio,
                data[pointFromPosition]
            );
            
            for (let j = i; j < data.length; j++) {
                const pointTo = domainToCanvasXY(
                    options.gridOptions.nullPoint,
                    options.gridOptions.xRatio,
                    options.gridOptions.yRatio,
                    data[pointToPosition]
                );
            drawLine(ctx, pointFrom.xValue, pointFrom.yValue, pointTo.xValue, pointTo.yValue, options.color);
                pointFromPosition++;
            }
        }
    };

    /**
     * @description draws the line chart with the grid
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array.<LineChartDataElement> } data
     * @param { LineChartOptions } options
     */
    const drawLineChart = (
        ctx, 
        data, 
        options
    ) => {
        drawGrid(ctx, options.gridOptions);
        drawLineChartPoints(ctx, data, options);
        drawlinePlotPoints(ctx, data, options);
    };

    /**
     * @description redraws the line chart with the grid
     * @param { HTMLCanvasElement } element the affected html element for redraw
     * @param { Array.<LineChartDataElement>} data the affected data array for redraw
     * @param { LineChartOptions } options the affected chart options for redraw
     */
    const redrawLineChart = (
        element,
        data,
        options,
    ) => {
        const ctx = element.getContext('2d');
        ctx.clearRect(0, 0, options.width, options.height);
        drawLineChart(ctx, data, options);
    };
    
    const redraw = () => redrawLineChart(canvasElement, controller.getData(), getOptions());
    
    const setCanvasBoundaries = (xMin, xMax, yMin, yMax) => {
        const options = getOptions();
        
        const domainStart = pointCanvasToDomain(
            options.width,
            options.height,
            controller.xMin.getValue(),
            controller.xMax.getValue(),
            controller.yMin.getValue(),
            controller.xMax.getValue(),
            {
                xValue: xMin,
                yValue: yMin
            }
        );
        
        const domainEnd = pointCanvasToDomain(
            options.width,
            options.height,
            controller.xMin.getValue(),
            controller.xMax.getValue(),
            controller.yMin.getValue(),
            controller.xMax.getValue(),
            {
                xValue: xMax,
                yValue: yMax
            }
        );
        
        controller.xMin.setValue(Math.min(...[ domainStart.xValue, domainEnd.xValue ]));
        controller.xMax.setValue(Math.max(...[ domainStart.xValue, domainEnd.xValue ]));
        controller.yMin.setValue(Math.min(...[ domainStart.yValue, domainEnd.yValue ]));
        controller.yMax.setValue(Math.max(...[ domainStart.yValue, domainEnd.yValue ]));
    };
    
    const getDataPointForPosition = (canvasX, canvasY) => {
        const options = getOptions();
        for (const point of controller.getData()) {
            const pointCanvas = pointDomainToCanvas(
                options.width,
                options.height,
                controller.xMin.getValue(),
                controller.xMax.getValue(),
                controller.yMin.getValue(),
                controller.yMax.getValue(),
                point
            );
            
            const dx = pointCanvas.xValue - canvasX;
            const dy = pointCanvas.yValue - canvasY;
            
            const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            
            if (dist <= options.pointSize) {
                return point;
            }
        }
        
        return undefined;
    };
    
    //event listeners
    controller.xMin.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.xMax.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.yMin.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.yMax.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.onDataChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    
    //resize
    const resizeHandler = new ResizeObserver((_) => {
        const options = getOptions();
        canvasElement.width = options.width;
        canvasElement.height = options.height;
        
        redrawLineChart(canvasElement, controller.getData(), options);
    });
    resizeHandler.observe(canvasElement);
    
    const styleChangeHandler = new MutationObserver((_) => {
        const options = getOptions();
        redrawLineChart(canvasElement, controller.getData(), options);
    });
    styleChangeHandler.observe(canvasElement, {attributes: true, attributeFilter: ["style"]});
    
    drawLineChart(context, controller.getData(), getOptions());
    
    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    const yAxisBar = AxisControlBarProjector( "Y_AXIS", { min: controller.yMin, max: controller.yMax });
    
    const toolbar = ToolBarProjector(
        controller.toolBarController,
        {
            getOptions,
            getDataPointForPosition,
            selectedDataPoint: controller.setSelectedElement,
            setCanvasBoundaries,
            redraw
        },
        canvasElement
    );
    
    chartElement.append(toolbar, yAxisBar, canvasElement, xAxisBar);
    
    return chartElement;
};