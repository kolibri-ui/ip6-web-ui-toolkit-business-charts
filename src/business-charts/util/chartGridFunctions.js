// noinspection SpellCheckingInspection

import { drawLine } from "./chartFunctions.js";

export { drawGrid }

/**
 * @typedef { Object } GridOptions
 * @property { CanvasPoint2D } nullPoint domain null point
 * @property { Number } canvasWidth width of the canvas
 * @property { Number } canvasHeight height of the canvas
 * @property { Number } xRatio ratio between canvas and domain for x-axis
 * @property { Number } yRatio ratio between canvas and domain for y-axis
 * @property { Number } xEvery value to define which ticks should be drawn for x-axis
 * @property { Number } yEvery value to define which ticks should be drawn for y-axis
 * @property { Boolean } [drawOuterTicks] indicates if outer ticks should be dawn
 */

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
 *
 * @param { CanvasRenderingContext2D } ctx
 * @param { GridOptions } options
 */
const drawGrid = (
    ctx,
    options
) => {
    drawGridLines(ctx, options);
    drawGridTicks(ctx, options);

    if (options.drawOuterTicks === true) {
        drawOuterTicks(ctx, options)
    }
}

/**
 * Function to draw the lines of the grid
 * @param { CanvasRenderingContext2D } ctx rendering context of the canvas
 * @param { GridOptions } options
 */
const drawGridLines = (
    ctx,
    options
) => {
    drawLine(
        ctx,
        0,
        options.nullPoint.yValue,
        options.canvasWidth,
        options.nullPoint.yValue,
        '#000000'
    );
    drawLine(
        ctx,
        options.nullPoint.xValue,
        0,
        options.nullPoint.xValue,
        options.canvasHeight,
        '#000000'
    );
}

/**
 * Function to draw the ticks of the grid
 * @param ctx { CanvasRenderingContext2D } rendering context of the canvas
 * @param options { GridOptions } domain null point
 */
const drawGridTicks = (
    ctx,
    options
) => {
    let xTick = options.nullPoint.xValue % (options.xRatio * options.xEvery);
    xTick     = xTick < 0 ? xTick + (options.xRatio * options.xEvery) : xTick;

    for (let i = 0; i < options.canvasWidth; i++) {
        /** @type { CanvasPoint2D } */
        const point = { xValue: xTick, yValue: options.nullPoint.yValue };

        drawTick(
            ctx,
            point,
            TICK_ORIENTATION.DOWN
        );

        xTick += (options.xRatio * options.xEvery);
    }

    let yTick = options.nullPoint.yValue % (options.yRatio * options.yEvery);
    yTick     = yTick < 0 ? yTick + (options.yRatio * options.yEvery) : yTick;

    for (let i = 0; i < options.canvasHeight; i++) {
        /** @type { CanvasPoint2D } */
        const point = { xValue: options.nullPoint.xValue, yValue: yTick };

        drawTick(
            ctx,
            point,
            TICK_ORIENTATION.LEFT
        );

        yTick += (options.yRatio * options.yEvery);
    }
}

/**
 * Function to draw the ticks of the grid
 * @param ctx { CanvasRenderingContext2D } rendering context of the canvas
 * @param options { GridOptions } domain null point
 */
const drawOuterTicks = (
    ctx,
    options
) => {
    let xTick = options.nullPoint.xValue % (options.xRatio * options.xEvery);
    xTick     = xTick < 0 ? xTick + (options.xRatio * options.xEvery) : xTick;

    for (let i = 0; i < options.canvasWidth; i++) {
        /** @type { CanvasPoint2D } */
        const upperPoint = { xValue: xTick, yValue: 0 };
        /** @type { CanvasPoint2D } */
        const lowerPoint = { xValue: xTick, yValue: options.canvasHeight };

        drawTick(
            ctx,
            upperPoint,
            TICK_ORIENTATION.DOWN
        );

        drawTick(
            ctx,
            lowerPoint,
            TICK_ORIENTATION.UP
        );

        xTick += (options.xRatio * options.xEvery);
    }

    let yTick = options.nullPoint.yValue % (options.yRatio * options.yEvery);
    yTick     = yTick < 0 ? yTick + (options.yRatio * options.yEvery) : yTick;

    for (let i = 0; i < options.canvasHeight; i++) {
        /** @type { CanvasPoint2D } */
        const leftPoint  = { xValue: 0, yValue: yTick };
        /** @type { CanvasPoint2D } */
        const rightPoint = { xValue: options.canvasWidth, yValue: yTick };

        drawTick(
            ctx,
            leftPoint,
            TICK_ORIENTATION.RIGHT
        );

        drawTick(
            ctx,
            rightPoint,
            TICK_ORIENTATION.LEFT
        );

        yTick += (options.yRatio * options.yEvery);
    }
}

/**
 * Function to draw a tick on a canvas context
 * @param ctx { CanvasRenderingContext2D } rendering context of the canvas
 * @param position { CanvasPoint2D } position of the tick
 * @param orientation { TickOrientation } orientation of the tick
 */
const drawTick = (
    ctx,
    position,
    orientation
) => {
    switch (orientation) {
        case TICK_ORIENTATION.UP:
            drawLine(ctx, position.xValue, position.yValue, position.xValue, position.yValue - 5, '#000000');
            break;
        case TICK_ORIENTATION.DOWN:
            drawLine(ctx, position.xValue, position.yValue, position.xValue, position.yValue + 5, '#000000');
            break;
        case TICK_ORIENTATION.LEFT:
            drawLine(ctx, position.xValue, position.yValue, position.xValue - 5, position.yValue, '#000000');
            break;
        case TICK_ORIENTATION.RIGHT:
            drawLine(ctx, position.xValue, position.yValue, position.xValue + 5, position.yValue, '#000000');
            break;
    }
}

