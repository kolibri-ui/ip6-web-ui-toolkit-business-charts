import {TestSuite}      from "../../Kolibri/docs/src/kolibri/util/test.js";
import {getNewPointPos} from "./functions.js";

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
chartSuite.add("from down left to up right, new point: down left",
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

chartSuite.add("from down left to up right, new point: up left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_LEFT",
            "CORNER_UP_RIGHT",
            0,
            -520,
            "CORNER_UP_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -10);
    });

chartSuite.add("from down left to up right, new point: down right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_LEFT",
            "CORNER_UP_RIGHT",
            0,
            -520,
            "CORNER_DOWN_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -510);
    });

chartSuite.add("from down left to up right, new point: up right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_LEFT",
            "CORNER_UP_RIGHT",
            0,
            -520,
            "CORNER_UP_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -10);
    });

//from up right to down left
chartSuite.add("from up right to down left, new point: up right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_RIGHT",
            "CORNER_DOWN_LEFT",
            520,
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

chartSuite.add("from up right to down left, new point: down right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_RIGHT",
            "CORNER_DOWN_LEFT",
            520,
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

chartSuite.add("from up right to down left, new point: up left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_RIGHT",
            "CORNER_DOWN_LEFT",
            520,
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

chartSuite.add("from up right to down left, new point: down left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_RIGHT",
            "CORNER_DOWN_LEFT",
            520,
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

//from down right to up left
chartSuite.add("from down right to up left, new point: down right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_RIGHT",
            "CORNER_UP_LEFT",
            520,
            -520,
            "CORNER_DOWN_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -510);
    });

chartSuite.add("from down right to up left, new point: up right",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_RIGHT",
            "CORNER_UP_LEFT",
            520,
            -520,
            "CORNER_UP_RIGHT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 510);
        assert.is(newPoint.newYPos, -10);
    });

chartSuite.add("from down right to up left, new point: down left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_RIGHT",
            "CORNER_UP_LEFT",
            520,
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

chartSuite.add("from down right to up left, new point: up left",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_DOWN_RIGHT",
            "CORNER_UP_LEFT",
            520,
            -520,
            "CORNER_UP_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(newPoint.newXPos, 10);
        assert.is(newPoint.newYPos, -10);
    });

//not allowed calculations
chartSuite.add("from corner and to corner has same values",
    assert => {
        const newPoint = getNewPointPos(
            "CORNER_UP_LEFT",
            "CORNER_UP_LEFT",
            520,
            -520,
            "CORNER_UP_LEFT",
            500,
            500,
            10,
            10
        );

        assert.is(isNaN(newPoint.newXPos), isNaN(NaN));
        assert.is(isNaN(newPoint.newYPos), isNaN(NaN));
    });

chartSuite.run();