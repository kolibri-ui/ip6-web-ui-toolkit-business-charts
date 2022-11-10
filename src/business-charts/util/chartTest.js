import {TestSuite} from "../../Kolibri/docs/src/kolibri/util/test.js";
import { getNewPointPos } from "./chart.js";

const chartSuite = TestSuite("business-charts/util/chart");

//from up left to down right
chartSuite.add("from up left to down right, new point: up left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "CORNER_UP_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -10);
    });

chartSuite.add("from up left to down right, new point: down left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "CORNER_DOWN_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -510);
    });

chartSuite.add("from up left to down right, new point: up right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "CORNER_UP_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -10);
    });

chartSuite.add("from up left to down right, new point: down right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_LEFT",
            "CORNER_DOWN_RIGHT",
            0,
            0,
            "CORNER_DOWN_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -510);
    });

//from down left to up right
chartSuite.add("from up left to down right, new point: down left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_LEFT",
            "CORNER_UP_RIGHT",
            0,
            -520,
            "CORNER_DOWN_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -510);
    });


chartSuite.run();