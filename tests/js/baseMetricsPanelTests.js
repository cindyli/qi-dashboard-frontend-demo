/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.tests");

    // For testing filterEventsData functionality

    gpii.tests.eventsData = [
        {
            "date": "2014-12-31",
            "value": 45
        },
        {
            "date": "2015-01-07",
            "value": 24
        },
        {
            "date": "2015-01-14",
            "value": 31
        },
        {
            "date": "2015-01-21",
            "value": 36
        },
        {
            "date": "2015-01-28",
            "value": 40
        },
        {
            "date": "2015-02-04",
            "value": 14
        },
        {
            "date": "2015-02-11",
            "value": 12
        },
        {
            "date": "2015-02-18",
            "value": 8
        },
        {
            "date": "2015-02-25",
            "value": 49
        },
        {
            "date": "2015-03-04",
            "value": 6
        },
        {
            "date": "2015-03-11",
            "value": 31
        },
        {
            "date": "2015-03-18",
            "value": 11
        },
        {
            "date": "2015-03-25",
            "value": 46
        },
        {
            "date": "2015-04-01",
            "value": 7
        },
        {
            "date": "2015-04-08",
            "value": 5
        },
        {
            "date": "2015-04-15",
            "value": 33
        },
        {
            "date": "2015-04-22",
            "value": 12
        },
        {
            "date": "2015-04-29",
            "value": 35
        },
        {
            "date": "2015-05-06",
            "value": 17
        },
        {
            "date": "2015-05-13",
            "value": 23
        },
        {
            "date": "2015-05-20",
            "value": 45
        },
        {
            "date": "2015-05-27",
            "value": 7
        },
        {
            "date": "2015-06-03",
            "value": 25
        },
        {
            "date": "2015-06-10",
            "value": 18
        },
        {
            "date": "2015-06-17",
            "value": 19
        },
        {
            "date": "2015-06-24",
            "value": 45
        }
    ];

    gpii.tests.expectedFilteredEventsData = [
        {
            "date": "2015-05-06",
            "value": 17
        },
        {
            "date": "2015-05-13",
            "value": 23
        },
        {
            "date": "2015-05-20",
            "value": 45
        },
        {
            "date": "2015-05-27",
            "value": 7
        },
        {
            "date": "2015-06-03",
            "value": 25
        },
        {
            "date": "2015-06-10",
            "value": 18
        },
        {
            "date": "2015-06-17",
            "value": 19
        },
        {
            "date": "2015-06-24",
            "value": 45
        }
    ];

    gpii.tests.expectedFilteredEventsDataByDaysBack = [
        {
            "date": "2015-04-08",
            "value": 5
        },
        {
            "date": "2015-04-15",
            "value": 33
        },
        {
            "date": "2015-04-22",
            "value": 12
        },
        {
            "date": "2015-04-29",
            "value": 35
        },
        {
            "date": "2015-05-06",
            "value": 17
        },
        {
            "date": "2015-05-13",
            "value": 23
        },
        {
            "date": "2015-05-20",
            "value": 45
        },
        {
            "date": "2015-05-27",
            "value": 7
        },
        {
            "date": "2015-06-03",
            "value": 25
        },
        {
            "date": "2015-06-10",
            "value": 18
        },
        {
            "date": "2015-06-17",
            "value": 19
        },
        {
            "date": "2015-06-24",
            "value": 45
        }
    ];

    jqUnit.test("Test filterEventsData functionality", function () {

        var filteredByDateString =  gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(gpii.tests.eventsData, "2015-05-01", "2016-05-01");

        jqUnit.assertEquals("Length of filtered events data is as expected (using datestrings as date args)", 8, filteredByDateString.length);

        jqUnit.assertDeepEq("Filtered events data matches expected filtered set (using datestrings as date args)", gpii.tests.expectedFilteredEventsData, filteredByDateString);

        var filteredByDateObject =  gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(gpii.tests.eventsData, new Date("2015-05-01"), new Date("2016-05-01"));

        jqUnit.assertEquals("Length of filtered events data is as expected (using date objects as date args)", 8, filteredByDateObject.length);

        jqUnit.assertDeepEq("Filtered events data matches expected filtered set (using date objects as date args)", gpii.tests.expectedFilteredEventsData, filteredByDateObject);

    });

    jqUnit.test("Test filterEventsDataByDaysBack functionality", function () {
        var filteredByDateString = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack(gpii.tests.eventsData, "2015-06-24", 60);

        jqUnit.assertEquals("Length of filtered by days back events data is as expected (using datestring as date arg)", 12, filteredByDateString.length);

        jqUnit.assertDeepEq("Filtered events data matches expected filtered set (using datestring as date arg)", gpii.tests.expectedFilteredEventsDataByDaysBack, filteredByDateString);

        var filteredByDateObject = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack(gpii.tests.eventsData, new Date("2015-06-24"), 60);

        jqUnit.assertEquals("Length of filtered by days back events data is as expected (using date object as date arg)", 12, filteredByDateObject.length);

        jqUnit.assertDeepEq("Filtered events data matches expected filtered set (using date object as date arg)", gpii.tests.expectedFilteredEventsDataByDaysBack, filteredByDateObject);

    });

    fluid.defaults("gpii.tests.baseMetricsPanelTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            baseMetricsPanel: {
                type: "gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel",
                container: ".gpiic-baseMetricsPanelTest",
                createOnEvent: "{baseMetricsPanelTester}.events.onTestCaseStart",
                options: {
                    components: {
                        jsonpLoader: {
                            options: {
                                jsonpOptions: {
                                    url: "../js/sampleCommitsCallback.js"
                                }
                            }
                        }
                    }
                }
            },
            baseMetricsPanelTester: {
                type: "gpii.tests.baseMetricsPanelTester"
            }
        }
    });

    fluid.defaults("gpii.tests.baseMetricsPanelTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test Base Metrics Panel component",
            tests: [{
                name: "Service response behaviour",
                expect: 2,
                sequence: [{
                    listener: "gpii.tests.baseMetricsPanelTester.verifyServiceResponse",
                    args: ["{baseMetricsPanel}"],
                    spec: {priority: "last"},
                    event: "{baseMetricsPanelTest baseMetricsPanel}.events.onServiceResponseReady"
                }]
            }
            ]
        }]
    });

    gpii.tests.baseMetricsPanelTester.verifyServiceResponse = function (that) {
        jqUnit.assertNotNull("Events from service response was relayed to model.events", that.model.events);

        jqUnit.assertEquals("model.events has expected length", 1514, that.model.events.length);

    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.baseMetricsPanelTest"
        ]);
    });

})(jQuery, fluid);
