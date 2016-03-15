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
            allowCache: true,
            callbackFunction: "gpii.qualityInfrastructure.frontEnd.jsonp.storeResult"

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
            onJSONPLoaded: null
        },
        model: {
            // jsonpData: JSON
        }
    });

    gpii.qualityInfrastructure.frontEnd.jsonp.loadJSONP = function (that) {
        var jsonpURL = that.options.jsonpOptions.url;
        var callbackParameter = that.options.jsonpOptions.callbackParameter;
        var allowCache = that.options.jsonpOptions.allowCache;
        var callbackFunction = that.options.jsonpOptions.callbackFunction;

        gpii.qualityInfrastructure.frontEnd.jsonp.storeResult = function (result) {
            that.applier.change("jsonpData", result);
            that.events.onJSONPLoaded.fire();
        };

        // Load JSONP
        $.ajax({
            url: jsonpURL,
            dataType: "jsonp",
            jsonp: callbackParameter,
            cache: allowCache,
            jsonpCallback: callbackFunction
        });
    };

})(jQuery, fluid);
