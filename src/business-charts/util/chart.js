// noinspection SpellCheckingInspection

export {drawLine, drawRect, drawGrid}

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
 * @param { CanvasRenderingContext2D } ctx
 * @param { Number } startX
 * @param { Number } startY
 * @param { Number } endX
 * @param { Number } endY
 * @param { String } color
 */
function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

/**
 * @param { CanvasRenderingContext2D } ctx
 * @param { Number } upperLeftCornerX
 * @param { Number } upperLeftCornerY
 * @param { Number } width
 * @param { Number } height
 * @param { String } color
 */
function drawRect(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
    ctx.restore();
}

/**
 *
 * @param { ChartGridOptions } options
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
    if (options.hasGrid !== true) {
        return;
    }

    const x = startX + offset;
    const y = startY + height - offset;

    drawLine(ctx, startX, y, width, y, options.primaryLineColor);
    drawLine(ctx, x, startY, x, height, options.primaryLineColor);

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