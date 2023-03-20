// noinspection SpellCheckingInspection

import { drawLine } from "./chartFunctions.js";

export { drawTick, drawText, measureText, TICK_ORIENTATION }

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
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, { xValue: position.xValue, yValue: position.yValue - 5 }, color);
            break;
        case TICK_ORIENTATION.DOWN:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, { xValue: position.xValue, yValue: position.yValue + 5 }, color);
            break;
        case TICK_ORIENTATION.LEFT:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, { xValue: position.xValue - 5, yValue: position.yValue }, color);
            break;
        case TICK_ORIENTATION.RIGHT:
            drawLine(ctx, { xValue: position.xValue, yValue: position.yValue }, { xValue: position.xValue + 5, yValue: position.yValue }, color);
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
    ctx.font = "12px RobotoSlab-Light";
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