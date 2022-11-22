import { TestSuite } from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotController }            from "./simpleScatterplotChartController.js";

const SimpleScatterplotControllerSuite = TestSuite("src/business-charts/projector/simpleScatterplotChartController");

SimpleScatterplotControllerSuite.add("small", assert => {
    const controller = SimpleScatterplotController(
        { name: "A", xValue: 4, yValue: -4
        },
        { data: this.data, xRatio: 10, yRatio: 20
        },
    )
});

SimpleScatterplotControllerSuite.run();