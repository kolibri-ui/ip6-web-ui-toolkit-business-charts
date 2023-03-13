export { registerChangeHandler }

/**
 *
 * @param { HTMLCanvasElement } canvasElement
 * @param { (serie: ? ChartDataSeriesControllerType) => ChartOptions } getOptions
 * @param { () => void } redraw
 */
const registerChangeHandler = (canvasElement, getOptions, redraw) => {
    //resize
    const resizeHandler = new ResizeObserver((_) => {
        const options        = getOptions();
        canvasElement.width  = options.width;
        canvasElement.height = options.height;

        redraw();
    });
    resizeHandler.observe(canvasElement);

    const styleChangeHandler = new MutationObserver((_) => {
        redraw();
    });
    styleChangeHandler.observe(document.documentElement, { attributes: true, attributeFilter: [ "style" ] });
};