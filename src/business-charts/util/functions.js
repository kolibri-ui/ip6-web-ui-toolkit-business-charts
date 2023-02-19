export { generateId, ctrlOrCmdPressed }

const generateId = prefix => {
    const random = (Math.random() + 1).toString(36).substring(2);
    return `${prefix}-${random}`;
};

/**
 * Checks if CMD (on Mac) or CTRL (on other platforms) is pressed
 * @param { MouseEvent } event
 * @returns { Boolean }
 */
const ctrlOrCmdPressed = (event) => ((window.navigator.userAgent.indexOf("Mac") !== -1) && event.metaKey) || event.ctrlKey;