import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import { getNewZeroPosition, CORNER, SEC_HORIZONTAL, SEC_VERTICAL } from "./chart.js";

const chartSuite = TestSuite("business-charts/util/chart");

chartSuite.add("origin point: upper left, drawing section: down right, new point pos: down left",
        assert => {
    const newPoint = getNewZeroPosition(
        CORNER.UP_LEFT,
        CORNER.DOWN_RIGHT,
        0,
        0,
        SEC_HORIZONTAL.UP,
        SEC_VERTICAL.LEFT,
        0,
        500,
        10,
        10
    );
    
    assert.is(newPoint.newXPos, 10);
    assert.is(newPoint.newYPos, -515);
});

chartSuite.add("origin: up left, drawing down right, destination: up right", 
    assert => {
    const newP = getNewZeroPosition(
        CORNER.UP_LEFT,
        CORNER.DOWN_RIGHT,
        0,
        0,
        SEC_HORIZONTAL.DOWN,
        SEC_VERTICAL.RIGHT,
        500,
        500,
        10,
        10
    )
        assert.is(newP.newXPos, 510);
        assert.is(newP.newYPos, -10);
    
    });

chartSuite.run();