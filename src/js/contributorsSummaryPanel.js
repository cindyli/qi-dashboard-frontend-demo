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
                resourceText: "<h2>Contributors</h2><p><span class=\"gpiic-commitsSummary-numberOfContributors\">###</span> People have contributed.</p>"
            }
        }
    });

})(jQuery, fluid);
