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

    gpii.qualityInfrastructure.frontEnd.qualityInfrastructureDefaults = {
        host: "http://localhost:3000",
        apiVersion: "a"
    };

    gpii.qualityInfrastructure.frontEnd.getEndpointURL = function(endpoint, qualityInfrastructureHost, apiVersion, repo) {
        return qualityInfrastructureHost + "/" + apiVersion + "/" + repo + "/" + endpoint;
    };

    // Expander function
    gpii.qualityInfrastructure.frontEnd.getJsonpLoaderComponent = function (endPointURL) {
        return {
            components: {
                jsonpLoader: {
                    options: {
                        jsonpOptions: {
                            url: endPointURL
                        }
                    }
                }
            }
        };
    };

    gpii.qualityInfrastructure.frontEnd.createCommitsPanel = function (repo, container) {
        var qualityInfrastructureHost = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureDefaults.host,
        apiVersion = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureDefaults.apiVersion;

        var commitsEndpoint = gpii.qualityInfrastructure.frontEnd.getEndpointURL("commits", qualityInfrastructureHost, apiVersion, repo);
        return gpii.qualityInfrastructure.frontEnd.commitsMetricsPanel(container, {
            expander: {
                    funcName: "gpii.qualityInfrastructure.frontEnd.getJsonpLoaderComponent",
                    args: [commitsEndpoint]
            }
        });
    };

    gpii.qualityInfrastructure.frontEnd.createContributorsPanel = function (repo, container) {

        var qualityInfrastructureHost = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureDefaults.host,
        apiVersion = gpii.qualityInfrastructure.frontEnd.qualityInfrastructureDefaults.apiVersion;

        var contributorsEndpoint = gpii.qualityInfrastructure.frontEnd.getEndpointURL("contributors", qualityInfrastructureHost, apiVersion, repo);
        return gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel(container, {
            expander: {
                    funcName: "gpii.qualityInfrastructure.frontEnd.getJsonpLoaderComponent",
                    args: [contributorsEndpoint]
            }
        });
    };

})(jQuery, fluid);
