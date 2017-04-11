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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        strings: {
            status: "Last CI build %lastCiResultStatus.",
            lastPassedResults: "%numOflastPassedCiResult of %numOflastPassedCiResult last CI builds passed.",
            total: "Total CI Builds: %totalCiResults."
        },
        selectors: {
            status: ".gpiic-ciResultsSummary-lastCiResultStatus",
            lastPassedResults: ".gpiic-ciResultsSummary-numOflastPassedCiResult",
            total: ".gpiic-ciResultsSummary-totalCiResults"
        },
        model: {
            // These model values are provided by integrators:
            // lastCiResultStatus: string,
            // numOflastPassedCiResult: number,
            // totalCiResults: number
        },
        modelRelay: [{
            target: "status",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "template": "{that}.options.strings.status",
                    "values": {
                        lastCiResultStatus: "{that}.model.lastCiResultStatus"
                    }
                },
                func: "gpii.qualityInfrastructure.frontEnd.composeString"
            }
        }, {
            target: "lastPassedResults",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "template": "{that}.options.strings.lastPassedResults",
                    "values": {
                        numOflastPassedCiResult: "{that}.model.numOflastPassedCiResult"
                    }
                },
                func: "gpii.qualityInfrastructure.frontEnd.composeString"
            }
        }, {
            target: "total",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "template": "{that}.options.strings.total",
                    "values": {
                        totalCiResults: "{that}.model.totalCiResults"
                    }
                },
                func: "gpii.qualityInfrastructure.frontEnd.composeString"
            }
        }],
        bindings: {
            status: "status",
            lastPassedResults: "lastPassedResults",
            total: "total"
        },
        resources: {
            template: {
                resourceText: "<h2>CI Builds</h2><p><span class=\"gpiic-ciResultsSummary-lastCiResultStatus\"></span></p><p><span class=\"gpiic-ciResultsSummary-numOflastPassedCiResult\"></span></p><p><span class=\"gpiic-ciResultsSummary-totalCiResults\"></span></p>"
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.composeString = function (model) {
        return fluid.stringTemplate(model.template, model.values);
    };

})(jQuery, fluid);
