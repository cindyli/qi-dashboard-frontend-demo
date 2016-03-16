(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        components: {
            summary: {
                type: "gpii.qualityInfrastructure.frontEnd.contributorsSummaryPanel",
                container: "{contributorsMetricsPanel}.dom.summary",
                createOnEvent: "{contributorsMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        numberOfContributors: "{contributorsMetricsPanel}.model.summary.numberOfContributors"
                    }
                }
            }
        }
    });

})(jQuery, fluid);
