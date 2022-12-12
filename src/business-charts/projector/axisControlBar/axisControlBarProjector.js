import { projectChangeInput } from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputProjector.js";

export { AxisControlBarProjector }

/**
 * @typedef { 'X_AXIS'|'Y_AXIS' } AxisType
 */

/**
 * @typedef { Object } AxisControlBarControllers
 * @property { SimpleInputControllerType } min
 * @property { SimpleInputControllerType } max
 */

/**
 *
 * @param axis { AxisType }
 * @param controllers { AxisControlBarControllers }
 * @constructor
 */
const AxisControlBarProjector = (axis, controllers) => {
    const axisIdentifier = axis === 'X_AXIS' ? 'x' : 'y';

    /** @type { HTMLDivElement } */
    const axisControlElement = document.createElement("div");
    axisControlElement.classList.add(`${axisIdentifier}-axis`);

    const minInput = projectChangeInput(`${axisIdentifier}-axis-min-dimension`, controllers.min);
    const maxInput = projectChangeInput(`${axisIdentifier}-axis-max-dimension`, controllers.max);

    if (axis === 'X_AXIS') {
        axisControlElement.append(...minInput, ...maxInput);
    } else {
        axisControlElement.append(...maxInput, ...minInput);
    }

    return axisControlElement;
};