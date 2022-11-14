import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotChart } from "./simpleScatterplotChart.js";

const simpleScatterplotChartSuite = TestSuite("src/business-charts/projector/simpleScatterplotChart");

simpleScatterplotChartSuite.add("has the right parameters", assert => {
    const simpleBarChart = SimpleScatterplotChart;
    assert.is(simpleBarChart.data, 1);

});

simpleScatterplotChartSuite.add("simple bar chart", assert => {

});

simpleScatterplotChartSuite.run();