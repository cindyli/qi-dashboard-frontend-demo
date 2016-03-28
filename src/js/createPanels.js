/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd");

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

    // Returns a data object with references to the created panels, in case
    // the implenentation needs to do something further with them

    return {
        commitsPanel: commitsPanel,
        contributorsPanel: contributorsPanel
    };

};
