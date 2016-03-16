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

    fluid.defaults("gpii.tests.commitsMetricsPanelTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            commitsMetricsPanel: {
                type: "gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel",
                container: ".gpiic-commitsMetricsPanelTest",
                createOnEvent: "{commitsMetricsPanelTester}.events.onTestCaseStart",
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
            commitsMetricsPanelTester: {
                type: "gpii.tests.commitsMetricsPanelTester"
            }
        }
    });

    fluid.defaults("gpii.tests.commitsMetricsPanelTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test Commits Metrics Panel component",
            tests: [{
                name: "Service response behaviour",
                expect: 7,
                sequence: [{
                    listener: "gpii.tests.commitsMetricsPanelTester.verifyServiceResponse",
                    args: ["{commitsMetricsPanel}"],
                    spec: {priority: "last"},
                    event: "{commitsMetricsPanelTest commitsMetricsPanel}.events.onServiceResponseReady"
                }]
            }
            ]
        }]
    });

    gpii.tests.commitsMetricsPanelTester.verifyServiceResponse = function (that) {
        jqUnit.assertNotNull("Events from service response was relayed to model.events", that.model.events);

        jqUnit.assertEquals("model.events has expected length", 1514, that.model.events.length);

        var expectedSummaryFields = [
            "mostFrequentCommitter",
            "mostFrequentCommitterTotalCommits",
            "timeOfLastCommit",
            "totalCommits"
        ];

        jqUnit.assertNotNull("Summary from service response was relayed to model.summary", that.model.summary);

        fluid.each(expectedSummaryFields, function (expectedField) {
            jqUnit.assertNotNull("model.summary." + expectedField + " exists", that.model.summary[expectedField]);
        });

    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.commitsMetricsPanelTest"
        ]);
    });

})(jQuery, fluid);
