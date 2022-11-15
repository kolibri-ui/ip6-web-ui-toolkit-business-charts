import { TestSuite }      from "../../Kolibri/docs/src/kolibri/util/test.js";
import { canvasToDomainXY, domainToCanvasXY } from "./chartFunctions.js"

const chartFunctionsTestSuite = TestSuite("src/business-charts/utils/chartFunctions");

chartFunctionsTestSuite.add("domainToCanvas", assert => {
    //canvas value of domain null point
    /** @type { CanvasPoint2D } */ const domainNullPoint = { xValue: 300, yValue: 200 };
    
    const xRatio = 20;
    const yRatio = 15;

/*    /!** @type { DomainPoint2D } *!/ const newAllPositiveDomainPoint = { xValue: 10, yValue: 8 }
    const resultAllXYPositive = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllPositiveDomainPoint);
    assert.is(resultAllXYPositive.xValue, 500);
    assert.is(resultAllXYPositive.yValue, 80);

    /!** @type { DomainPoint2D } *!/ const newXNegativeDomainPoint = { xValue: -10, yValue: 8 }
    const resultXNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newXNegativeDomainPoint);
    assert.is(resultXNegative.xValue, 100);
    assert.is(resultXNegative.yValue, 80);

    /!** @type { DomainPoint2D } *!/ const newYNegativeDomainPoint = { xValue: 10, yValue: -8 }
    const resultYNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newYNegativeDomainPoint);
    assert.is(resultYNegative.xValue, 500);
    assert.is(resultYNegative.yValue, 320);

    /!** @type { DomainPoint2D } *!/ const newAllNegativeDomainPoint = { xValue: -10, yValue: -8 }
    const resultAllXYNegative = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllNegativeDomainPoint);
    assert.is(resultAllXYNegative.xValue, 100);
    assert.is(resultAllXYNegative.yValue, 320);

    /!** @type { DomainPoint2D } *!/ const newAllZeroDomainPoint = { xValue: 0, yValue: 0 }
    const resultAllZeroDomainPoint = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllZeroDomainPoint);
    assert.is(resultAllZeroDomainPoint.xValue, 300);
    assert.is(resultAllZeroDomainPoint.yValue, 200);

    //tests with domain null point 0,0
    /!** @type { CanvasPoint2D } *!/ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    
    /!** @type { CanvasPoint2D } *!/ const newDomainPoint = { xValue: 10, yValue: 8 }
    const resultDomainPoint = domainToCanvasXY(domainNullZeroPoint, xRatio, yRatio, newDomainPoint);
    assert.is(resultDomainPoint.xValue, 200);
    assert.is(resultDomainPoint.yValue, -120);
    
    //no ratio
    const resultNullRatio = domainToCanvasXY(domainNullPoint, 0, 0, newDomainPoint);
    assert.is(resultNullRatio.xValue, 300);
    assert.is(resultNullRatio.yValue, 200);
    
    //negative ratio
    const resultAllRatio = domainToCanvasXY(domainNullZeroPoint, -1, -1, newDomainPoint);
    assert.is(resultAllRatio.xValue, -10);
    assert.is(resultAllRatio.yValue, 8);*/

    //neutral ratio
    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    /** @type { CanvasPoint2D } */ const newDomainPoint1 = { xValue: 10, yValue: 8 }
    const resultOrigin1 = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint1);
    assert.is(resultOrigin1.xValue, 10);
    assert.is(resultOrigin1.yValue, -8);

    /** @type { CanvasPoint2D } */ const newDomainPoint2 = { xValue: 20, yValue: 8 }
    const resultOrigin2 = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint2);
    assert.is(resultOrigin2.xValue, 20);
    assert.is(resultOrigin2.yValue, -8);

    /** @type { CanvasPoint2D } */ const newDomainPoint3 = { xValue: 10, yValue: 0 }
    const resultOrigin3 = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint3);
    assert.is(resultOrigin3.xValue, 10);
    assert.is(resultOrigin3.yValue, -16);

    /** @type { CanvasPoint2D } */ const newDomainPoint4 = { xValue: 20, yValue: 0 }
    const resultOrigin4 = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint4);
    assert.is(resultOrigin4.xValue, 20);
    assert.is(resultOrigin4.yValue, -16);
});

chartFunctionsTestSuite.add("canvasToDomain", assert => {
    
});


chartFunctionsTestSuite.run();

