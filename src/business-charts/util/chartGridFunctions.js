// noinspection SpellCheckingInspection

import { drawLine }            from "./chartFunctions.js";
import { pointDomainToCanvas } from "./geometryFunctions.js";

export { drawGrid }

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