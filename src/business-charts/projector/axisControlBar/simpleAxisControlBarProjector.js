// noinspection SpellCheckingInspection

import { projectChangeInput } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputProjector.js";

export { SimpleAxisControlBarProjector }

/**
 * @typedef { 'X_AXIS'|'Y_AXIS' } AxisType
 */

/**
 * @typedef { Object } AxisControlBarController
 * @property { SimpleInputControllerType } min minimum value
 * @property { SimpleInputControllerType } max maximum value
 */

/**
 *
 * @param { AxisType } axis type of axis
 * @param { AxisControlBarController } controller axis controller
 * @constructor
 */
const SimpleAxisControlBarProjector = (axis, controller) => {
    const axisIdentifier = axis === 'X_AXIS' ? 'x' : 'y';

    /** @type { HTMLDivElement } */
    const axisControlElement = document.createElement("div");
    axisControlElement.classList.add(`${axisIdentifier}-axis`);

    const minInput = projectChangeInput(`${axisIdentifier}-axis-min-dimension`, controller.min);
    const maxInput = projectChangeInput(`${axisIdentifier}-axis-max-dimension`, controller.max);

    if (axis === 'X_AXIS') {
        axisControlElement.append(...minInput, ...maxInput);
    } else {
        axisControlElement.append(...maxInput, ...minInput);
    }

    return axisControlElement;
};