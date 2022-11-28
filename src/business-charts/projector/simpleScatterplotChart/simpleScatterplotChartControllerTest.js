import { TestSuite } from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotController }            from "./simpleScatterplotChartController.js";

const SimpleScatterplotControllerSuite = TestSuite("src/business-charts/projector/simpleScatterplotChartController");

/*
   Tests that the x and y ratios must change when
      - the canvas changes its width or height (in px)
      - the x or y-axis changes its lower or upper bound
   and any observer of these ratios gets notified.
 */
SimpleScatterplotControllerSuite.add("value change", assert => {
    const data = [{ name: "A", xValue: 4, yValue: -4
          }
          ];
    const xRatio = 10;
    const yRatio = 20;
    const options = { data, xRatio, yRatio };
    const controller = SimpleScatterplotController(
        data, options);

    assert.is(controller.getXRatio(), 10);
    assert.is(controller.getYRatio(), 20);

    let found = false;
    controller.onXRatioChanged( () => found = true );
    assert.is(found, true);

    found = false;
    controller.setXRatio(55);
    assert.is(controller.getXRatio(), 55);
    assert.is(found, true);
});

SimpleScatterplotControllerSuite.add("data change", assert => {
    const data = [{ name: "A", xValue: 4, yValue: -4
    }
    ];
    const xRatio = 10;
    const yRatio = 20;
    const options = { data, xRatio, yRatio };
    const controller = SimpleScatterplotController(
        data, options);

    //TODO asserts schreiben für change auf den Daten: brauchen wir das? Wir ändern die init-Daten nicht...
    assert.is(controller.getData(), data); //das stimmt wahrscheinlich nicht...

    let found = false;
    controller.onFilteredDataChanged( () => found = true );
    assert.is(found, true);

    found = false;
    controller.setFilteredData(55);
    assert.is(controller.getData(), 55); //das stimmt wahrscheinlich nicht...
    assert.is(found, true);
});




SimpleScatterplotControllerSuite.run();
