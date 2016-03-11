"use strict";

fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd");

fluid.defaults("gpii.qualityInfrastructure.frontEnd.lineChart", {
    gradeNames: ["floe.chartAuthoring.lineChart.chart"],
    svgOptions: {
        height: 400,
        width: 800
    }
});

// Callback function for backend JSONP endpoint
gpii.qualityInfrastructure.frontEnd.createCommitsPanel = function(qualityInfrastructureCommitResponse) {
    var summary = qualityInfrastructureCommitResponse.summary;
    var events = qualityInfrastructureCommitResponse.events;
    var commitData = gpii.qualityInfrastructure.frontEnd.transformEventsData(events);

    var commitsSummaryPanel = gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel(".gpiic-commits-summary", {
        model: {
            timeOfLastCommit: summary.timeOfLastCommit,
            mostFrequentCommitterTotalCommits: "Largest # of",
            mostFrequentCommitter: summary.mostFrequentCommitter,
            totalCommits: summary.totalCommits
        }
    });

    gpii.qualityInfrastructure.frontEnd.lineChart(".gpiic-commits-graph", {
            model: {
                dataSet: commitData
            }
        });
};

gpii.qualityInfrastructure.frontEnd.createContributionsPanel = function(qualityInfrastructureContributionsResponse) {
    var summary = qualityInfrastructureContributionsResponse.summary;
    var events = qualityInfrastructureContributionsResponse.events;
    var contribData = gpii.qualityInfrastructure.frontEnd.transformEventsData(events);

    var contributorsSummaryPanel = gpii.qualityInfrastructure.frontEnd.contributorsSummaryPanel(".gpiic-contributors-summary", {
        model: {
            numberOfContributors: summary.numberOfContributors
        }
    });

    gpii.qualityInfrastructure.frontEnd.lineChart(".gpiic-contributors-graph", {
            model: {
                dataSet: contribData
            }
        });
};

// Transforms events data into the style expected by the line chart component
gpii.qualityInfrastructure.frontEnd.transformEventsData = function(eventsData) {
    return fluid.transform(eventsData, function(event) {
        return {
            "date": event.timestamp,
            "value": event.value
        };
    });
};
