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
        model: {
            // events: the events data from the service,
            // currentEventsDataView: filtered events
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
                type: "floe.chartAuthoring.lineChart.chart",
                container: "{baseMetricsPanel}.dom.graph",
                createOnEvent: "{baseMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        dataSet: "{baseMetricsPanel}.model.currentEventsDataView"
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
        that.applier.change("currentEventsDataView", gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack(that.model.events, new Date(), 180));
        that.events.onServiceResponseReady.fire();
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

    // Tests to determine whether or not something is a Date object
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.isDateObject = function (dateToTest) {
        var isDateObject = (typeof dateToTest.getMonth === "function");
        return (isDateObject);
    };

    // Given eventsData and date strings in YYYY-MM-DD / Dates for an end date
    // and start date, filter the events data to only have data between (and
    // including) those dates
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData = function(eventsData, earlierDate, laterDate) {
        var filteredEvents = fluid.copy(eventsData);
        earlierDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.isDateObject(earlierDate) ? earlierDate : Date.parse(earlierDate);
        laterDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.isDateObject(laterDate) ? laterDate : Date.parse(laterDate);

        fluid.remove_if(filteredEvents, function (currentEvent) {
            var currentEventDate = Date.parse(currentEvent.date);
            var isBetweenDates = (currentEventDate >= earlierDate && currentEventDate <= laterDate);
            return !isBetweenDates;
        });

        return filteredEvents;
    };

    // Given eventsData, a startDate and an integer representing the number of
    // days back, filters the eventsData to only the range from the days back
    // from the startDate

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack = function(eventsData, startDate, daysBack) {

        startDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.isDateObject(startDate) ? startDate : new Date(startDate);

        var daysBackDate = new Date(startDate);
        daysBackDate.setDate(- daysBack);

        return gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(eventsData, daysBackDate, startDate);

    };

})(jQuery, fluid);
