import { TestSuite } from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChartController, DataModel, LineChartOptionsModel } from "./simpleLineChartController.js";
import {
    SimpleFormController
} from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleFormController.js";
import {
    SimpleInputController
} from "../../../Kolibri/docs/src/kolibri/projector/simpleForm/simpleInputController.js";
import {
    VALUE
} from "../../../Kolibri/docs/src/kolibri/presentationModel.js";

const SimpleLineChartControllerTestSuite = TestSuite("src/business-charts/projector/simpleLineChartController");

SimpleLineChartControllerTestSuite.add("controller test example", assert => {

    const controller = SimpleFormController([
        {value: "Dierk", type: "text"  },
        {value: 0,       type: "number"},
    ]);
    const [nameController, lengthController] = controller;
    //
    // // example "business rule": the number value must always follow the length the name
    nameController.onValueChanged( val => lengthController.setValue(val.length));
    //
    // // assert the effect of the binding
    // assert.is(lengthController.getValue(), "Dierk".length);
    // nameController.setValue("");
    // assert.is(lengthController.getValue(), "".length);

});

SimpleLineChartControllerTestSuite.add("getData and getOptions work", assert => {
    /** @type { Array.<LineChartDataElement> } */ const data = [{
        name: 'A', xValue: -1, yValue: -33,
    }, {
        name: 'B', xValue: 0, yValue: 10,
    }, {
        name: 'C', xValue: 1, yValue: 55,
    }, {
        name: 'D', xValue: 2, yValue: 30,
    }, {
        name: 'E', xValue: 3, yValue: 0,
    }, {
        name: 'F', xValue: 4, yValue: 50,
    }, {
        name: 'g', xValue: 5, yValue: 99,
    },
    ];
    
    const controller = SimpleLineChartController(data);
    assert.is(controller.getData().at(0).xValue, -1);
    assert.is(controller.getData().at(0).yValue, 99);
    assert.is(controller.getData().reverse().at(0).xValue, 5);
    assert.is(controller.getData().at(0).yValue, -33);
    assert.is(controller.getData().reverse().at(0).name, "A");
    assert.is(controller.getData().reverse().at(0).name, "g");
    assert.is(controller.getData().reverse().at(1).name, "B");
    assert.is(controller.getOptions().xEvery, 1); //default data
    assert.is(controller.getOptions().xEvery, 1); //default data
    assert.is(controller.getOptions().drawOuterTicks, true);

    assert.is(controller.xMin.getValue(), -1);
    assert.is(controller.xMax.getValue(), 5);
    assert.is(controller.yMin.getValue(), -33);
    assert.is(controller.yMax.getValue(), 99);
    
    
});

SimpleLineChartControllerTestSuite.run();