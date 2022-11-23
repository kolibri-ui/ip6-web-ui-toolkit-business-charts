import { TestSuite } from "../../../src/Kolibri/docs/src/kolibri/util/test.js";
import { SimpleScatterplotController }            from "./simpleScatterplotChartController.js";

const SimpleScatterplotControllerSuite = TestSuite("/playground/mvc/simpleScatterplotChartController");

//Weg von View zu Controller
//Teste dass der xRatio-Controller aktiviert wird, wenn sich xRatio Value in View verändert
SimpleScatterplotControllerSuite.add("value changed, onValueChange", assert => {
    const controller = SimpleScatterplotController(
        
    );
    
});

//Weg von Controller zu Model
//Teste dass der xRatio-Controller aktiviert wird, wenn sich xRatio in View verändert
SimpleScatterplotControllerSuite.add("data change, onDataChange", assert => {

});

//Weg von Model zu Controller
//Teste dass der xRatio-Controller aktiviert wird, wenn sich xRatio in View verändert
SimpleScatterplotControllerSuite.add("data changed, onValueChanged", assert => {

});

//Binding von View zu Controller
//Teste dass der xRatio-Controller aktiviert wird, wenn sich xRatio in View verändert
SimpleScatterplotControllerSuite.add("view update, updateView", assert => {

});



SimpleScatterplotControllerSuite.run();