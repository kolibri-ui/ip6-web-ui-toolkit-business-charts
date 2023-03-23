// noinspection SpellCheckingInspection

export { DataTableViewController }

/**
 * @typedef TableViewControllerType
 * @property { () => Array<ChartDataElement> }                                       getData array of data elements
 * @property { (elements: Array<ChartDataElement>) => void }                         setSelectedElements set the
 *     selected data elements
 * @property { () => Array<ChartDataElement> }                                       getSelectedElements get the
 *     selected data elements
 * @property { (callback: onValueChangeCallback<Array<ChartDataElement>>)  => void } onSelectedElementsChanged when
 *     selected Elements change
 */

/**
 *
 * @param { ChartControllerType } controller
 * @param { ChartDataSeriesControllerType} serieController
 * @return { TableViewControllerType }
 * @constructor
 */
const DataTableViewController = (controller, serieController) => ({
    getData                  : serieController.getData,
    setSelectedElements      : controller.setSelectedElements,
    getSelectedElements      : controller.getSelectedElements,
    onSelectedElementsChanged: controller.onSelectedElementsChanged
});