import { dom } from "../../../Kolibri/docs/src/kolibri/util/dom.js";

export { DataTableView }

/**
 * @typedef TableViewControllerType
 * @property { (data: Array<ScatterChartDataElement>) => void }                             setData the data series to be presented in the line chart
 * @property { () => Array<ScatterChartDataElement> }                                       getData the data series used in the line chart
 * @property { (elements: Array<ScatterChartDataElement>) => void }                         setSelectedElements set the selected data elements
 * @property { () => Array<ScatterChartDataElement> }                                       getSelectedElements get the selected data elements
 * @property { (callback: onValueChangeCallback<Array<ScatterChartDataElement>>)  => void } onDataChanged when interaction with the data has occurred
 * @property { (callback: onValueChangeCallback<Array<ScatterChartDataElement>>)  => void } onSelectedElementsChanged when selected Elements change
 */

/**
 *
 * @param { TableViewControllerType } controller
 * @param { ?String }title
 * @returns { HTMLDivElement }
 */
const DataTableView = (controller, title) => {
    const elements = dom(`
        <div class="chart-data-table-container">
            <table class="chart-data-table">
                <thead >
                    <tr>
                        <th>${title ?? 'Data'}</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>`
    );
    const tbody = elements[0].children[0].children[1];

    /**
     * Clear existing rows and add a row to the table for every data element
     */
    const addRows = () => {
        tbody.replaceChildren();

        for (const entry of controller.getData()) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const text = document.createTextNode(entry.name);
            cell.append(text);
            row.append(cell);
            tbody.append(row);

            row.classList.add('element-row');

            controller.onSelectedElementsChanged(() => {
                if (controller.getSelectedElements().includes(entry)) {
                    if (!row.classList.contains('active-element-row')) {
                        row.classList.add('active-element-row');
                    }
                } else {
                    if (row.classList.contains('active-element-row')) {
                        row.classList.remove('active-element-row');
                    }
                }
            });

            row.onclick = (event) => {
                if (event && ctrlOrCmdPressed(event)) {
                    if (controller.getSelectedElements().includes(entry)) {
                        controller.setSelectedElements(controller.getSelectedElements().filter(element => element !== entry));
                    } else {
                        controller.setSelectedElements([entry, ...controller.getSelectedElements()]);
                    }
                } else {
                    controller.setSelectedElements([entry]);
                }
            }
        }
    };

    controller.onDataChanged(() => {
        addRows();
    });

    addRows();

    return elements[0];
};

/**
 * Checks if CMD (on Mac) or CTRL (on other platforms) is pressed
 * @param { MouseEvent } event
 * @returns { Boolean }
 */
const ctrlOrCmdPressed = (event) => ((window.navigator.userAgent.indexOf("Mac") !== -1) && event.metaKey) || event.ctrlKey;