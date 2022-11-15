
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
 * @param { !CanvasPoint2D } domainNullPoint canvas xValue and yValue of domain null point
 * @param { !Number } xRatio stretch (>1) / stow (<0) xValue from domain to canvas
 * @param { !Number } yRatio stretch (>1) / stow (<0) yValue from domain to canvas
 * @param { !DomainPoint2D } newDomainPoint
 * @return { CanvasPoint2D }
 */
const domainToCanvasXY = ( domainNullPoint, xRatio, yRatio, newDomainPoint ) => {
    /**
     *
     * @type { CanvasPoint2D }
     */
    const result = {
        xValue: domainNullPoint.xValue + newDomainPoint.xValue * xRatio,
        yValue: domainNullPoint.yValue - newDomainPoint.yValue * yRatio
    }
    return result;
}

/**
 * 
 * @param { !CanvasPoint2D } domainNullPoint
 * @param { !Number } xRatio
 * @param { !Number } yRatio
 * @param { !CanvasPoint2D } newCanvasPoint
 * @return { DomainPoint2D }
 */
const canvasToDomainXY = ( domainNullPoint, xRatio, yRatio, newCanvasPoint ) => {
    /**
     * 
     * @type { DomainPoint2D }
     */
    const result = {
        xValue: (newCanvasPoint.xValue  - domainNullPoint.xValue) / xRatio,
        yValue: (domainNullPoint.yValue - newCanvasPoint.yValue ) / yRatio
    }
    return result;
    
}
