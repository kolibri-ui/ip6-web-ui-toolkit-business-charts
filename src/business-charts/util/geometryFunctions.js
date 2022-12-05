export {
    xDomainToCanvas,
    yDomainToCanvas,
    xCanvasToDomain,
    yCanvasToDomain,
    pointDomainToCanvas,
    pointCanvasToDomain,
    calcXRatio,
    calcYRatio,
    canvasToDomainXY,
    domainToCanvasXY
}

/**
 * @typedef { Object } CanvasPoint2D
 * @property { Number } xValue
 * @property { Number } yValue
 */

/**
 * @typedef { Object } DomainPoint2D
 * @property { Number } xValue
 * @property { Number } yValue
 */

/**
 *
 * @param { Number } width canvas width
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @returns { Number }
 */
const calcXRatio = (width, xMin, xMax) => (width / (xMax - xMin));

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @returns { Number }
 */
const calcYRatio = (height, yMin, yMax) => (height / (yMax - yMin));

/**
 *
 * @param { Number } width canvas width
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } domainX xValue of domain
 * @returns { Number } xValue calculated on canvas
 */
const xDomainToCanvas = (width, xMin, xMax, domainX) => (calcXRatio(width, xMin, xMax) * (domainX - xMin));

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { Number } domainY yValue of domain
 * @returns { Number } yValue calculated on canvas
 */
const yDomainToCanvas = (height, yMin, yMax, domainY) => (calcYRatio(height, yMin, yMax) * (yMax - domainY));

/**
 *
 * @param { Number } width canvas width
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } canvasX xValue of canvas
 * @returns { Number } xValue calculated on domain
 */
const xCanvasToDomain = (width, xMin, xMax, canvasX) => (canvasX / (width / (xMax - xMin)) + xMin);

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { Number } canvasY yValue of canvas
 * @returns { Number } yValue calculated on domain
 */
const yCanvasToDomain = (height, yMin, yMax, canvasY) => (yMax - (canvasY / (height / (yMax - yMin))));


/**
 *
 * @param { Number } width canvas width
 * @param { Number } height canvas height
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { DomainPoint2D } point domain position of the new point
 * @return { CanvasPoint2D } canvas position of the new domain point
 */
const pointDomainToCanvas = (width, height, xMin, xMax, yMin, yMax, point) => ({
    xValue: xDomainToCanvas(width, xMin, xMax, point.xValue),
    yValue: yDomainToCanvas(height, yMin, yMax, point.yValue)
});

/**
 *
 * @param { Number } width canvas width
 * @param { Number } height canvas height
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { CanvasPoint2D } point canvas position of the new point
 * @return { DomainPoint2D } domain position of the new domain point
 */
const pointCanvasToDomain = (width, height, xMin, xMax, yMin, yMax, point) => ({
    xValue: xCanvasToDomain(width, xMin, xMax, point.xValue),
    yValue: yCanvasToDomain(height, yMin, yMax, point.yValue)
});

/**
 *
 * @param { !CanvasPoint2D } domainNullPoint zero point definition of the grid in the domain in canvas values
 * //TODO other param comments?
 * @param { !Number } xRatio stretch (>1) / stow (<0) xValue from domain to canvas
 * @param { !Number } yRatio stretch (>1) / stow (<0) yValue from domain to canvas
 * @param { !DomainPoint2D } newDomainPoint domain position of the new point
 * @return { CanvasPoint2D } canvas position of the new domain point
 */
const domainToCanvasXY = (
    domainNullPoint,
    xRatio,
    yRatio,
    newDomainPoint
) => {
    /**
     *
     * @type   { CanvasPoint2D }
     */
    return {
        xValue: domainNullPoint.xValue + newDomainPoint.xValue * xRatio,
        yValue: domainNullPoint.yValue - newDomainPoint.yValue * yRatio
    };
};

/**
 *
 * @param  { !CanvasPoint2D } domainNullPoint zero point definition of the grid in the domain in canvas values
 * //TODO other param comments?
 * @param  { !Number }        xRatio xValue relation of domain and canvas
 * @param  { !Number }        yRatio yValue relation of domain and canvas
 * @param  { !CanvasPoint2D } newCanvasPoint canvas position of the new point
 * @return { DomainPoint2D }  domain position of the new canvas point
 */
const canvasToDomainXY = (
    domainNullPoint,
    xRatio,
    yRatio,
    newCanvasPoint
) => {
    /**
     *
     * @type   { DomainPoint2D }
     */
    return {
        xValue: (newCanvasPoint.xValue - domainNullPoint.xValue) / xRatio,
        yValue: (domainNullPoint.yValue - newCanvasPoint.yValue) / yRatio
    };
};