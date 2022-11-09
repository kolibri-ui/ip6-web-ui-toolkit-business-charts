import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import { getNewZeroPosition, corner, sectionHorizontal, sectionVertical } from "./chart.js";

const chartSuite = TestSuite("business-charts/util/chart");

chartSuite.add("origin point: upper left, drawing section: down right, new point pos: down left",
        assert => {
    const newPoint = getNewZeroPosition(
        corner.UP_LEFT,
        corner.DOWN_RIGHT,
        0,
        0,
        sectionHorizontal.SEC_HOR_DOWN,
        sectionVertical.SEC_VER_LEFT,
        0,
        500,
        10,
        10,
    );
    
    assert.is(newPoint.newXPos, 10);
    assert.is(newPoint.newYPos, -515);
});

chartSuite.run();