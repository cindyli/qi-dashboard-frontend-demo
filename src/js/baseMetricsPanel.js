(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseMetricsPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection"],
        selectors: {
            summary: ".gpiic-metricsPanel-summary",
            graph: ".gpiic-metricsPanel-graph"
        },
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary\"></div><div class=\"gpiic-metricsPanel-graph\"></div>"
            }
        },
        components: {
            jsonpLoader: {
                type: "gpii.qualityInfrastructure.frontEnd.jsonp",
                options: {
                    jsonpOptions: {
                        // must be set by implementor
                        // url:
                    },
                    events: {
                        onJSONPLoaded: "{baseMetricsPanel}.events.onJSONPLoaded"
                    }
                }
            },
            graph: {
                type: "gpii.qualityInfrastructure.frontEnd.lineChart",
                container: "{baseMetricsPanel}.dom.graph",
                createOnEvent: "{baseMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        dataSet: "{baseMetricsPanel}.model.events"
                    }
                }
            }
        },
        events: {
            onJSONPLoaded: null,
            onServiceResponseReady: null
        },
        listeners: {
            "onJSONPLoaded.convertServiceResponse": {
                "funcName": "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.convertServiceResponse",
                "args": ["{that}"]
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.convertServiceResponse = function (that) {
        var summary = that.jsonpLoader.model.jsonpData.summary;
        var events = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.transformEventsData(that.jsonpLoader.model.jsonpData.events);
        that.applier.change("summary", summary);
        that.applier.change("events", events);
        that.events.onServiceResponseReady.fire();
        console.log(that);
    };

    // Transforms events data into the style expected by the line chart component
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.transformEventsData = function(eventsData) {
        return fluid.transform(eventsData, function(event) {
            return {
                "date": event.timestamp,
                "value": event.value
            };
        });
    };

})(jQuery, fluid);
