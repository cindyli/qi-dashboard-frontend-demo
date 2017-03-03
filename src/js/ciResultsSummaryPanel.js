/*
Copyright 2016 OCAD University

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
        selectors: {
            lastCiResultStatus: ".gpiic-ciResultsSummary-lastCiResultStatus",
            numOflastPassedCiResult: ".gpiic-ciResultsSummary-numOflastPassedCiResult",
            totalCiResults: ".gpiic-ciResultsSummary-totalCiResults"
        },
        model: {
            // lastCiResultStatus: string,
            // numOflastPassedCiResult: number,
            // totalCiResults: number
        },
        bindings: {
            lastCiResultStatus: "lastCiResultStatus",
            numOflastPassedCiResult: "numOflastPassedCiResult",
            totalCiResults: "totalCiResults"
        },
        resources: {
            template: {
                resourceText: "<h2>CI Builds</h2><p>Last CI build <span class=\"gpiic-ciResultsSummary-lastCiResultStatus\"></span>.</p><p><span class=\"gpiic-ciResultsSummary-numOflastPassedCiResult\"></span> of <span class=\"gpiic-ciResultsSummary-numOflastPassedCiResult\"></span> last CI builds passed.</p><p>Total CI Builds: <span class=\"gpiic-ciResultsSummary-totalCiResults\"></span>.</p>"
            }
        }
    });

})(jQuery, fluid);
