
export { canvasToDomainXY, domainToCanvasXY }

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