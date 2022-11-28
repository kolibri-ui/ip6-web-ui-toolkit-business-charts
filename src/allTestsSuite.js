
import { total }      from "./Kolibri/docs/src/kolibri/util/test.js";
import { versionInfo} from "./Kolibri/docs/src/kolibri/version.js";

import './Kolibri/docs/src/kolibri/allKolibriTestsSuite.js';
import './Kolibri/docs/src/examples/allExampleTestsSuite.js';
import './business-charts/allBusinessChartsTestsSuite.js';

total.onChange( value => document.getElementById('grossTotal').textContent = "" + value + " tests done.");

document.querySelector("footer").textContent = "Built with Kolibri " + versionInfo;
