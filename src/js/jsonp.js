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

    // A simple component that loads JSONP via Ajax and
    // stores the result in its model, firing an event
    // after doing so

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.jsonp", {
        gradeNames: ["fluid.modelComponent"],
        jsonpOptions: {
            url: "",
            // Callback parameter of the JSONP service
            callbackParameter: "callback",
            // Allow browser caching of response
            allowCache: true

        },
        listeners: {
            "onCreate.loadJSONP": {
                func: "{that}.loadJSONP"
            }
        },
        invokers: {
            loadJSONP: {
                funcName: "gpii.qualityInfrastructure.frontEnd.jsonp.loadJSONP",
                args: ["{that}"]
            }
        },
        events: {
            onJSONPLoaded: null,
            onJSONPError: null
        },
        model: {
            // jsonpData: JSON
        }
    });

    gpii.qualityInfrastructure.frontEnd.jsonp.storeResult = function (that, result) {
        that.applier.change("jsonpData", result);
        that.events.onJSONPLoaded.fire();
    };

    gpii.qualityInfrastructure.frontEnd.jsonp.loadJSONP = function (that) {
        var jsonpURL = that.options.jsonpOptions.url;
        var callbackParameter = that.options.jsonpOptions.callbackParameter;
        var allowCache = that.options.jsonpOptions.allowCache;

        // Used in testing when using fake JSONP; otherwise we rely on the
        // `success` anonymous function below
        gpii.qualityInfrastructure.frontEnd.jsonp.storeResultStatic = function(result) {
            gpii.qualityInfrastructure.frontEnd.jsonp.storeResult(that, result);
        };

        // Load JSONP
        $.ajax({
            url: jsonpURL,
            dataType: "jsonp",
            jsonp: callbackParameter,
            cache: allowCache,
            success: function (result) {
                gpii.qualityInfrastructure.frontEnd.jsonp.storeResult(that, result);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                that.events.onJSONPError.fire(textStatus);
            }
        });
    };

})(jQuery, fluid);
