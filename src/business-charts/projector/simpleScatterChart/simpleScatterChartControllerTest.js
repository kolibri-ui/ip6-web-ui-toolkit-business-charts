import { TestSuite }                    from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterChartController } from "./simpleScatterChartController.js";

const SimpleScatterChartControllerSuite = TestSuite("SCC: src/business-charts/projector/simpleScatterChartController");

SimpleScatterChartControllerSuite.add("SCC: options and data change scatter chart", assert => {
    /** @type { Array.<ScatterChartDataElement> } */
    const data = [
        { name: "A", xValue: 4, yValue: -4 }, 
        { name: "B", xValue: 88, yValue: -88 } 
    ];
    
    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const options = { xEvery, yEvery, drawOuterTicks };
    
    const controller     = SimpleScatterChartController(
        data, options);

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
SimpleScatterChartControllerSuite.add("SCC: xMin, xMax, yMin, yMax", assert => {
    /** @type { Array.<ScatterChartDataElement> } */ const data = [ {
        name: 'A', xValue: 0, yValue: 8,
    }, {
        name: 'B', xValue: 1, yValue: 10,
    }, {
        name: 'C', xValue: 0, yValue: 155,
    }, {
        name: 'D', xValue: 2, yValue: -30,
    }, {
        name: 'E', xValue: -3, yValue: 22,
    }, {
        name: 'F', xValue: 18, yValue: 15,
    }, {
        name: 'g', xValue: 13, yValue: 99,
    },
    ];

    const controller = SimpleScatterChartController(data);

    /** @type { Array<ScatterChartDataElement> } */
    const dataArray = [];
    const xMin = controller.xMin.getValue();
    const xMax = controller.xMax.getValue();
    const yMin = controller.yMin.getValue();
    const yMax = controller.yMax.getValue();

    for (let i = 0; i < data.length; i++) {
        dataArray.push({
            name: data[i].name,
            xValue: data[i].xValue,
            yValue: data[i].yValue
        })
    }

    assert.is(xMin, -4); //xMin -1
    assert.is(xMax, 19); //xMax +1
    assert.is(yMin, -31); //yMin -1
    assert.is(yMax, 156); //yMax +1

    controller.setData(dataArray);

    assert.is(controller.getData().at(0).xValue, 0); // first xValue
    assert.is(controller.getData().at(0).yValue, 8); // first yValue
    assert.is(controller.getData().reverse().at(0).xValue, 13); // last xValue
    assert.is(controller.getData().at(0).yValue, 99); //last yValue
    assert.is(controller.getData().reverse().at(0).name, "A");
    assert.is(controller.getData().reverse().at(0).name, "g");
    assert.is(controller.getData().reverse().at(1).name, "B");
    assert.is(controller.getOptions().xEvery, 1); //default value
    assert.is(controller.getOptions().xEvery, 1); //default value
    assert.is(controller.getOptions().drawOuterTicks, true); //default value

    assert.is(controller.xMin.getValue(), -4); //xMin -1
    assert.is(controller.xMax.getValue(), 19); //xMax +1
    assert.is(controller.yMin.getValue(), -31); //yMin -1
    assert.is(controller.yMax.getValue(), 156); //yMax +1

});
SimpleScatterChartControllerSuite.run();