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

    fluid.defaults("gpii.tests.contributorsMetricsPanelTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            contributorsMetricsPanel: {
                type: "gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel",
                container: ".gpiic-contributorsMetricsPanelTest",
                createOnEvent: "{contributorsMetricsPanelTester}.events.onTestCaseStart",
                options: {
                    components: {
                        jsonpLoader: {
                            options: {
                                jsonpOptions: {
                                    url: "../js/sampleContributorsCallback.js"
                                }
                            }
                        }
                    }
                }
            },
            contributorsMetricsPanelTester: {
                type: "gpii.tests.contributorsMetricsPanelTester"
            }
        }
    });

    fluid.defaults("gpii.tests.contributorsMetricsPanelTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test Contributors Metrics Panel component",
            tests: [{
                name: "Service response behaviour",
                expect: 4,
                sequence: [{
                    listener: "gpii.tests.contributorsMetricsPanelTester.verifyServiceResponse",
                    args: ["{contributorsMetricsPanel}"],
                    spec: {priority: "last"},
                    event: "{contributorsMetricsPanelTest contributorsMetricsPanel}.events.onServiceResponseReady"
                }]
            }
            ]
        }]
    });

    gpii.tests.contributorsMetricsPanelTester.verifyServiceResponse = function (that) {
        jqUnit.assertNotNull("Events from service response was relayed to model.events", that.model.events);

        jqUnit.assertEquals("model.events has expected length", 1514, that.model.events.length);

        var expectedSummaryFields = [
            "numberOfContributors"
        ];

        jqUnit.assertNotUndefined("Summary from service response was relayed to model.summary", that.model.summary);

        fluid.each(expectedSummaryFields, function (expectedField) {
            jqUnit.assertNotUndefined("model.summary." + expectedField + " exists", that.model.summary[expectedField]);
        });

    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.contributorsMetricsPanelTest"
        ]);
    });

})(jQuery, fluid);
