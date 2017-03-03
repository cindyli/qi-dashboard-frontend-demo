/*
Copyright 2016-2017 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd");

    gpii.qualityInfrastructure.frontEnd.qualityInfrastructureSettings = {
        host: "https://qi-backend.gpii.net",
        apiVersion: "a",
        // For testing without a backend service
        endpointSuffix: ""
    };

    gpii.qualityInfrastructure.frontEnd.getEndpointURL = function(endpoint, qualityInfrastructureHost, apiVersion, repo, endpointSuffix) {
        return qualityInfrastructureHost + "/" + apiVersion + "/" + repo + "/" + endpoint + endpointSuffix;
    };

    gpii.qualityInfrastructure.frontEnd.createPanel = function (repo, container, endpoint, panelComponent) {

        var qualityInfrastructureHost = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureSettings.host,
        apiVersion = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureSettings.apiVersion,
        endpointSuffix = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureSettings.endpointSuffix;

        var endPointURL = gpii.qualityInfrastructure.frontEnd.getEndpointURL(endpoint, qualityInfrastructureHost, apiVersion, repo, endpointSuffix);

        // Append styles to cause SVG to autoscale in relation to parent container
        $("<style type='text/css'>.gpiic-metricsPanel-graph svg { width: 100%; height: 100%;} </style>").appendTo("head");

        return panelComponent(container, {
            components: {
                jsonpLoader: {
                    options: {
                        jsonpOptions: {
                            url: endPointURL
                        }
                    }
                }
            }
        });
    };

    gpii.qualityInfrastructure.frontEnd.createCommitsPanel = function (repo, container) {

        return gpii.qualityInfrastructure.frontEnd.createPanel(repo, container, "commits", gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel);
    };

    gpii.qualityInfrastructure.frontEnd.createContributorsPanel = function (repo, container) {

        return gpii.qualityInfrastructure.frontEnd.createPanel(repo, container, "contributors", gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel);
    };

    gpii.qualityInfrastructure.frontEnd.createCiResultsPanel = function (repo, container) {

        return gpii.qualityInfrastructure.frontEnd.createPanel(repo, container, "ci", gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel);
    };

})(jQuery, fluid);
