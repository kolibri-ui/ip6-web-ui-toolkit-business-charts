import {TestSuite} from "../../Kolibri/docs/src/kolibri/util/test.js";
import {getNewZeroPosition} from "./chart.js";

const chartSuite = TestSuite("business-charts/util/chart");

chartSuite.add("from up left to down right, new point: down left",
    assert => {
        const newPoint = getNewZeroPosition(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "SEC_HORIZONTAL_DOWN",
            "SEC_VERTICAL_LEFT",
            0,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -510);
    });

chartSuite.add("from up left to down right, new point: up left",
    assert => {
        const newPoint = getNewZeroPosition(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "SEC_HORIZONTAL_UP",
            "SEC_VERTICAL_LEFT",
            0,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -10);
    });

chartSuite.run();