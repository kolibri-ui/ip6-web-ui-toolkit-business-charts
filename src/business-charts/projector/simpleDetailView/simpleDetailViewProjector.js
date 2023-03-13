import { dom } from "../../../Kolibri/docs/src/kolibri/util/dom.js";

export { SimpleDetailView }

/**
 * @typedef SimpleDetailViewControllerType
 * @property { () => Array<ChartDataElement> }                                       getSelectedElements get the selected data elements
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onSelectedElementsChanged when selected Elements change
 */

/**
 *
 * @param { SimpleDetailViewControllerType } controller
 * @returns { HTMLDivElement }
 * @constructor
 */
const SimpleDetailView = (controller) => {
    const detailViewElement = document.createElement('div');
    detailViewElement.classList.add('simple-detail-view-list');

    /**
     * Display all selected elements in a list
     */
    const displaySelectedElements = () => {
        detailViewElement.replaceChildren();

        for (const entry of controller.getSelectedElements()) {
            const entryViewElement = dom(`
                <div class="simple-detail-view-entry">
                    <span class="detail-view-name">${entry.name}</span>
                    <span class="detail-view-value">X: ${entry.xValue}</span>
                    <span class="detail-view-value">Y: ${entry.yValue}</span>
                </div>
            `);

            detailViewElement.append(entryViewElement[0]);
        }
    };

    controller.onSelectedElementsChanged(() => displaySelectedElements());

    displaySelectedElements();

    return detailViewElement;
};