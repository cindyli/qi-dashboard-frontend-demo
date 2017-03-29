/*
Copyright 2016-2017 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.contributorsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        selectors: {
            numberOfContributors: ".gpiic-commitsSummary-numberOfContributors"
        },
        model: {
            // numberOfContributors: number
        },
        bindings: {
            numberOfContributors: "numberOfContributors"
        },
        resources: {
            template: {
                resourceText: "<h2>Contributors</h2><p><span class=\"gpiic-commitsSummary-numberOfContributors\"></span> People have contributed.</p>"
            }
        }
    });

})(jQuery, fluid);
