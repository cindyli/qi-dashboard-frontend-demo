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

    gpii.tests.expectedJSONPResult = { message: "Hello World!" };

    fluid.defaults("gpii.tests.jsonpTest", {
        gradeNames: ["fluid.test.testEnvironment"],
        components: {
            jsonp: {
                type: "gpii.qualityInfrastructure.frontEnd.jsonp",
                createOnEvent: "{jsonpTester}.events.onTestCaseStart",
                options: {
                    jsonpOptions: {
                        url: "../js/sampleCallback.js"
                    }
                }
            },
            jsonpTester: {
                type: "gpii.tests.jsonpTester"
            }
        }
    });

    fluid.defaults("gpii.tests.jsonpTester", {
        gradeNames: ["fluid.test.testCaseHolder"],
        modules: [{
            name: "Test JSONP component",
            tests: [{
                name: "JSONP component loading",
                expect: 1,
                sequence: [{
                    listener: "gpii.tests.jsonpTester.verifyJSONPLoaded",
                    args: ["{jsonp}"],
                    spec: {priority: "last"},
                    event: "{jsonpTest jsonp}.events.onJSONPLoaded"
                }]
            }
            ]
        }]
    });

    gpii.tests.jsonpTester.verifyJSONPLoaded = function (that) {
        jqUnit.assertDeepEq("model.jsonpData is identical to expectedJSONPResult", gpii.tests.expectedJSONPResult, that.model.jsonpData);
    };

    $(document).ready(function () {
        fluid.test.runTests([
            "gpii.tests.jsonpTest"
        ]);
    });

})(jQuery, fluid);
