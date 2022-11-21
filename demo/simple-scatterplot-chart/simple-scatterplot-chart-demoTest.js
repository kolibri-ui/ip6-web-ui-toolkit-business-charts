import { TestSuite }             from "../../src/Kolibri/docs/src/kolibri/util/test.js";
import {SimpleScatterplotChart } from "../../src/business-charts/projector/simpleScatterplotChart/simpleScatterplotChartProjector.js";

const simpleScatterplotChartDemoSuite = TestSuite("simpleScatterplotChart");

/**
 * The purpose of a spike is not to test all possible user interactions and their outcome but rather
 * making sure that the view construction and the binding is properly set up.
 * Complex logic is to be tested against the controller (incl. model).
 */
