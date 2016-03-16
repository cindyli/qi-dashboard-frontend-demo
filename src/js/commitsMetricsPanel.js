(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary\"><h2>Loading Commits Metrics...</h2></div><div class=\"gpiic-metricsPanel-graph\"></div>"
            }
        },
        components: {
            summary: {
                type: "gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel",
                container: "{commitsMetricsPanel}.dom.summary",
                createOnEvent: "{commitsMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        timeOfLastCommit: "{commitsMetricsPanel}.model.summary.timeOfLastCommit",
                        mostFrequentCommitterTotalCommits: "{commitsMetricsPanel}.model.summary.mostFrequentCommitterTotalCommits",
                        mostFrequentCommitter: "{commitsMetricsPanel}.model.summary.mostFrequentCommitter",
                        totalCommits: "{commitsMetricsPanel}.model.summary.totalCommits"
                    }
                }
            }
        }
    });

})(jQuery, fluid);
