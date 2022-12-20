import { TestSuite }                   from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChartController } from "./simpleLineChartController.js";

const SimpleLineChartControllerTestSuite = TestSuite("src/business-charts/projector/simpleLineChartController");

SimpleLineChartControllerTestSuite.add("controller changes", assert => {

    const data           = [{ name: "A", xValue: 4, yValue: -4 }, { name: "B", xValue: 88, yValue: -88 } ];
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const size    = 32;
    const color = "#000000";
    const options = { xEvery, yEvery, drawOuterTicks };

    const controller = SimpleLineChartController(
        data, options, size, color
    );

});

SimpleLineChartControllerTestSuite.run();