
import { total }      from "./kolibri/util/test.js";
import { versionInfo} from "./kolibri/version.js";

//Kolibri Test suites
import './kolibri/allKolibriTestsSuite.js';
import './examples/allExampleTestsSuite.js';

//Business Charts Test suites
import '../../../../playground/allChartTestsSuite.js';

total.onChange( value => document.getElementById('grossTotal').textContent = "" + value + " tests done.");

document.querySelector("footer").textContent = "Built with Kolibri " + versionInfo;
