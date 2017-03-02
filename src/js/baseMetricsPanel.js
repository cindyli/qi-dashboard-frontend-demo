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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseMetricsPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection"],
        selectors: {
            summary: ".gpiic-metricsPanel-summary",
            graph: ".gpiic-metricsPanel-graph",
            backControl: ".gpiic-metricsPanel-backControl",
            forwardControl: ".gpiic-metricsPanel-forwardControl"
        },
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary\"></div><div class=\"gpiic-metricsPanel-graph\">Use <a href=\"#\">Back</a> and <a href=\"#\">Forward</a> to scroll</div>"
            }
        },
        model: {
            // events: the full events data from the service,
            // currentEventsDataView: filtered events currently being shown
            // Set to something else to change the metrics end date
            // defaults to current day
            currentEventsDataViewSettings: {
                metricsEndDate: new Date(),
                // Change to change number of days back
                // ignored if metricsStartDate is set
                daysBack: 180
                // set to a date or date string to explicitly configure the
                // metrics start date
                // overrides daysBack
                // metricsStartDate: Date or date string
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
                    modelRelay:{
                        source: "{that}.model.jsonpData",
                        target: "{baseMetricsPanel}.model.summary",
                        singleTransform: {
                            type: "fluid.transforms.value",
                            inputPath: "summary"
                        }
                    },
                    events: {
                        onJSONPLoaded: "{baseMetricsPanel}.events.onJSONPLoaded",
                        onJSONPError: "{baseMetricsPanel}.events.onJSONPError"
                    }
                }
            },
            graph: {
                type: "floe.chartAuthoring.lineChart.timeSeriesSingleDataSet",
                container: "{baseMetricsPanel}.dom.graph",
                createOnEvent: "{baseMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        dataSet: "{baseMetricsPanel}.model.currentEventsDataView"
                    },
                    axisOptions: {
                        numberOfXAxisTicks: 6,
                        numberOfYAxisTicks: 6,
                        XAxisTimeSeriesTickFormats: {
                            day: "%a %d",
                            firstDayOfMonth: "%b %d",
                            month: "%b-%y",
                            year: "%Y"
                        }
                    },
                    svgOptions: {
                        height: 150,
                        width: 500,
                        preserveAspectRatio: "xMidYMid"
                    },
                    lineOptions: {
                        padding: 25,
                        colors: ["#009688"]
                    },
                    scaleOptions: {
                        yScaleMaxTransform: {
                            "literalValue": {
                                expander: {
                                    func: "{baseMetricsPanel}.getCompleteDataMaxValue"
                                }
                            }
                        }
                    }
                }
            }
        },
        events: {
            onJSONPLoaded: null,
            onJSONPError: null,
            onServiceResponseReady: null
        },
        listeners: {
            "onJSONPLoaded.convertServiceResponse": {
                "funcName": "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.convertServiceResponse",
                "args": ["{that}"]
            },
            "onServiceResponseReady.bindNavigationHandlers": {
                "funcName": "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.bindNavigationHandlers",
                "args": ["{that}"]
            }
        },
        modelListeners: {
            currentEventsDataViewSettings: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataView",
                excludeSource: "init",
                args: "{that}"
            }
        },
        invokers: {
            "getCompleteDataMaxValue": {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getCompleteDataMaxValue",
                args: "{that}"
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.bindNavigationHandlers = function (that) {
        var backControl = that.locate("backControl");
        var forwardControl = that.locate("forwardControl");

        backControl.click(function (e) {
            gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveView(that, -that.model.currentEventsDataViewSettings.daysBack);
            e.preventDefault();
        });

        forwardControl.click(function (e) {
            gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveView(that, that.model.currentEventsDataViewSettings.daysBack);
            e.preventDefault();
        });
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.rollDays = function (that, rollDays) {
        var currentMetricsEndDate = that.model.currentEventsDataViewSettings.metricsEndDate;

        var nextMetricsEndDate = new Date(currentMetricsEndDate);

        nextMetricsEndDate.setDate(currentMetricsEndDate.getDate() + rollDays);

        that.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveView = function (that, daysToScroll) {
        try {
            gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.rollDays(that, daysToScroll);
        } catch(e) {
            gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.rollDays(that, - daysToScroll);
        }
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.convertServiceResponse = function (that) {
        var events = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.transformEventsData(that.jsonpLoader.model.jsonpData.events);

        // We set the metricsEndDate to the last day in the dataset
        var lastDayOfData = new Date(events[0].date);

        that.applier.change("events", events);
        that.applier.change("currentEventsDataViewSettings.metricsEndDate", lastDayOfData);

        gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataView(that);

        that.events.onServiceResponseReady.fire();
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getCompleteDataMaxValue = function (that) {
        return d3.max(that.model.events, function (d) {
            return d.value;
        });
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataViewException = function (message) {
        this.message = message;
        this.name = "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataViewException";
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataView = function (that) {
        var events = that.model.events,
            metricsEndDate = that.model.currentEventsDataViewSettings.metricsEndDate,
            daysBack = that.model.currentEventsDataViewSettings.daysBack,
            metricsStartDate = that.model.currentEventsDataViewSettings.metricsStartDate;

        var filteredEvents;

        if(metricsStartDate !== undefined) {
            filteredEvents = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(events, metricsStartDate, metricsEndDate);
        } else {
            filteredEvents = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack(events, metricsEndDate, daysBack);
        }

        if(filteredEvents.length !== 0) {
            that.applier.change("currentEventsDataView", filteredEvents);
        } else {
            throw new gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.updateCurrentEventsDataViewException("Filter would result in empty dataSet object");
        }
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

    // Tries to return a valid Date object from whatever is passed to it
    // (typically, this will be an existing Date object or a date string)
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getWorkableDate = function (dateToAttempt) {

        // Try these first
        var firstAttempt =  gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.isDateObject(dateToAttempt) ? dateToAttempt : Date.parse(dateToAttempt);

        // a NaN response is probably because Date.parse is rather crap
        return isNaN(firstAttempt) ? firstAttempt : new Date(dateToAttempt);
    };

    // Given eventsData and date strings in YYYY-MM-DD / Dates for an end date
    // and start date, filter the events data to only have data between (and
    // including) those dates
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData = function(eventsData, earlierDate, laterDate) {
        var filteredEvents = fluid.copy(eventsData);

        earlierDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getWorkableDate(earlierDate);

        laterDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getWorkableDate(laterDate);

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

        startDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getWorkableDate(startDate);

        var daysBackDate = new Date(startDate);
        daysBackDate.setDate(- daysBack);

        return gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(eventsData, daysBackDate, startDate);

    };

})(jQuery, fluid);
