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

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd.errorGraph");

    gpii.qualityInfrastructure.frontEnd.errorGraph.errorMapping = {
        "404": "Error: CI is not set up for this project.",
        "default": "Error: CI data is not available for this project."
    };

    // Shows error message when an error occurs and the graph is not rendered properly
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.errorGraph", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        model: {
            // Provided by integrators
            // statusCode: null
            message: null
        },
        modelRelay: {
            target: "message",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "statusCode": "{that}.model.statusCode"
                },
                func: "gpii.qualityInfrastructure.frontEnd.errorGraph.transformMsg"
            }
        },
        selectors: {
            message: ".gpiic-errorGraph-message"
        },
        bindings: {
            message: "message"
        },
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-errorGraph-message gpii-errorGraph-message\"></div>"
            }
        }
    });


    gpii.qualityInfrastructure.frontEnd.errorGraph.transformMsg = function (model) {
        var statusCode = model.statusCode ? model.statusCode : "default";

        return fluid.get(gpii.qualityInfrastructure.frontEnd.errorGraph.errorMapping, statusCode);
    };
})(jQuery, fluid);
