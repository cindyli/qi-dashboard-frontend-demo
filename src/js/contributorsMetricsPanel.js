(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary\"><h2>Loading Contributors Metrics...</h2></div><div class=\"gpiic-metricsPanel-graph\"></div>"
            }
        },
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
            },
            graph: {
                options: {
                    lineOptions: {
                        interpolation: "cardinal",
                        addArea: true
                    }
                }
            }
        }
    });

})(jQuery, fluid);
