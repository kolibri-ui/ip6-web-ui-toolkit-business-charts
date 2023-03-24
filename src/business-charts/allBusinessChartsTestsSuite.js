// noinspection SpellCheckingInspection

import { total } from "../Kolibri/docs/src/kolibri/util/test.js";

//util tests
import "./util/functionsTest.js";
import "./util/geometryFunctionsTest.js";

// chart tests
import "./projector/chart/chartControllerTest.js";
import "./projector/chart/chartProjectorTest.js";
import "./projector/chart/advancedChartControllerTest.js";
import "./projector/chart/advancedChartProjectorTest.js";
import "./projector/chart/simpleChartControllerTest.js";
import "./projector/chart/simpleChartProjectorTest.js";

// axis control bar tests
import "./projector/axisControlBar/advancedXAxisControlBarProjectorTest.js";
import "./projector/axisControlBar/simpleAxisControlBarProjectorTest.js";

// axis control bar tests
import "./projector/axisLabelingBar/xAxisLabelingBarProjectorTest.js";
import "./projector/axisLabelingBar/yAxisLabelingBarProjectorTest.js";

// toolbar tests
import "./projector/toolBar/toolBarControllerTest.js";
import "./projector/toolBar/toolBarProjectorTest.js";
import "./projector/toolBar/tools/PanningToolTest.js";
import "./projector/toolBar/tools/RubberbandToolTest.js";
import "./projector/toolBar/tools/SelectionToolTest.js";
import "./projector/toolBar/tools/selectionToolTooltipProjectorTest.js";
import "./projector/toolBar/tools/ZoomInToolTest.js";
import "./projector/toolBar/tools/ZoomOutToolTest.js";

// data table view tests
import "./projector/dataTableView/dataTableViewControllerTest.js";
import "./projector/dataTableView/dataTableViewProjectorTest.js";

// simple detail view tests
import "./projector/simpleDetailView/simpleDetailViewProjectorTest.js";

total.onChange( value => document.getElementById('grossTotal').textContent = "" + value + " tests done.");