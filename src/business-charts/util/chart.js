// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

export {drawLine, drawGrid, getNewPointPos, CORNER}

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
 *
 * @type {{UP_RIGHT: string, DOWN_RIGHT: string, DOWN_LEFT: string, UP_LEFT: string}}
 * the section where the origin point is and / or the destination point should be
 * @param { UP_LEFT }    UP_LEFT the corner up left from a 2D perspective
 * @param { DOWN_LEFT }  DOWN_LEFT the corner down left from a 2D perspective
 * @param { UP_RIGHT }   UP_RIGHT the corner up right from a 2D perspective
 * @param { DOWN_RIGHT } DOWN_RIGHT the corner down right from a 2D perspective
 */
const CORNER = {
    UP_LEFT: "CORNER_UP_LEFT",
    DOWN_LEFT: "CORNER_DOWN_LEFT",
    UP_RIGHT: "CORNER_UP_RIGHT",
    DOWN_RIGHT: "CORNER_DOWN_RIGHT"
};

function fromUpLeftToDownRight(fromCorner, toCorner, newPointPos, xOrigin, paddingRightLeft, yOrigin, paddingUpDown, drawWidth, drawHeight) {
    if (newPointPos === CORNER.UP_LEFT)
        return {newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin - paddingUpDown};
    else if (newPointPos === CORNER.UP_RIGHT)
        return {newXPos: xOrigin + paddingRightLeft + drawWidth, newYPos: yOrigin - paddingUpDown};
    else if (newPointPos === CORNER.DOWN_LEFT)
        return {newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin - paddingUpDown - drawHeight};
    else if (newPointPos === CORNER.DOWN_RIGHT)
        return {newXPos: xOrigin + paddingRightLeft + drawWidth, newYPos: yOrigin - paddingUpDown - drawHeight};
    else return {
            newXPos: NaN,
            newYPos: NaN
        };
}

function fromDownLeftToUpRight(fromCorner, toCorner, newPointPos, xOrigin, paddingRightLeft, yOrigin, paddingUpDown, drawWidth, drawHeight) {
    if (newPointPos === CORNER.DOWN_LEFT)
        return {newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin + paddingUpDown};
    else if (newPointPos === CORNER.UP_LEFT)
        return {newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin + paddingUpDown + drawHeight};
    else if (newPointPos === CORNER.DOWN_RIGHT)
        return {newXPos: xOrigin + paddingRightLeft + drawWidth, newYPos: yOrigin + paddingUpDown};
    else if (newPointPos === CORNER.UP_RIGHT)
        return {newXPos: xOrigin + paddingRightLeft + drawWidth, newYPos: yOrigin + paddingUpDown + drawHeight};
    else return {
            newXPos: NaN,
            newYPos: NaN
        };
}

function fromUpRightToDownLeft(fromCorner, toCorner, newPointPos, xOrigin, paddingRightLeft, yOrigin, paddingUpDown, drawWidth, drawHeight) {
    if (newPointPos === CORNER.UP_RIGHT)
        return {newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin - paddingUpDown};
    else if (newPointPos === CORNER.DOWN_RIGHT)
        return {newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin - paddingUpDown - drawHeight};
    else if (newPointPos === CORNER.UP_LEFT)
        return {newXPos: xOrigin - paddingRightLeft - drawWidth, newYPos: yOrigin - paddingUpDown};
    else if (newPointPos === CORNER.DOWN_LEFT)
        return {newXPos: xOrigin - paddingRightLeft - drawWidth, newYPos: yOrigin - paddingUpDown - drawWidth};
    else return {
            newXPos: NaN,
            newYPos: NaN
        };
}

function fromDownRightToUpLeft(fromCorner, toCorner, newPointPos, xOrigin, paddingRightLeft, yOrigin, paddingUpDown, drawWidth, drawHeight) {
    if (newPointPos === CORNER.DOWN_RIGHT)
        return {newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin + paddingUpDown};
    else if (newPointPos === CORNER.UP_RIGHT)
        return {newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin + paddingUpDown + drawHeight};
    else if (newPointPos === CORNER.DOWN_LEFT)
        return {newXPos: xOrigin - paddingRightLeft - drawWidth, newYPos: yOrigin + paddingUpDown};
    else if (newPointPos === CORNER.UP_LEFT)
        return {newXPos: xOrigin - paddingRightLeft - drawWidth, newYPos: yOrigin + paddingUpDown + drawWidth};
    else return {
            newXPos: NaN,
            newYPos: NaN
        };
}

/**
 * @typedef { Object } GridObject
 * @description Starting point of the calculation is the Cartesian coordinate system (mathematical right-handedness).
 * The canvas object moves in the 4th quadrant and thus has the origin x=0, y=0 in the canvas corner at the top left.
 * @param { String } fromCorner The section where the calculation of the new point starts
 * @param { String } toCorner The section where the new point is lying related to the starting point
 * @param { Number } xOrigin  Origin value on x-axis (horizontal line)
 * @param { Number } yOrigin  Origin on y- Axis (vertical line)
 * @param { String } newPointPos the section where the new point is, relative to the origin point
 * @param { Number } drawWidth shift right / shift left of the new section. Value is changing on x-axis
 * @param { Number } drawHeight    shift up / shift down of the new section. Value is changing on y-axis
 * @param { Number } paddingRightLeft Space on the left /right side before the new position is calculated
 * @param { Number } paddingUpDown    Space on the upside / downside before the new position is calculated
 * @return { {newXPos: Number}, {newYPos: Number} } new calculated point
 */
function getNewPointPos(
    fromCorner,
    toCorner,
    xOrigin,
    yOrigin,
    newPointPos,
    drawWidth,
    drawHeight,
    paddingRightLeft,
    paddingUpDown
) {
    if ( fromCorner === toCorner )
        return {
        newXPos: NaN,
        newYPos: NaN
    };
    //from up left to down right
    else if (fromCorner === CORNER.UP_LEFT && toCorner === CORNER.DOWN_RIGHT)
        return fromUpLeftToDownRight(
            fromCorner,
            toCorner,
            newPointPos,
            xOrigin,
            paddingRightLeft,
            yOrigin,
            paddingUpDown,
            drawWidth,
            drawHeight);

    else if (fromCorner === CORNER.DOWN_LEFT && toCorner === CORNER.UP_RIGHT)
        return fromDownLeftToUpRight(
            fromCorner,
            toCorner,
            newPointPos,
            xOrigin,
            paddingRightLeft,
            yOrigin,
            paddingUpDown,
            drawWidth,
            drawHeight);

    else if (fromCorner === CORNER.UP_RIGHT && toCorner === CORNER.DOWN_LEFT)
        return fromUpRightToDownLeft(
            fromCorner,
            toCorner,
            newPointPos,
            xOrigin,
            paddingRightLeft,
            yOrigin,
            paddingUpDown,
            drawWidth,
            drawHeight);

    //
    else return fromDownRightToUpLeft(
            fromCorner,
            toCorner,
            newPointPos,
            xOrigin,
            paddingRightLeft,
            yOrigin,
            paddingUpDown,
            drawWidth,
            drawHeight);
}