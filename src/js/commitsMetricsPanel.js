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
            },
            graph: {
                options: {
                    model: {
                        svgTitle: "Commits line chart",
                        svgDescription: "A line chart showing statistics for commits"
                    }
                }
            }
        }
    });

})(jQuery, fluid);
