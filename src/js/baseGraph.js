/*
Copyright 2017 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    // The base component shared by creating graphs that handle either the single data set
    // or the multiple data set.
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseGraph", {
        model: {
            dataSet: null // Must be supplied by integrators
        },
        axisOptions: {
            numberOfXAxisTicks: 6,
            numberOfYAxisTicks: 6,
            XAxisTimeSeriesTickFormats: {
                day: "%a %d",
                firstDayOfMonth: "%b %d",
                month: "%b-%y",
                year: "%Y"
            }
        },
        svgOptions: {
            height: 150,
            width: 500,
            preserveAspectRatio: "xMidYMid"
        },
        lineOptions: {
            padding: 25
        }
    });

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.singleDataSetGraph", {
        gradeNames: ["floe.chartAuthoring.lineChart.timeSeriesSingleDataSet", "gpii.qualityInfrastructure.frontEnd.baseGraph"]
    });

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.multiDataSetGraph", {
        gradeNames: ["floe.chartAuthoring.lineChart.timeSeriesMultiDataSet", "gpii.qualityInfrastructure.frontEnd.baseGraph"],
        lineOptions: {
            interpolation: "step"
        }
    });

})(jQuery, fluid);
