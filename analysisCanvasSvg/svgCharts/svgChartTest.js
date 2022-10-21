import { TestSuite } from "../../src/Kolibri/docs/src/kolibri/util/test.js";

const svgChartSuite = TestSuite("svgChart.js");

svgChartSuite.add("get data", assert => {
    const svgChart = document.getElementById("div");
});

svgChartSuite.run();