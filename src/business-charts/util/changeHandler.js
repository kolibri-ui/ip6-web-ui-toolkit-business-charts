// noinspection SpellCheckingInspection

export { registerChangeHandler }

/**
 *
 * @param { HTMLCanvasElement }                                        canvasElement canvas element
 * @param { (serie: ? ChartDataSeriesControllerType) => ChartOptions } getOptions get options for element
 * @param { () => void }                                               redraw redraw the canvas
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