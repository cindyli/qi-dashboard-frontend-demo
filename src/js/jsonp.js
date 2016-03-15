(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.jsonp", {
        gradeNames: ["fluid.modelComponent"],
        jsonpOptions: {
            url: "",
            // Callback parameter of the JSONP service
            callbackParameter: "callback"

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
            },
            // performCallback: {
            //     funcName: "",
            //     args: ["{that}"]
            // }
        },
        model: {
            // jsonpData: JSON
        }
    });

    gpii.qualityInfrastructure.frontEnd.jsonp.loadJSONP = function (that) {
        var jsonpURL = that.options.jsonpOptions.url;
        var callbackParameter = that.options.jsonpOptions.callbackParameter;

        // Load JSONP
        $.ajax({
            url: jsonpURL,
            dataType: "jsonp",
            jsonp: callbackParameter,
            cache: true,
            success: function (result) {
                that.applier.change("jsonpData", result);
            }
        })
    }

})(jQuery, fluid);
