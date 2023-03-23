// noinspection SpellCheckingInspection

import { dom }              from "../../../Kolibri/docs/src/kolibri/util/dom.js";
import { ctrlOrCmdPressed } from "../../util/functions.js";

export { DataTableViewProjector }


/**
 *
 * @param { TableViewControllerType } controller table view controller
 * @param { ?String }                 title title for the table
 * @returns { HTMLDivElement }
 */
const DataTableViewProjector = (controller, title) => {
    const elements = dom(`
        <div class="chart-data-table-container">
            <table class="chart-data-table">
                <thead >
                    <tr>
                        <th>${ title ?? 'Data' }</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>`
    );
    const tbody    = elements[0].children[0].children[1];

    /**
     * Clear existing rows and add a row to the table for every data element
     */
    const addRows = () => {
        tbody.replaceChildren();

        for (const entry of controller.getData()) {
            const row  = document.createElement('tr');
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
                        controller.setSelectedElements(controller.getSelectedElements().filter(element => element
                                                                                                          !== entry));
                    } else {
                        controller.setSelectedElements([ entry, ...controller.getSelectedElements() ]);
                    }
                } else {
                    controller.setSelectedElements([ entry ]);
                }
            }
        }
    };

    addRows();

    return elements[0];
};