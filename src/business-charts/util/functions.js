export { ctrlOrCmdPressed, defaultColors }

/**
 * Checks if CMD (on Mac) or CTRL (on other platforms) is pressed
 * @param { MouseEvent } event mouse event
 * @returns { Boolean }
 */
const ctrlOrCmdPressed = (event) => ((window.navigator.userAgent.indexOf("Mac") !== -1) && event.metaKey)
                                    || event.ctrlKey;

/**
 * get default colors
 * @return { Array<String> }
 */
const defaultColors = () => {
    const colorStrings = [
        "--kb-color-rgb-purple-600",
        "--kb-color-rgb-lavender-600",
        "--kb-color-rgb-blue-600",
        "--kb-color-rgb-green-600",
        "--kb-color-rgb-yellow-600",
        "--kb-color-rgb-pink-600"
    ];
    const colors       = [];

    const computedStyle = getComputedStyle(document.querySelector(":root"));

    for (const c of colorStrings) {
        const color = computedStyle.getPropertyValue(c);
        if (color && color.trim().startsWith("#")) {
            colors.push(color);
        }
    }

    if (colors.length === 0) {
        colors.push("#5F0FDF", "#9317EC", "#0400C9", "#009B00", "#946300", "#D50069");
    }

    return colors;
};