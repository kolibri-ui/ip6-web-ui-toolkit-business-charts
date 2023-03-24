// noinspection SpellCheckingInspection

import { TestSuite }        from "../../Kolibri/docs/src/kolibri/util/test.js";
import {
    ctrlOrCmdPressed,
    defaultColors
} from "./functions.js";

const functionsTestSuite = TestSuite("src/business-charts/util/functions");

functionsTestSuite.add("test ctrlOrCmdPressed", assert => {
    const mouseClick = new MouseEvent("click", {
        view   : window,
    });
    assert.is(ctrlOrCmdPressed(mouseClick), false);

    const mouseClick2 = new MouseEvent("click", {
        view   : window,
        metaKey: true,
        ctrlKey: true
    });
    assert.isTrue(ctrlOrCmdPressed(mouseClick2));
});

functionsTestSuite.add("test defaultColors", assert => {
    let colors = defaultColors();
    assert.is(colors.length, 6);
    assert.isTrue(colors.includes("#5F0FDF"));
    assert.isTrue(colors.includes("#9317EC"));
    assert.isTrue(colors.includes("#0400C9"));
    assert.isTrue(colors.includes("#009B00"));
    assert.isTrue(colors.includes("#946300"));
    assert.isTrue(colors.includes("#D50069"));

    document.documentElement.style.setProperty("--kb-color-rgb-purple-600", "#000000");
    colors = defaultColors();
    assert.is(colors.length, 1);
    assert.isTrue(colors.includes("#000000"));
});

functionsTestSuite.run();