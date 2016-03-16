(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
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
