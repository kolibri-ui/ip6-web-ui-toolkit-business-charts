import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import {
    canvasToDomainXY,
    domainToCanvasXY,
    pointCanvasToDomain,
    pointDomainToCanvas,
    xCanvasToDomain,
    xDomainToCanvas,
    yCanvasToDomain,
    yDomainToCanvas
} from "./geometryFunctions.js"

const chartFunctionsTestSuite = TestSuite("src/business-charts/utils/chartFunctions");

chartFunctionsTestSuite.add("xDomainToCanvas", assert => {
    const result = xDomainToCanvas(500, 0, 12, 6);

    assert.is(result, 250);
});

chartFunctionsTestSuite.add("yDomainToCanvas", assert => {
    const result = yDomainToCanvas(400, 0, 10, 5);

    assert.is(result, 200);
});

chartFunctionsTestSuite.add("xCanvasToDomain", assert => {
    const result = xCanvasToDomain(500, 0, 12, 250);

    assert.is(result, 6);
});

chartFunctionsTestSuite.add("yCanvasToDomain", assert => {
    const result = yCanvasToDomain(400, 0, 10, 200);

    assert.is(result, 5);
});

chartFunctionsTestSuite.add("pointDomainToCanvas", assert => {
    const result = pointDomainToCanvas(500, 400, 0, 12, 0, 10, { xValue: 6, yValue: 5 });

    assert.is(result.xValue, 250);
    assert.is(result.yValue, 200);
});

chartFunctionsTestSuite.add("pointCanvasToDomain", assert => {
    const result = pointCanvasToDomain(500, 400, 0, 12, 0, 10, { xValue: 250, yValue: 200 });

    assert.is(result.xValue, 6);
    assert.is(result.yValue, 5);
});

chartFunctionsTestSuite.add("domainToCanvas, positive and negative values", assert => {
    //canvas value of domain null point
    /** @type { CanvasPoint2D } */ const domainNullPoint = { xValue: 300, yValue: 200 };

    const xRatio = 20;
    const yRatio = 15;

    /** @type { DomainPoint2D } */ const newAllPositiveDomainPoint = { xValue: 10, yValue: 8 };
    const resultAllXYPositive                                      = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllPositiveDomainPoint);
    assert.is(resultAllXYPositive.xValue, 500);
    assert.is(resultAllXYPositive.yValue, 80);

    /** @type { DomainPoint2D } */ const newXNegativeDomainPoint = { xValue: -10, yValue: 8 };
    const resultXNegative                                        = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newXNegativeDomainPoint);
    assert.is(resultXNegative.xValue, 100);
    assert.is(resultXNegative.yValue, 80);

    /** @type { DomainPoint2D } */ const newYNegativeDomainPoint = { xValue: 10, yValue: -8 };
    const resultYNegative                                        = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newYNegativeDomainPoint);
    assert.is(resultYNegative.xValue, 500);
    assert.is(resultYNegative.yValue, 320);

    /** @type { DomainPoint2D } */ const newAllNegativeDomainPoint = { xValue: -10, yValue: -8 };
    const resultAllXYNegative                                      = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllNegativeDomainPoint);
    assert.is(resultAllXYNegative.xValue, 100);
    assert.is(resultAllXYNegative.yValue, 320);

    /** @type { DomainPoint2D } */ const newAllZeroDomainPoint = { xValue: 0, yValue: 0 };
    const resultAllZeroDomainPoint                             = domainToCanvasXY(domainNullPoint, xRatio, yRatio, newAllZeroDomainPoint);
    assert.is(resultAllZeroDomainPoint.xValue, 300);
    assert.is(resultAllZeroDomainPoint.yValue, 200);
});

chartFunctionsTestSuite.add("domainToCanvas, zero ratio, zero domain null point", assert => {
    //canvas value of domain null point
    /** @type { CanvasPoint2D } */ const domainNullPoint = { xValue: 300, yValue: 200 };

    const xRatio = 20;
    const yRatio = 15;

    //no ratio
    /** @type { CanvasPoint2D } */ const newDomainPoint = { xValue: 10, yValue: 8 };
    const resultNullRatio                               = domainToCanvasXY(domainNullPoint, 0, 0, newDomainPoint);
    assert.is(resultNullRatio.xValue, 300);
    assert.is(resultNullRatio.yValue, 200);

    //tests with domain null point 0,0
    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    const resultDomainPoint                                  = domainToCanvasXY(domainNullZeroPoint, xRatio, yRatio, newDomainPoint);
    assert.is(resultDomainPoint.xValue, 200);
    assert.is(resultDomainPoint.yValue, -120);
});

