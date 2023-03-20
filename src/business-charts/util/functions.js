export { ctrlOrCmdPressed }

/**
 * Checks if CMD (on Mac) or CTRL (on other platforms) is pressed
 * @param { MouseEvent } event mouse event
 * @returns { Boolean }
 */
const ctrlOrCmdPressed = (event) => ((window.navigator.userAgent.indexOf("Mac") !== -1) && event.metaKey) || event.ctrlKey;