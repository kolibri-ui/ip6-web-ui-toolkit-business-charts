import { TestSuite }                   from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotController } from "./simpleScatterplotChartController.js";

const SimpleScatterplotControllerSuite = TestSuite("src/business-charts/projector/simpleScatterplotChartController");


SimpleScatterplotControllerSuite.add("controller changes", assert => {
    
    const data           = [{ name: "A", xValue: 4, yValue: -4 }, { name: "B", xValue: 88, yValue: -88 } ];
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const size    = 32;
    const color = "#000000";
    const options = { xEvery, yEvery, drawOuterTicks };
    
    const controller     = SimpleScatterplotController(
        data, options, size, color);

    // //check that pointSize change works
    // let foundPointSize = false;
    // controller.onPointSizeChanged( () => foundPointSize = true );
    // assert.is(foundPointSize, true);
    // assert.is(controller.getPointSize().valueOf(), 3); //default value
    // size = controller.setPointSize(66);
    // assert.is(controller.getPointSize(), 66);
    //
    // //check that color change works
    // let foundColor = false;
    // controller.onColorChanged( () => foundColor = true);
    // assert.is(foundColor, true);
    // assert.is(controller.getColor(), "#a55ca5"); //default value
    // color = controller.setColor("#BDBDBD");
    // assert.is(controller.getColor(), "#BDBDBD");

    //check that data values are set
    let foundData = false;
    controller.onDataChanged( () => foundData = true );
    assert.is(foundData, true);
    assert.is(controller.getOptions().xEvery, 10);
    assert.is(controller.getOptions().yEvery, 20);
    assert.is(controller.getOptions().drawOuterTicks, false);

    assert.is(controller.getData().at(1).name, "B");
    assert.is(controller.getData().at(1).xValue, 88);
    assert.is(controller.getData().at(1).yValue, -88);
});


/*
 Tests that the x and y ratios must change when
 - the canvas changes its width or height (in px)
 - the x or y-axis changes its lower or upper bound
 and any observer of these ratios gets notified.
 */

// SimpleScatterplotControllerSuite.add("data change", assert => {
//     const data = [{ name: "A", xValue: 4, yValue: -4
//     }
//     ];
//     const xRatio = 10;
//     const yRatio = 20;
//     const options = { data, xRatio, yRatio };
//     const controller = SimpleScatterplotController(
//         data, options);
//
//     let found = false;
//     controller.onFilteredDataChanged( () => found = true );
//     assert.is(found, true);
//
//     found = false;
//     controller.setFilteredData(55);
//     assert.is(controller.getData(), 55); //das stimmt wahrscheinlich nicht...
//     assert.is(found, true);
// });

SimpleScatterplotControllerSuite.run();
