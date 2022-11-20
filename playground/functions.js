export { getNewPointPos, CORNER }

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