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

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd");

    // A panels configuration object looks like this:
    // {
    //   qualityInfrastructureHost: host address of QI instance, ex: "http://localhost:3000",
    //   apiVersion: alphabetical version of the QI API to use, ex: "a"
    //   repo: repo to retrieve results for, ex: "gpii/universal",
    //   buildsContainer: selector for container for build metrics panel, ex: ".gpiic-metrics-builds",
    //   testsContainer: selector for container for tests metrics panel, ex: ".gpiic-metrics-tests",
    //   commitsContainer: selector for container for commits metrics, ex: ".gpiic-metrics-commits",
    //   contributorsContainer: selector for container for contributors metrics panel, ex: ".gpiic-metrics-contributors"
    // }

    gpii.qualityInfrastructure.frontEnd.createPanels = function(panelsConfig) {
        var qualityInfrastructureHost = panelsConfig.qualityInfrastructureHost;
        var apiVersion = panelsConfig.apiVersion;
        var repo = panelsConfig.repo;
        var commitsContainer = panelsConfig.commitsContainer;
        var contributorsContainer = panelsConfig.contributorsContainer;

        var commitsPanel = gpii.qualityInfrastructure.frontEnd.createCommitsPanel(qualityInfrastructureHost, apiVersion, repo, commitsContainer);

        var contributorsPanel = gpii.qualityInfrastructure.frontEnd.createContributorsPanel(qualityInfrastructureHost, apiVersion, repo, contributorsContainer);

        // Returns a data object with references to the created panels, in case
        // the implenentation needs to do something further with them

        return {
            commitsPanel: commitsPanel,
            contributorsPanel: contributorsPanel
        };

    };

    gpii.qualityInfrastructure.frontEnd.getEndpointURL = function(qualityInfrastructureHost, apiVersion, repo, endpoint) {
        return qualityInfrastructureHost + "/" + apiVersion + "/" + repo + "/" + endpoint;
    };

    gpii.qualityInfrastructure.frontEnd.createCommitsPanel = function (qualityInfrastructureHost, apiVersion, repo, container) {
        var commitsEndpoint = gpii.qualityInfrastructure.frontEnd.getEndpointURL(qualityInfrastructureHost, apiVersion, repo, "commits");
        return gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel(container, {
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
    };

    gpii.qualityInfrastructure.frontEnd.createContributorsPanel = function (qualityInfrastructureHost, apiVersion, repo, container) {
        var contributorsEndpoint = qualityInfrastructureHost + "/" + apiVersion + "/" + repo + "/contributors";
        return gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel(container, {
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
    };

})(jQuery, fluid);