chartFunctionsTestSuite.add("domainToCanvas, tests of positive and negative ratio", assert => {
    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    /** @type { CanvasPoint2D } */ const newDomainPoint      = { xValue: 10, yValue: 8 };
    const xRatio                                             = 20;
    const yRatio                                             = 15;

    const resultDomainPoint = domainToCanvasXY(domainNullZeroPoint, xRatio, yRatio, newDomainPoint);
    assert.is(resultDomainPoint.xValue, 200);
    assert.is(resultDomainPoint.yValue, -120);

    //negative ratio
    const resultAllRatio = domainToCanvasXY(domainNullZeroPoint, -1, -1, newDomainPoint);
    assert.is(resultAllRatio.xValue, -10);
    assert.is(resultAllRatio.yValue, 8);

    //neutral ratio
    /** @type { CanvasPoint2D } */ const newDomainPoint1 = { xValue: 10, yValue: 8 };
    const resultOrigin1                                  = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint1);
    assert.is(resultOrigin1.xValue, 10);
    assert.is(resultOrigin1.yValue, -8);

    /** @type { CanvasPoint2D } */ const newDomainPoint2 = { xValue: 20, yValue: 8 };
    const resultOrigin2                                  = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint2);
    assert.is(resultOrigin2.xValue, 20);
    assert.is(resultOrigin2.yValue, -8);

    /** @type { CanvasPoint2D } */ const newDomainPoint3 = { xValue: 10, yValue: 0 };
    const resultOrigin3                                  = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint3);
    assert.is(resultOrigin3.xValue, 10);
    assert.is(resultOrigin3.yValue, 0);

    /** @type { CanvasPoint2D } */ const newDomainPoint4 = { xValue: 20, yValue: 0 };
    const resultOrigin4                                  = domainToCanvasXY(domainNullZeroPoint, 1, 1, newDomainPoint4);
    assert.is(resultOrigin4.xValue, 20);
    assert.is(resultOrigin4.yValue, 0);
});

chartFunctionsTestSuite.add("canvasToDomain, domain zero point is in the center of grid", assert => {
    /** @type { CanvasPoint2D } */ const domainNullPoint = { xValue: -2, yValue: 1 };

    const xRatio = 2;
    const yRatio = -3;

    /** @type { CanvasPoint2D } */ const newAllPositiveCanvasPoint = { xValue: 2, yValue: 4 };
    const resultAllXYPositive                                      = canvasToDomainXY(domainNullPoint, xRatio, yRatio, newAllPositiveCanvasPoint);
    assert.is(resultAllXYPositive.xValue, 2);
    assert.is(resultAllXYPositive.yValue, 1);

    /** @type { CanvasPoint2D } */ const newXNegativeCanvasPoint = { xValue: -6, yValue: 4 };
    const resultXNegative                                        = canvasToDomainXY(domainNullPoint, xRatio, yRatio, newXNegativeCanvasPoint);
    assert.is(resultXNegative.xValue, -2);
    assert.is(resultXNegative.yValue, 1);

    /** @type { CanvasPoint2D } */ const newYNegativeCanvasPoint = { xValue: 2, yValue: -2 };
    const resultYNegative                                        = canvasToDomainXY(domainNullPoint, xRatio, yRatio, newYNegativeCanvasPoint);
    assert.is(resultYNegative.xValue, 2);
    assert.is(resultYNegative.yValue, -1);

    /** @type { CanvasPoint2D } */ const newAllNegativeCanvasPoint = { xValue: -6, yValue: -2 };
    const resultAllXYNegative                                      = canvasToDomainXY(domainNullPoint, xRatio, yRatio, newAllNegativeCanvasPoint);
    assert.is(resultAllXYNegative.xValue, -2);
    assert.is(resultAllXYNegative.yValue, -1);
});

chartFunctionsTestSuite.add("canvasToDomain, rectangle is not mirror-inverted", assert => {
    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    const newCanvasPoint1                                    = { xValue: 10, yValue: -8 };
    const resultPoint1                                       = canvasToDomainXY(domainNullZeroPoint, 1, 1, newCanvasPoint1);
    assert.is(resultPoint1.xValue, 10);
    assert.is(resultPoint1.yValue, 8);

    const newCanvasPoint2 = { xValue: 20, yValue: -8 };
    const resultPoint2    = canvasToDomainXY(domainNullZeroPoint, 1, 1, newCanvasPoint2);
    assert.is(resultPoint2.xValue, 20);
    assert.is(resultPoint2.yValue, 8);

    const newCanvasPoint3 = { xValue: 10, yValue: 0 };
    const resultPoint3    = canvasToDomainXY(domainNullZeroPoint, 1, 1, newCanvasPoint3);
    assert.is(resultPoint3.xValue, 10);
    assert.is(resultPoint3.yValue, 0);

    const newCanvasPoint4 = { xValue: 20, yValue: 0 };
    const resultPoint4    = canvasToDomainXY(domainNullZeroPoint, 1, 1, newCanvasPoint4);
    assert.is(resultPoint4.xValue, 20);
    assert.is(resultPoint4.yValue, 0);
});

chartFunctionsTestSuite.add("canvasToDomain, tests of positive and negative ratio", assert => {
    /** @type { CanvasPoint2D } */ const domainNullZeroPoint = { xValue: 0, yValue: 0 };
    /** @type { CanvasPoint2D } */ const newCanvasPoint      = { xValue: -20, yValue: 8 };

    const resultAllRatioPositive = canvasToDomainXY(domainNullZeroPoint, 1, 1, newCanvasPoint);
    assert.is(resultAllRatioPositive.xValue, -20);
    assert.is(resultAllRatioPositive.yValue, -8);

    const resultAllRatioNegative = canvasToDomainXY(domainNullZeroPoint, -1, -1, newCanvasPoint);
    assert.is(resultAllRatioNegative.xValue, 20);
    assert.is(resultAllRatioNegative.yValue, 8);

    const resultXRatioNegative = canvasToDomainXY(domainNullZeroPoint, -1, 1, newCanvasPoint);
    assert.is(resultXRatioNegative.xValue, 20);
    assert.is(resultXRatioNegative.yValue, -8);

    const resultYRatioNegative = canvasToDomainXY(domainNullZeroPoint, 1, -1, newCanvasPoint);
    assert.is(resultYRatioNegative.xValue, -20);
    assert.is(resultYRatioNegative.yValue, 8);
});

chartFunctionsTestSuite.run();