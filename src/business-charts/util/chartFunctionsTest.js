import { TestSuite }      from "../../Kolibri/docs/src/kolibri/util/test.js";
import { canvasToDomainXY, domainToCanvasXY } from "./chartFunctions.js"

const chartFunctionsTestSuite = TestSuite("src/business-charts/utils/chartFunctions");

chartFunctionsTestSuite.add("domainToCanvas", assert => {
    /** @type { CanvasPoint2D } */ const domainNullPoint = { xValue: 300, yValue: 200 };
    const xRatio = 20;
    const yRatio = 15;

    /** @type { DomainPoint2D } */ const newAllPositiveDomainPoint = { xValue: 10, yValue: 8 }
    const resultAllXYPositive = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllPositiveDomainPoint);
    assert.is(resultAllXYPositive.xValue, 500);
    assert.is(resultAllXYPositive.yValue, 80);

    /** @type { DomainPoint2D } */ const newXNegativeDomainPoint = { xValue: -10, yValue: 8 }
    const resultXNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newXNegativeDomainPoint);
    assert.is(resultXNegative.xValue, 100);
    assert.is(resultXNegative.yValue, 80);

    /** @type { DomainPoint2D } */ const newYNegativeDomainPoint = { xValue: 10, yValue: -8 }
    const resultYNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newYNegativeDomainPoint);
    assert.is(resultYNegative.xValue, 500);
    assert.is(resultYNegative.yValue, 320);

    /** @type { DomainPoint2D } */ const newAllNegativeDomainPoint = { xValue: -10, yValue: -8 }
    const resultAllXYNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllNegativeDomainPoint);
    assert.is(resultAllXYNegative.xValue, 100);
    assert.is(resultAllXYNegative.yValue, 320);

    /** @type { DomainPoint2D } */ const newAllZeroDomainPoint = { xValue: 0, yValue: 0 }
    const resultAllZeroDomainPoint = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllZeroDomainPoint);
    assert.is(resultAllZeroDomainPoint.xValue, 300);
    assert.is(resultAllZeroDomainPoint.yValue, 200);

    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    
    /** @type { DomainPoint2D } */ const newDomainPoint = { xValue: 10, yValue: 8 }
    const resultDomainPoint = domainToCanvasXY(domainNullZeroPoint, xRatio, yRatio, newDomainPoint);
    assert.is(resultDomainPoint.xValue, 200);
    assert.is(resultDomainPoint.yValue, -120);
    
    //TODO handle xRatio = 0
    //TODO handle yRatio = 0

})


chartFunctionsTestSuite.run();

