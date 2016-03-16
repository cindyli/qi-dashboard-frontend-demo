"use strict";

fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd");

fluid.defaults("gpii.qualityInfrastructure.frontEnd.lineChart", {
    gradeNames: ["floe.chartAuthoring.lineChart.chart"],
    svgOptions: {
        height: 400,
        width: 800
    }
});
