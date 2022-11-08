// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

export { drawLine, drawGrid, getNewZeroPosition }

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
 * @summary A function that creates one or more lines in a given context.
 * @todo discussion: should this function be a separate projector for a combi of projectors? Needed for Axis and grid creation
 * @param { CanvasRenderingContext2D } ctx the canvas rendering context in 2D
 * @param { Number } startX the x position where the line starts relative to the null point
 * @param { Number } startY the y position where the line starts relative to the null point
 * @param { Number } endX the x position where the line ends relative to the null point
 * @param { Number } endY the y position where the line ends relative to the null point
 * @param { String } color the color of the line
 * 
 * @example Creates Axis, grids, the line of a line chart, 
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

/**
 * @typedef { Object } GridObject
 * @description Starting point of the calculation is the Cartesian coordinate system (mathematical right-handedness).
 * The canvas object moves in the 4th quadrant and thus has the origin x=0, y=0 in the canvas corner at the top left.
 * @param { Number } xOrigin  Origin value on x-axis (horizontal line)
 * @param { Number } yOrigin  Origin on y- Axis (vertical line)
 * @param { Number } shiftX   shift right / shift left. Value is changing on x-axis
 * @param { Number } shiftY   shift up / shift down. Value is changing on y-axis
 * @param { Number } paddingXLeft  Space on the left side before the new x-value is calculated
 * @param { Number } paddingXRight Space on the right side before the new x-value is calculated
 * @param { Number } paddingYUp    Space on the upper side before the new y-value is calculated
 * @param { Number } paddingYDown  Space on the lower side before the new y-value is calculated
 * @return { {gx0: Number, gy0: Number} } new calculated zero point
 */
function getNewZeroPosition(
    xOrigin,
    yOrigin,
    shiftX,
    shiftY,
    paddingXLeft,
    paddingXRight,
    paddingYUp,
    paddingYDown
) {
    return { gx0: xOrigin + paddingXLeft + paddingXRight - shiftX, gy0: yOrigin + paddingYUp + paddingYDown - shiftY };
}

const gridXZeroPosition = getNewZeroPosition(
    0,
    0,
    500,
    500,
    10,
    10,
    10,
    10);

console.log("new x position: " + gridXZeroPosition.gx0);
console.log("new y position: " + gridXZeroPosition.gy0);