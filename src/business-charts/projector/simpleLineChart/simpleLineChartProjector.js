// noinspection SpellCheckingInspection

//TODO 2 functions drawGrid available (chartFunctions.js and chartGridFrunctions.js).
import { drawLine, drawPoint } from "../../util/chartFunctions.js";
import { drawGrid }            from "../../util/chartGridFunctions.js";
import { 
    calcXRatio, 
    calcYRatio, 
    domainToCanvasXY, 
    pointDomainToCanvas }      from "../../util/geometryFunctions.js";
import { generateId }          from "../../util/functions.js";
import { AxisControlBarProjector } from "../axisControlBar/axisControlBarProjector.js";

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
 * @constructor
 */
const SimpleLineChart = controller => {
    /** @type { HTMLDivElement } */
    const chartElement = document.createElement("div");
    chartElement.classList.add("chart-container");
    
    const xAxisBar = AxisControlBarProjector("X_AXIS", { min: controller.xMin, max: controller.xMax });
    const yAxisBar = AxisControlBarProjector("Y_AXIS", { min: controller.yMin, max: controller.yMax });
    
    /** @type { HTMLCanvasElement } */
    const canvasElement = document.createElement("canvas");
    
    canvasElement.id = generateId('line-chart'); //TODO change for line chart
    canvasElement.classList.add('line-chart-canvas'); //TODO Fehler in getComputedStyle mit line-chart-canvas
    canvasElement.width = 500; //TODO wenn initialisiert, dann kann width nicht 0 sein..?
    canvasElement.height = 400; //TODO wenn initialisiert, dann kann height nicht 0 sein..?
    
    chartElement.append(yAxisBar, canvasElement, xAxisBar);

    /** @type { CanvasRenderingContext2D } */
    const context = canvasElement.getContext('2d');

    /**
     *
     * @return {{pointSize: number, color: string, gridOptions: {nullPoint: CanvasPoint2D, canvasWidth: number, xRatio: Number, yRatio: Number, xEvery: (number|Number|?Number|*), drawOuterTicks: (Boolean|?Boolean|*), canvasHeight: number, yEvery: (number|Number|?Number|*)}, width: number, height: number}}
     */
    const getOptions = () => {
        let { width, height } = canvasElement.getBoundingClientRect();
        const pointSize = Number(getComputedStyle(canvasElement).getPropertyValue("--data-point-size")); //TODO change for line chart
        const pointColor = getComputedStyle(canvasElement).getPropertyValue("--data-point-color"); //TODO change for line chart

        width = width === 0 ? 500 : width; //TODO bereits initialisiert mit 500
        height = height === 0 ? 400 : height; //TODO bereits initialisiert 400

        //TODO wo werden die default-Werte bewirtschaftet, sodass es konsistent bleibt? Im Model? Oder im Projector?

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
            color :     pointColor, //TODO change for line chart
            pointSize : pointSize, //TODO change for line chart
            gridOptions : {
                nullPoint :   nullPoint,
                canvasWidth:  width,
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
     * @param { Array<LineChartDataElement> } data
     * @param { LineChartOptions } options
     */
    const drawLineChartPoints = (
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
            //TODO fix bug drawLine from DomainNullPoint
            drawLine(ctx, 0,0,100,100, options.color )
            //drawPoint(ctx, point.xValue, point.yValue, options.color, options.pointSize);
        }
    };

    /**
     * @description draws the line chart with the grid
     * @param { CanvasRenderingContext2D } ctx
     * @param { Array<LineChartDataElement> } data
     * @param { LineChartOptions } options
     */
    const drawLineChart = (
        ctx, data, options
    ) => {
        drawGrid(ctx, options.gridOptions);
        drawLineChartPoints(ctx, data, options);
    };

    /**
     * @description redraws the line chart with the grid
     * @param { HTMLCanvasElement } element the affected html element for redraw
     * @param { Array<LineChartDataElement>} data the affected data array for redraw
     * @param { LineChartOptions } options the affected chart options for redraw
     */
    const redrawLineChart = (
        element,
        data,
        options
    ) => {
        const ctx = element.getContext('2d');
        ctx.clearRect(0, 0, options.width, options.height);
        drawLineChart(ctx, data, options);
    };
    
    //event listeners
    controller.xMin.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.xMax.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.yMin.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
    controller.xMax.onValueChanged(() => redrawLineChart(canvasElement, controller.getData(), getOptions()));
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
    
    return chartElement;
};