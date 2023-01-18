import { TestSuite }                   from "../../../Kolibri/docs/src/kolibri/util/test.js";
import { SimpleLineChartController }   from "./simpleLineChartController.js";

const SimpleLineChartControllerTestSuite = TestSuite("LCC: src/business-charts/projector/simpleLineChartController");

SimpleLineChartControllerTestSuite.add("LCC: options and data change line chart", assert => {
    /** @type { Array.<LineChartDataElement> } */
    const data = [
        { name: "A", xValue: 88, yValue: -4 },
        { name: "B", xValue: 0, yValue: -88 }
    ];

    const xEvery         = 10;
    const yEvery         = 20;
    const drawOuterTicks = false;
    const options = { xEvery, yEvery, drawOuterTicks };

    const controller     = SimpleLineChartController(
        data, options);
    
    assert.is(data.length, 2);

    //check that data values are set correctly
    let foundData = false;
    controller.onDataChanged( () => foundData = true );
    assert.is(foundData, true);
    
    assert.is(controller.getOptions().xEvery, 10);
    assert.is(controller.getOptions().yEvery, 20);
    assert.is(controller.getOptions().drawOuterTicks, false);

    assert.is(controller.getData().at(0).name, "A");
    assert.is(controller.getData().at(0).xValue, 88);
    assert.is(controller.getData().at(0).yValue, -4);

    assert.is(controller.getData().at(1).name, "B");
    assert.is(controller.getData().at(1).xValue, 0);
    assert.is(controller.getData().at(1).yValue, -88);

    //check that the controller sets the minimum and maximum values correctly
    //first y-value array entry is yMin
    assert.is(controller.xMin.getValue(), 0); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 88);
    assert.is(controller.yMin.getValue(), -88); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), -4);

});
SimpleLineChartControllerTestSuite.add("LCC: first data entry is min value, last data entry is max value", assert => {
    /** @type { Array.<LineChartDataElement> } */
    const data = [
        { name: "A", xValue: -55, yValue: -4 },
        { name: "B", xValue: 0,   yValue: -2 },
        { name: "C", xValue: 0,  yValue: -1 }
    ];

    const controller     = SimpleLineChartController(
        data);

    assert.is(data.length, 3);

    assert.is(controller.xMin.getValue(), -55); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 0);
    assert.is(controller.yMin.getValue(), -4); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), -1);

});

SimpleLineChartControllerTestSuite.add("LCC: first data entry is max value, last data entry is min value", assert => {
    /** @type { Array.<LineChartDataElement> } */
    const data = [
        { name: "A", xValue: 0, yValue: 0 },
        { name: "B", xValue: -1, yValue: -1 },
        { name: "C", xValue: -2,  yValue: -1 }
    ];

    const controller     = SimpleLineChartController(
        data);

    assert.is(data.length, 3);

    assert.is(controller.xMin.getValue(), -2); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 0);
    assert.is(controller.yMin.getValue(), -1); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), 0);

});

SimpleLineChartControllerTestSuite.add("LCC: min max with negative values", assert => {
    /** @type { Array.<LineChartDataElement> } */ const data = [{
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
    
    const controller = SimpleLineChartController(data);

    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];

    for (let i = 0; i < data.length; i++) {
        dataArray.push({
            name: data[i].name,
            xValue: data[i].xValue,
            yValue: data[i].yValue
        })
    }
    
    controller.setData(dataArray);
    assert.is(dataArray.length, 7);

    //test border values, test initial values
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

    //check that the controller sets the minimum and maximum values correctly
    assert.is(controller.xMin.getValue(), -3); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 18);
    assert.is(controller.yMin.getValue(), -30); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), 155);
});
SimpleLineChartControllerTestSuite.add("LCC: min max boundaries: all x-values = 0, all y-values = -1", assert => {
    /** @type { Array.<LineChartDataElement> } */ const data = [{
        name: 'A', xValue: 0, yValue: -1, }, {
        name: 'B', xValue: 0, yValue: -1, }, {
        name: 'C', xValue: 0, yValue: -1, }, 
    ];

    const controller = SimpleLineChartController(data);

    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];

    for (let i = 0; i < data.length; i++) {
        dataArray.push({
            name: data[i].name,
            xValue: data[i].xValue,
            yValue: data[i].yValue
        })
    }

    controller.setData(dataArray);
    assert.is(dataArray.length, 3);

    //check that the controller sets the minimum and maximum values correctly
    assert.is(controller.xMin.getValue(), -1); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 1); //controller sets +1 if xMin == xMax
    assert.is(controller.yMin.getValue(), -2); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), 0); //controller sets +1 if yMin == yMax
});
SimpleLineChartControllerTestSuite.add("LCC: min max boundaries: all x-values = -1, all y-values = 0", assert => {
    /** @type { Array.<LineChartDataElement> } */ const data = [{
        name: 'A', xValue: -1, yValue: 0, }, {
        name: 'B', xValue: -1, yValue: 0, }, {
        name: 'C', xValue: -1, yValue: 0, }, 
    ];

    const controller = SimpleLineChartController(data);

    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];

    for (let i = 0; i < data.length; i++) {
        dataArray.push({
            name: data[i].name,
            xValue: data[i].xValue,
            yValue: data[i].yValue
        })
    }

    controller.setData(dataArray);
    assert.is(dataArray.length, 3);

    //check that the controller sets the minimum and maximum values correctly
    assert.is(controller.xMin.getValue(), -2); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), 0); //controller sets +1 if the x-values are the same
    assert.is(controller.yMin.getValue(), -1); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), 1);
});

SimpleLineChartControllerTestSuite.add("LCC: min max for 1 point", assert => {
    /** @type { Array.<LineChartDataElement> } */ const data = [{
        name: 'A', xValue: -10, yValue: 20, }
    ];

    const controller = SimpleLineChartController(data);

    /** @type { Array<LineChartDataElement> } */
    const dataArray = [];

    for (let i = 0; i < data.length; i++) {
        dataArray.push({
            name: data[i].name,
            xValue: data[i].xValue,
            yValue: data[i].yValue
        })
    }

    controller.setData(dataArray);
    assert.is(dataArray.length, 1);

    //check that the controller sets the minimum and maximum values correctly
    assert.is(controller.xMin.getValue(), -11); //controller handles negative values correctly
    assert.is(controller.xMax.getValue(), -9); //controller sets +1 if the x-values are the same
    assert.is(controller.yMin.getValue(), 19); //controller handles negative values correctly
    assert.is(controller.yMax.getValue(), 21);
});
SimpleLineChartControllerTestSuite.run();
