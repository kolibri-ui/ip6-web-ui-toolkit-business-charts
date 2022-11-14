
export { SimpleScatterplotChart }

/**
 * @typedef { Object } ScatterplotChartDataElement
 * @property { String } name Name of the data element
 * @property { Number } xValue Value on the horizontal Axis of the data element
 * @property { Number } yValue Value on the vertical Axis of the data element
 */

/**
 * @typedef { Object } ScatterplotChartOptions
 *
 */

/**
 *
 * @param { Array.<ScatterplotChartDataElement> } data
 * @param { ScatterplotChartOptions } options
 * @return { HTMLCanvasElement } 
 * @constructor
 */
const SimpleScatterplotChart = ( data, options ) => {
    /** @type { HTMLCanvasElement } */ const canvasElement = document.createElement("canvas");
    return canvasElement;
}