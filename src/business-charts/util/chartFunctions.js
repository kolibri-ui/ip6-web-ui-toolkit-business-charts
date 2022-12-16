// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

export { drawPoint, drawLine, drawRect, drawGrid }

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
 * @param { Number } startX the x position where the line starts relative to the null point
 * @param { Number } startY the y position where the line starts relative to the null point
 * @param { Number } endX the x position where the line ends relative to the null point
 * @param { Number } endY the y position where the line ends relative to the null point
 * @param { String } color the color of the line
 */
function drawLine(
    ctx,
    startX,
    startY,
    endX,
    endY,
    color
) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

/**
 * Function to draw a rectangle to a canvas context.
 * @param { CanvasRenderingContext2D } ctx
 * @param { Number } upperLeftCornerX
 * @param { Number } upperLeftCornerY
 * @param { Number } width
 * @param { Number } height
 * @param { String } color
 */
function drawRect(
    ctx,
    upperLeftCornerX,
    upperLeftCornerY,
    width,
    height,
    color
) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}

/**
 * A function that creates horizontal and vertical lines
 * @todo Refine description for technical doc.
 * @todo eliminate magic numbers
 * @param { ChartGridOptions } options for displaying horizontal and or vertical lines as grid
 * @param { CanvasRenderingContext2D } ctx
 * @param { Number } startX
 * @param { Number } startY
 * @param { Number } offset
 * @param { Number } width
 * @param { Number } height
 * @param { Number } padding
 * @param { Number } horizontalDifference
 * @param { Number } verticalDifference
 * @param { Number } startValueX
 * @param { Number } startValueY
 */
function drawGrid(
    options,
    ctx,
    startX,
    startY,
    offset,
    width,
    height,
    padding,
    horizontalDifference,
    verticalDifference,
    startValueX,
    startValueY,
) {
    function drawHorizontalGridLines() {
        if (options.hasHorizontalLines === true) {
            let lineY = y - horizontalDifference;
            let number = startValueY + options.verticalSteps;

            while (lineY > startY) {
                drawLine(ctx, startX, lineY, width, lineY, options.secondaryLineColor);

                if (options.displayNumbers === true) {
                    ctx.save();
                    ctx.fillStyle = options.primaryLineColor;
                    ctx.textBaseline = "bottom";
                    ctx.font = "bold 10px Arial";
                    ctx.fillText(number.toString(), startX, lineY - 2);
                    ctx.restore();
                }

                lineY -= horizontalDifference;
                number += options.verticalSteps;
            }
        }
    }

    function drawVerticalGridLines() {
        if (options.hasVerticalLines === true) {
            let lineX = x + verticalDifference;
            let number = startValueX + options.horizontalSteps;

            while (lineX < width) {
                drawLine(ctx, lineX, startY, lineX, height, options.secondaryLineColor);

                if (options.displayNumbers === true) {
                    ctx.save();
                    ctx.fillStyle = options.primaryLineColor;
                    ctx.textBaseline = "bottom";
                    ctx.font = "bold 10px Arial";
                    ctx.fillText(number.toString(), lineX + 2, height + 2);
                    ctx.restore();
                }

                lineX += verticalDifference;
                number += options.horizontalSteps;
            }
        }
    }

    if (options.hasGrid !== true) {
        return;
    }

    const x = startX + offset;
    const y = startY + height - offset;

    // Abscissa
    drawLine(ctx, startX, y, width, y, options.primaryLineColor);

    // Ordinate
    drawLine(ctx, x, startY, x, height, options.primaryLineColor);

    drawHorizontalGridLines();
    drawVerticalGridLines();
}