"use strict";

fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd.demo");

// A panels configuration object looks like this:
// {
//   repo: "gpii/universal",
//   buildsContainer: "gpiic-metrics-builds",
//   testsContainer: "gpiic-metrics-tests",
//   commitsContainer: "gpiic-metrics-commits",
//   contributorsContainer: "gpiic-metrics-contributors"
// }

gpii.qualityInfrastructure.frontEnd.createPanels = function(panelsConfig) {
    var repo = panelsConfig.repo;
    var commitsContainer = panelsConfig.commitsContainer;
    var contributorsContainer = panelsConfig.contributorsContainer;

    var commitsEndpoint = "http://localhost:3000/a/" + repo + "/commits";

    var contributorsEndpoint = "http://localhost:3000/a/" + repo + "/contributors";

    var commitsPanel = gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel(commitsContainer, {
        components: {
            jsonpLoader: {
                options: {
                    jsonpOptions: {
                        url: commitsEndpoint
                    }
                }
            }
        }
    });

    var contributorsPanel = gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel(contributorsContainer, {
        components: {
            jsonpLoader: {
                options: {
                    jsonpOptions: {
                        url: contributorsEndpoint
                    }
                }
            }
        }
    });

    return {
        commitsPanel: commitsPanel,
        contributorsPanel: contributorsPanel
    };

};

gpii.qualityInfrastructure.frontEnd.demo.animate = function(commitsPanel, contributorsPanel) {
    // var dayZooms = [30, 60, 180, 365, 730, 1040, 2080];

    var originalMetricsEndDate = fluid.copy( contributorsPanel.model.currentEventsDataViewSettings.metricsEndDate);
    var nextMetricsEndDate;

    var changeView = function() {
        try {
            var currentMetricsEndDate = contributorsPanel.model.currentEventsDataViewSettings.metricsEndDate;

            nextMetricsEndDate = new Date(currentMetricsEndDate);

            nextMetricsEndDate.setDate(currentMetricsEndDate.getDate() - 30);

            commitsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);

            contributorsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);
        }
        // An error means we've moved past the start of the data coverage
        // range, so should reset to the start
        catch(e) {
            commitsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", originalMetricsEndDate);

            contributorsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", originalMetricsEndDate);

        }

    };

    window.setInterval(changeView, 3000);
};
