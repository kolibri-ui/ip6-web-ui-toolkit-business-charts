
import { total }      from "./kolibri/util/test.js";
import { versionInfo} from "./kolibri/version.js";

//Kolibri Test suites
//TODO Uncomment after the work is done
// import './kolibri/allKolibriTestsSuite.js';
// import './examples/allExampleTestsSuite.js';

//Business Charts Test suites
import '../../../business-charts/allBusinessChartsTestsSuite.js';

total.onChange( value => document.getElementById('grossTotal').textContent = "" + value + " tests done.");

document.querySelector("footer").textContent = "Built with Kolibri " + versionInfo;
