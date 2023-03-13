// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

export {
    drawPoint,
    drawLine,
    drawPath,
    drawArea,
    drawRect
}

/**
 * @typedef { Object } ChartGridOptions
 * @property { Boolean } hasGrid
 * @property { Boolean } hasHorizontalLines
 * @property { Boolean } hasVerticalLines
 * @property { Boolean } displayNumbers
 * @property { Number } [horizontalSteps]
 * @property { Number } [verticalSteps]
 * @property { String } [primaryLineColor]
 * @property { String } [secondaryLineColor]
 */

/**
 * Function to draw a point to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Number } pointX x position where the point starts relative to the null point
 * @param { Number } pointY y position where the point starts relative to the null point
 * @param { String } color fill color of the point
 * @param { Number } radius radius of the point
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
 * @param { CanvasPoint2D } start the position where the line starts relative to the null point
 * @param { CanvasPoint2D } end the position where the line ends relative to the null point
 * @param { String } color the color of the line
 * @param { Number } lineWidth line width
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
 * @param { Array<CanvasPoint2D> } points
 * @param { String } color the color of the line
 * @param { Number } lineWidth line width
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
 * Function to draw a path to a canvas context.
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Array<CanvasPoint2D> } points
 * @param { String } color
 * @param { Number } alpha
 * @param { Number } yNull
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
 * @property { String } color
 * @property { Number } alpha
 * @property { Boolean } border
 * @property { String } borderColor
 */

/**
 * Function to draw a rectangle to a canvas context.
 * @param { CanvasRenderingContext2D } ctx
 * @param { CanvasPoint2D } upperLeftCorner
 * @param { Number } width
 * @param { Number } height
 * @param { RectOptions } opts
 */
function drawRect(
    ctx,
    upperLeftCorner,
    width,
    height,
    opts = {
        color: '#000000',
        alpha: 1.0,
        border: false,
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