// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

import {
    pointDomainToCanvas,
    yDomainToCanvas
} from "./geometryFunctions.js";

export {
    drawPoint,
    drawLine,
    drawPath,
    drawArea,
    drawRect,
    drawAreachartArea,
    drawLinechartLine,
    drawScatterplotPoints,
    drawGrid,
    drawTick,
    drawText,
    measureText,
    TICK_ORIENTATION
}

/**
 * Function to draw a point to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Number }                   pointX x position where the point starts relative to the null point
 * @param { Number }                   pointY y position where the point starts relative to the null point
 * @param { String }                   color fill color of the point
 * @param { Number }                   radius radius of the point
 */
const drawPoint = (
    ctx,
    pointX,
    pointY,
    color,
    radius
) => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
};

/**
 * Function to draw a line to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { CanvasPoint2D }            start the position where the line starts relative to the null point
 * @param { CanvasPoint2D }            end the position where the line ends relative to the null point
 * @param { String }                   color the color of the line
 * @param { Number }                   lineWidth line width
 */
function drawLine(
    ctx,
    start,
    end,
    color,
    lineWidth
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = lineWidth ?? 1;
    ctx.beginPath();
    ctx.moveTo(start.xValue, start.yValue);
    ctx.lineTo(end.xValue, end.yValue);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.restore();
}

/**
 * Function to draw a path to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Array<CanvasPoint2D> }     points array of canvas points
 * @param { String }                   color the color of the line
 * @param { Number }                   lineWidth line width
 */
function drawPath(
    ctx,
    points,
    color,
    lineWidth
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = lineWidth ?? 1;
    ctx.beginPath();
    for (const [ i, v ] of points.entries()) {
        i === 0 ? ctx.moveTo(v.xValue, v.yValue) : ctx.lineTo(v.xValue, v.yValue);
    }
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.restore();
}

/**
 * Function to draw an area to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Array<CanvasPoint2D> }     points array of canvas points
 * @param { String }                   color color
 * @param { Number }                   alpha alpha value for drawing the area
 * @param { Number }                   yNull null position for y
 */
function drawArea(
    ctx,
    points,
    yNull,
    color,
    alpha = 1.0
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth   = 1;
    ctx.fillStyle   = color;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.moveTo(points[0].xValue, yNull);
    for (const [ i, v ] of points.entries()) {
        i === 0 ? ctx.moveTo(v.xValue, v.yValue) : ctx.lineTo(v.xValue, v.yValue);
    }
    ctx.lineTo(points[points.length - 1].xValue, yNull);
    ctx.lineTo(points[0].xValue, yNull);
    ctx.fill();
    ctx.stroke();
    ctx.globalAlpha = 1.0;
    ctx.restore();
}

/**
 * @typedef { Object } RectOptions
 * @property { String }  color color
 * @property { Number }  alpha alpha value for drawing the rectangle
 * @property { Boolean } border weather border is drawn or not
 * @property { String }  borderColor border color
 */

/**
 * Function to draw a rectangle to a canvas context.
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { CanvasPoint2D }            upperLeftCorner upper left start point for drawing
 * @param { Number }                   width width of the rectangle
 * @param { Number }                   height height of the rectangle
 * @param { RectOptions }              opts rectangle options
 */
function drawRect(
    ctx,
    upperLeftCorner,
    width,
    height,
    opts = {
        color      : '#000000',
        alpha      : 1.0,
        border     : false,
        borderColor: '#000000'
    }
) {
    ctx.save();
    ctx.fillStyle   = opts.color;
    ctx.strokeStyle = opts.borderColor ?? '#000000';
    ctx.globalAlpha = opts.alpha;
    ctx.fillRect(upperLeftCorner.xValue, upperLeftCorner.yValue, width, height);
    ctx.globalAlpha = 1.0;
    ctx.restore();
}

/** ************************ chart drawing functions ************************ */

/**
 * @description draws area for given data elements
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Array<ChartDataElement> }  data data elements to draw
 * @param { Array<ChartDataElement> }  selectedPoints selected data elements
 * @param { ChartOptions } options chart options
 */
const drawAreachartArea = (
    ctx,
    data,
    selectedPoints,
    options
) => {
    const points = [];
    const yNull  = yDomainToCanvas(options.height, options.boundaries.yMin, options.boundaries.yMax, 0);

    for (const v of data) {
        const point = pointDomainToCanvas(
            options.width,
            options.height,
            {
                xValue: options.boundaries.xMin,
                yValue: options.boundaries.yMin,
            },
            {
                xValue: options.boundaries.xMax,
                yValue: options.boundaries.yMax,
            },
            v
        );

        points.push(point);
    }

    drawArea(ctx, points, yNull, options.color, 0.6);

    drawScatterplotPoints(ctx, data, selectedPoints, options);
};

/**
 * @description draws line for all data points
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Array<ChartDataElement> }  data data elements to draw
 * @param { Array<ChartDataElement> }  selectedPoints selected data elements
 * @param { ChartOptions }             options chart options
 */
