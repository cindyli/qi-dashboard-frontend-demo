(function ($, fluid) {

    "use strict";

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

        // Load JSONP
        $.ajax({
            url: jsonpURL,
            dataType: "jsonp",
            jsonp: callbackParameter,
            cache: allowCache,
            success: function (result) {
                that.applier.change("jsonpData", result);
                that.events.onJSONPLoaded.fire();
            }
        });
    };

})(jQuery, fluid);
