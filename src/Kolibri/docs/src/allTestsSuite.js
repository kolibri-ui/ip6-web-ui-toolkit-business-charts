
// import { total }      from "./kolibri/util/test.js";
// import { versionInfo} from "./kolibri/version.js";
import { total }      from "./kolibri/util/test.js";
import { versionInfo} from "./kolibri/version.js";

//Kolibri Test suites
import './examples/allExampleTestsSuite.js';
import './kolibri/allKolibriTestsSuite.js';

//Business Charts Test suites
import '../../../../analysisCanvasSvg/allChartTestsSuite.js';

total.onChange( value => document.getElementById('grossTotal').textContent = "" + value + " tests done.");

document.querySelector("footer").textContent = "Built with Kolibri " + versionInfo;