const drawLinechartLine = (
    ctx,
    data,
    selectedPoints,
    options
) => {
    const points = [];

    for (const v of data) {
        const point = pointDomainToCanvas(
            options.width,
            options.height,
            {
                xValue: options.boundaries.xMin,
                yValue: options.boundaries.yMin,
            },
            {
                xValue: options.boundaries.xMax,
                yValue: options.boundaries.yMax,
            },
            v
        );

        points.push(point);
    }

    drawPath(ctx, points, options.color, 1);

    drawScatterplotPoints(ctx, data, selectedPoints, options);
};

/**
 * @description draws all data points
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Array<ChartDataElement> }  data array of data elements
 * @param { Array<ChartDataElement> }  selectedPoints array of selected data ellements
 * @param { ChartOptions } options chart options
 */
const drawScatterplotPoints = (
    ctx,
    data,
    selectedPoints,
    options
) => {

    for (const v of data) {
        const point = pointDomainToCanvas(
            options.width,
            options.height,
            {
                xValue: options.boundaries.xMin,
                yValue: options.boundaries.yMin,
            },
            {
                xValue: options.boundaries.xMax,
                yValue: options.boundaries.yMax,
            },
            v
        );

        const color = selectedPoints.includes(v) ? options.selectedColor : options.color;

        drawPoint(ctx, point.xValue, point.yValue, color, options.pointSize);
    }
};

/** ************************ chart grid functions ************************ */

/**
 * @typedef { Object } GridOptions
 * @property { CanvasPoint2D } nullPoint domain null point
 * @property { Number }        canvasWidth width of the canvas
 * @property { Number }        canvasHeight height of the canvas
 */

/**
 *
 * @param { CanvasRenderingContext2D } ctx canvas 2d context
 * @param { Number }                   width canvas width
 * @param { Number }                   height canvas height
 * @param { DataBoundaries }           boundaries data boundaries
 */
const drawGrid = (
    ctx,
    width,
    height,
    boundaries
) => {
    const nullPoint = pointDomainToCanvas(
        width,
        height,
        {
            xValue: boundaries.xMin,
            yValue: boundaries.yMin,
        },
        {
            xValue: boundaries.xMax,
            yValue: boundaries.yMax,
        },
        { xValue: 0, yValue: 0 }
    );

    drawLine(
        ctx,
        {
            xValue: 0,
            yValue: nullPoint.yValue
        },
        {
            xValue: width,
            yValue: nullPoint.yValue
        },
        '#000000'
    );
    drawLine(
        ctx,
        {
            xValue: nullPoint.xValue,
            yValue: 0
        },
        {
            xValue: nullPoint.xValue,
            yValue: height
        },
        '#000000'
    );
};

/** ************************ chart labeling functions ************************ */

/**
 * Enum for orientation of ticks
 * @typedef { String } TickOrientation
 * @readonly
 * @enum { TickOrientation }
 */
const TICK_ORIENTATION = {
    UP   : 'UP',
    DOWN : 'DOWN',
    LEFT : 'LEFT',
    RIGHT: 'RIGHT'
};

/**
 * Function to draw a tick on a canvas context
 * @param { CanvasRenderingContext2D } ctx rendering context of the canvas
 * @param { CanvasPoint2D }            position position of the tick
 * @param { TickOrientation }          orientation orientation of the tick
 * @param { String }                   color color
 */
const drawTick = (
    ctx,
    position,
    orientation,
    color = '#000000'
) => {
    switch (orientation) {
        case TICK_ORIENTATION.UP:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, {
                xValue: position.xValue,
                yValue: position.yValue - 5
            }, color);
            break;
        case TICK_ORIENTATION.DOWN:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, {
                xValue: position.xValue,
                yValue: position.yValue + 5
            }, color);
            break;
        case TICK_ORIENTATION.LEFT:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, {
                xValue: position.xValue - 5,
                yValue: position.yValue
            }, color);
            break;
        case TICK_ORIENTATION.RIGHT:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, {
                xValue: position.xValue + 5,
                yValue: position.yValue
            }, color);
            break;
    }
};

/**
 * Function to draw a text on a canvas context
 * @param { CanvasRenderingContext2D } ctx rendering context of the canvas
 * @param { CanvasPoint2D }            position position of the text
 * @param { String }                   text text
 * @param { String }                   color text color
 */
const drawText = (
    ctx,
    position,
    text,
    color = '#000000'
) => {
    ctx.font      = "12px RobotoSlab-Light";
    ctx.fillStyle = color;
    ctx.fillText(text, position.xValue, position.yValue);
    ctx.restore();
};

/**
 *
 * @param { CanvasRenderingContext2D }  ctx canvas 2d context
 * @param { String }                    text text
 * @return { Number }
 */
const measureText = (
    ctx,
    text
) => {
    ctx.font = "12px RobotoSlab-Light";
    return ctx.measureText(text).width;
};