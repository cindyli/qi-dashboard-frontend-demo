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

    fluid.defaults("gpii.tests.baseMetricsPanelTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            baseMetricsPanel: {
                type: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel",
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
        jqUnit.assertNotNull("Events from service response was relayed to model.events", that.model.events)

        jqUnit.assertEquals("model.events has expected length", 1514, that.model.events.length)

    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.baseMetricsPanelTest"
        ]);
    });

})(jQuery, fluid);
