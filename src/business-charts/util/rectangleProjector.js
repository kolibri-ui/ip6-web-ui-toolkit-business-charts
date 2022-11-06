
export {drawRect};

/**
 * A function that creates one or more bars, filled with a specific color
 * @todo Refine description for technical doc. replace "bar" with a "general form"
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