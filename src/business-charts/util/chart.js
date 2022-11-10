// noinspection SpellCheckingInspection

/**
 * @module util/chart
 * Helper functions to create a chart
 */

export { drawLine, drawGrid, getNewZeroPosition, CORNER, SEC_HORIZONTAL, SEC_VERTICAL }

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
 */
const CORNER = {
    UP_LEFT :   "CORNER_UP_LEFT",
    DOWN_LEFT:  "CORNER_DOWN_LEFT",
    UP_RIGHT:   "CORNER_UP_RIGHT",
    DOWN_RIGHT: "CORNER_DOWN_RIGHT"
}

/**
 *
 * @type {{DOWN: string, UP: string}}
 */
const SEC_HORIZONTAL = {
    UP:   "SEC_HORIZONTAL_UP",
    DOWN: "SEC_HORIZONTAL_DOWN"
}

/**
 *
 * @type {{LEFT: string, RIGHT: string}}
 */
const SEC_VERTICAL = {
    LEFT: "SEC_VERTICAL_LEFT",
    RIGHT: "SEC_VERTICAL_RIGHT"
}

/*enum CORNER {
    UP_LEFT,
    DOWN_LEFT,
    UP_RIGHT,
    DOWN_RIGHT
}

enum SEC_HORIZONTAL {
    UP,
    DOWN
}

enum SEC_VERTICAL {
    LEFT,
    RIGHT
}*/

/**
 * @typedef { Object } GridObject
 * @description Starting point of the calculation is the Cartesian coordinate system (mathematical right-handedness).
 * The canvas object moves in the 4th quadrant and thus has the origin x=0, y=0 in the canvas corner at the top left.
 * @param { String } fromCorner The section where the calculation of the new point starts
 * @param { String } toCorner The section where the new point is lying related to the starting point
 * @param { Number }     xOrigin  Origin value on x-axis (horizontal line)
 * @param { Number }     yOrigin  Origin on y- Axis (vertical line)
 * @param { String } newPointSectionHorizontal the section where the new point is, relative to the origin point
 * @param { String } newPointSectionVertical   the section where the new point is, relative to the origin point
 * @param { Number }     shiftRightLeft shift right / shift left of the new section. Value is changing on x-axis
 * @param { Number }     shiftUpDown    shift up / shift down of the new section. Value is changing on y-axis
 * @param { Number }     paddingRightLeft Space on the left /right side before the new position is calculated
 * @param { Number }     paddingUpDown    Space on the upside / downside before the new position is calculated
 * @return { {newXPos: Number}, {newYPos: Number} } new calculated point
 */
function getNewZeroPosition(
    fromCorner,
    toCorner,
    xOrigin,
    yOrigin,
    newPointSectionHorizontal,
    newPointSectionVertical,
    shiftRightLeft,
    shiftUpDown,
    paddingRightLeft,
    paddingUpDown
) {
    
    //from up left to down right
    if (fromCorner === CORNER.DOWN_RIGHT && toCorner === CORNER.DOWN_RIGHT && newPointSectionHorizontal === SEC_HORIZONTAL.UP && newPointSectionVertical === SEC_VERTICAL.LEFT)
        return { newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin - paddingUpDown };
    else if (fromCorner === CORNER.UP_LEFT && toCorner === CORNER.DOWN_RIGHT && newPointSectionHorizontal === SEC_HORIZONTAL.DOWN && newPointSectionVertical === SEC_VERTICAL.LEFT)
        return { newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin - paddingUpDown - shiftUpDown };
    else if (fromCorner === CORNER.UP_LEFT && toCorner === CORNER.DOWN_RIGHT && newPointSectionHorizontal === SEC_HORIZONTAL.UP && newPointSectionVertical === SEC_VERTICAL.RIGHT)
        return { newXPos: xOrigin + paddingRightLeft + shiftRightLeft, newYPos: yOrigin - paddingUpDown };
    else (fromCorner === CORNER.UP_LEFT && toCorner === CORNER.DOWN_RIGHT && newPointSectionHorizontal === SEC_HORIZONTAL.DOWN && newPointSectionVertical === SEC_VERTICAL.RIGHT)
        return { newXPos: xOrigin + paddingRightLeft + shiftRightLeft, newYPos: yOrigin - paddingUpDown - shiftUpDown };
    // else {
    //     console.log("Keine passende Option");
    // }
    // //from down left to up right
    // else if (fromCorner.DOWN_LEFT && toCorner.UP_RIGHT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin + paddingUpDown };
    // else if (fromCorner.DOWN_LEFT && toCorner.UP_RIGHT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin + paddingRightLeft, newYPos: yOrigin + paddingUpDown + shiftUpDown };
    // else if (fromCorner.DOWN_LEFT && toCorner.UP_RIGHT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin + paddingRightLeft + shiftRightLeft, newYPos: yOrigin + paddingUpDown };
    // else if (fromCorner.DOWN_LEFT && toCorner.UP_RIGHT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin + paddingRightLeft + shiftRightLeft, newYPos: yOrigin + paddingUpDown + shiftUpDown };
    //
    // //from up right to down left
    // else if (fromCorner.UP_RIGHT && toCorner.DOWN_LEFT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin - paddingUpDown };
    // else if (fromCorner.UP_RIGHT && toCorner.DOWN_LEFT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin - paddingUpDown - shiftUpDown};
    // else if (fromCorner.UP_RIGHT && toCorner.DOWN_LEFT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin - paddingRightLeft - shiftRightLeft, newYPos: yOrigin - paddingUpDown };
    // else if (fromCorner.UP_RIGHT && toCorner.DOWN_LEFT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin - paddingRightLeft - shiftRightLeft, newYPos: yOrigin - paddingUpDown - shiftRightLeft};
    //
    // //from down right to up left
    // else if (fromCorner.DOWN_RIGHT && toCorner.UP_LEFT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin + paddingUpDown };
    // else if (fromCorner.DOWN_RIGHT && toCorner.UP_LEFT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_RIGHT)
    //     return { newXPos: xOrigin - paddingRightLeft, newYPos: yOrigin + paddingUpDown + shiftUpDown};
    // else if (fromCorner.DOWN_RIGHT && toCorner.UP_LEFT && newPointSectionHorizontal.SEC_HOR_DOWN && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin - paddingRightLeft - shiftRightLeft, newYPos: yOrigin + paddingUpDown };
    // else if (fromCorner.DOWN_RIGHT && toCorner.UP_LEFT && newPointSectionHorizontal.SEC_HOR_UP && newPointSectionVertical.SEC_VER_LEFT)
    //     return { newXPos: xOrigin - paddingRightLeft - shiftRightLeft, newYPos: yOrigin + paddingUpDown + shiftRightLeft};
}

// const getNewPosDownLeft = getNewZeroPosition(
//     corner.UP_LEFT,
//     corner.DOWN_RIGHT,
//     0,
//     0,
//     sectionHorizontal.SEC_HOR_DOWN,
//     sectionVertical.SEC_VER_LEFT,
//     500,
//     500,
//     10,
//     10,
//     10,
//     10);