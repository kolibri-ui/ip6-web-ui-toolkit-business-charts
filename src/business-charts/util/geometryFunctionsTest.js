import { TestSuite } from "../../Kolibri/docs/src/kolibri/util/test.js";
import {
    pointCanvasToDomain,
    pointDomainToCanvas,
    xCanvasToDomain,
    xDomainToCanvas,
    yCanvasToDomain,
    yDomainToCanvas
}                    from "./geometryFunctions.js"

const geometryFunctionsTestSuite = TestSuite("src/business-charts/utils/geometryFunctions");

geometryFunctionsTestSuite.add("xDomainToCanvas", assert => {
    const result = xDomainToCanvas(500, 0, 12, 6);

    assert.is(result, 250);
});

geometryFunctionsTestSuite.add("yDomainToCanvas", assert => {
    const result = yDomainToCanvas(400, 0, 10, 5);

    assert.is(result, 200);
});

geometryFunctionsTestSuite.add("xCanvasToDomain", assert => {
    const result = xCanvasToDomain(500, 0, 12, 250);

    assert.is(result, 6);
});

geometryFunctionsTestSuite.add("yCanvasToDomain", assert => {
    const result = yCanvasToDomain(400, 0, 10, 200);

    assert.is(result, 5);
});

geometryFunctionsTestSuite.add("pointDomainToCanvas", assert => {
    const result = pointDomainToCanvas(
        500,
        400,
        {
            xValue: 0,
            yValue: 0,
        }, {
            xValue: 12,
            yValue: 10,
        },
        { xValue: 6, yValue: 5 });

    assert.is(result.xValue, 250);
    assert.is(result.yValue, 200);
});

geometryFunctionsTestSuite.add("pointCanvasToDomain", assert => {
    const result = pointCanvasToDomain(500, 400, { xValue: 0, yValue: 0 }, { xValue: 12, yValue: 10 }, {
        xValue: 250,
        yValue: 200
    });

    assert.is(result.xValue, 6);
    assert.is(result.yValue, 5);
});

geometryFunctionsTestSuite.run();