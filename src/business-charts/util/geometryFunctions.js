export {
    xDomainToCanvas,
    yDomainToCanvas,
    xCanvasToDomain,
    yCanvasToDomain,
    pointDomainToCanvas,
    pointCanvasToDomain,
    calcXRatio,
    calcYRatio,
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
const calcXRatio = (width, xMin, xMax) => width / (xMax - xMin);

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @returns { Number }
 */
const calcYRatio = (height, yMin, yMax) => height / (yMax - yMin);

/**
 *
 * @param { Number } width canvas width
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } domainX xValue of domain
 * @returns { Number } xValue calculated on canvas
 */
const xDomainToCanvas = (width, xMin, xMax, domainX) => calcXRatio(width, xMin, xMax) * (domainX - xMin);

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { Number } domainY yValue of domain
 * @returns { Number } yValue calculated on canvas
 */
const yDomainToCanvas = (height, yMin, yMax, domainY) => calcYRatio(height, yMin, yMax) * (yMax - domainY);

/**
 *
 * @param { Number } width canvas width
 * @param { Number } xMin minimum of domain x
 * @param { Number } xMax maximum of domain x
 * @param { Number } canvasX xValue of canvas
 * @returns { Number } xValue calculated on domain
 */
const xCanvasToDomain = (width, xMin, xMax, canvasX) => canvasX / (width / (xMax - xMin)) + xMin;

/**
 *
 * @param { Number } height canvas height
 * @param { Number } yMin minimum of domain y
 * @param { Number } yMax maximum of domain y
 * @param { Number } canvasY yValue of canvas
 * @returns { Number } yValue calculated on domain
 */
const yCanvasToDomain = (height, yMin, yMax, canvasY) => yMax - canvasY / (height / (yMax - yMin));


/**
 *
 * @param { Number } width canvas width
 * @param { Number } height canvas height
 * @param { DomainPoint2D } min minimum of domain
 * @param { DomainPoint2D } max maximum of domain
 * @param { DomainPoint2D } point domain position of the new point
 * @return { CanvasPoint2D } canvas position of the new domain point
 */
const pointDomainToCanvas = (width, height, min, max, point) => ({
    xValue: xDomainToCanvas(width, min.xValue, max.xValue, point.xValue),
    yValue: yDomainToCanvas(height, min.yValue, max.yValue, point.yValue)
});

/**
 *
 * @param { Number } width canvas width
 * @param { Number } height canvas height
 * @param { DomainPoint2D } min minimum of domain
 * @param { DomainPoint2D } max maximum of domain
 * @param { CanvasPoint2D } point canvas position of the new point
 * @return { DomainPoint2D } domain position of the new domain point
 */
const pointCanvasToDomain = (width, height, min, max, point) => ({
    xValue: xCanvasToDomain(width, min.xValue, max.xValue, point.xValue),
    yValue: yCanvasToDomain(height, min.yValue, max.yValue, point.yValue)
});