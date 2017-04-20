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

    /*
     * The base metrics panel grade component that's shared by creating single data set
     * graph, such as commits and contributes panels, and multiple data set graph, such as
     * CI results panel.
     */
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseMetricsPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection"],
        selectors: {
            summary: ".gpiic-metricsPanel-summary",
            graph: ".gpiic-metricsPanel-graphContent",
            instructions: ".gpiic-metricsPanel-instructions",
            backControl: ".gpiic-metricsPanel-backControl",
            forwardControl: ".gpiic-metricsPanel-forwardControl"
        },
        classes: {
            hidden: "gpii-hidden"
        },
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary\"></div><div class=\"gpiic-metricsPanel-graphContent\"></div>"
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
                    events: {
                        onJSONPLoaded: "{baseMetricsPanel}.events.onJSONPLoaded",
                        onJSONPError: "{baseMetricsPanel}.events.onJSONPError"
                    }
                }
            },
            graph: {
                type: "floe.chartAuthoring.lineChart.timeSeriesSingleDataSet",
                container: "{baseMetricsPanel}.dom.graph",
                createOnEvent: "{baseMetricsPanel}.events.onCreateGraph",
                options: {
                    model: {
                        dataSet: "{baseMetricsPanel}.model.currentEventsDataView"
                    },
                    listeners: {
                        "onChartCreated.escalate": "{baseMetricsPanel}.events.onGraphCreated.fire"
                    }
                }
            },
            errorGraph: {
                type: "gpii.qualityInfrastructure.frontEnd.errorGraph",
                container: "{baseMetricsPanel}.dom.graph",
                createOnEvent: "{baseMetricsPanel}.events.onCreateErrorGraph",
                options: {
                    statusCode: "{arguments}.0",
                    model: {
                        statusCode: "{that}.options.statusCode"
                    }
                }
            }
        },
        events: {
            onJSONPLoaded: null,
            onJSONPError: null,
            onCreateGraph: null,
            onGraphCreated: null,
            onCreateErrorGraph: null
        },
        listeners: {
            // Set various data when jsonP data is received
            "onJSONPLoaded.setSummary": {
                listener: "{that}.applier.change",
                "args": ["summary", "{jsonpLoader}.model.jsonpData.summary"]
            },
            "onJSONPLoaded.showInstruction": {
                "this": "{that}.dom.instructions",
                "method": "removeClass",
                args: ["{that}.options.classes.hidden"]
            },
            "onJSONPLoaded.setEvents": {
                listener: "{that}.applier.change",
                "args": ["events", {
                    expander: {
                        func: "{that}.transformEventsData"
                    }
                }],
                priority: "after:setSummary"
            },
            "onJSONPLoaded.setMetricsEndDate": {
                listener: "{that}.applier.change",
                "args": ["currentEventsDataViewSettings.metricsEndDate", {
                    expander: {
                        func: "{that}.getLatestDate"
                    }
                }],
                priority: "after:setEvents"
            },
            "onJSONPLoaded.updateCurrentEventsDataView": {
                listener: "{that}.updateCurrentEventsDataView",
                priority: "after:setMetricsEndDate"
            },
            "onJSONPLoaded.fireServiceResponseReady": {
                listener: "{that}.events.onCreateGraph.fire",
                priority: "after:updateCurrentEventsDataView"
            },
            // End of handling the "onJSONPLoaded" event

            // Binds listeners for back and forward buttons only when the graph is created properly
            "onGraphCreated.bindBackward": {
                "this": "{that}.dom.backControl",
                method: "click",
                args: "{that}.moveViewBackward"
            },
            "onGraphCreated.bindForward": {
                "this": "{that}.dom.forwardControl",
                method: "click",
                args: "{that}.moveViewForward"
            },

            // Error handling
            "onJSONPError.updateErrorMsg": "{that}.events.onCreateErrorGraph.fire"
            // End of handling the "onJSONPError" event
        },
        modelListeners: {
            currentEventsDataViewSettings: {
                listener: "{that}.updateCurrentEventsDataView",
                excludeSource: "init",
                args: "{that}"
            }
        },
        invokers: {
            moveViewForward: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveViewHandler",
                args: ["{arguments}.0", "{that}", "{that}.model.currentEventsDataViewSettings.daysBack"]
            },
            moveViewBackward: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveViewHandler",
                args: ["{arguments}.0", "{that}", "{that}.model.currentEventsDataViewSettings.daysBack", true]
            },
            getCompleteDataMaxValue: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getCompleteDataMaxValue",
                args: ["{arguments}.0"]
            },
            // TODO: Verify the received jsonP event data is in the expected format
            transformEventsData: "fluid.identity",   // Implemented by integrators
            getLatestDate: "fluid.identity",   // Implemented by integrators
            getFilteredEvents: "fluid.identity",   // Implemented by integrators
            updateCurrentEventsDataView: {
                func: "{that}.applier.change",
                "args": ["currentEventsDataView", {
                    expander: {
                        func: "{that}.getFilteredEvents"
                    }
                }]
            },
            updateErrorMsg: {
                func: "{that}.applier.change",
                "args": ["errorMsg", "{arguments}.0.error"]
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveViewHandler = function (e, that, days, isBackward) {
        isBackward = isBackward || false;
        days = days * (isBackward ? -1 : 1);
        gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.moveView(that, days);
        e.preventDefault();
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getFilteredEvents = function (events, currentEventsDataView, currentEventsDataViewSettings) {
        var metricsEndDate = currentEventsDataViewSettings.metricsEndDate,
            daysBack = currentEventsDataViewSettings.daysBack,
            metricsStartDate = currentEventsDataViewSettings.metricsStartDate;

        var filteredEvents;

        if (metricsStartDate) {
            filteredEvents = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(events, metricsStartDate, metricsEndDate);
        } else {
            filteredEvents = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack(events, metricsEndDate, daysBack);
        }

        return filteredEvents.length === 0 ? currentEventsDataView : filteredEvents;
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
        } catch (e) {
            gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.rollDays(that, - daysToScroll);
        }
    };

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getCompleteDataMaxValue = function (events) {
        return d3.max(events, function (d) {
            return d.value;
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
    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData = function (eventsData, earlierDate, laterDate) {
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

    gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsDataByDaysBack = function (eventsData, startDate, daysBack) {

        startDate = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getWorkableDate(startDate);

        var daysBackDate = new Date(startDate);
        daysBackDate.setDate(- daysBack);

        return gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.filterEventsData(eventsData, daysBackDate, startDate);
    };

})(jQuery, fluid);
