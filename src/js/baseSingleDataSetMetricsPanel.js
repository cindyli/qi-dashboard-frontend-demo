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

    /*
     * The base metrics panel component used for generating single data set graphs, such as commits and contribution panels
     * Note: This grade handles model.events in the structure of:
     * [
     *     {"timestamp":"2017-01-29","value":4},
     *     {"timestamp":"2017-01-22","value":3},
     *     ...
     * ]
     */
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        yScaleMaxTransform: {
            expander: {
                func: "{baseSingleDataSetMetricsPanel}.getCompleteDataMaxValue",
                args: ["{baseSingleDataSetMetricsPanel}.model.events"]
            }
        },
        colors: ["#009688"],
        mergePolicy: {
            yScaleMaxTransform: "noexpand"
        },
        distributeOptions: {
            yScaleMaxTransform: {
                source: "{that}.options.yScaleMaxTransform",
                target: "{that > graph}.options.scaleOptions.yScaleMaxTransform.literalValue"
            },
            graphColors: {
                source: "{that}.options.colors",
                target: "{that > graph}.options.lineOptions.colors"
            }
        },
        invokers: {
            transformEventsData: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel.transformEventsData",
                args: ["{jsonpLoader}.model.jsonpData.events"]
            },
            getLatestDate: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel.getLatestDate",
                args: ["{that}.model.events"]
            },
            getFilteredEvents: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getFilteredEvents",
                args: ["{that}.model.events", "{that}.model.currentEventsDataView", "{that}.model.currentEventsDataViewSettings"]
            }
        }
    });

    // Transforms events data into the style expected by the line chart component
    gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel.transformEventsData = function (eventsData) {
        return fluid.transform(eventsData, function (event) {
            return {
                "date": event.timestamp,
                "value": event.value
            };
        });
    };

    gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel.getLatestDate = function (events) {
        return new Date(events[0].date);
    };

})(jQuery, fluid);
