/*
Copyright 2017 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    /*
     * The base metrics panel component used for generating multiple data set graphs, such as commits and contribution panels
     * Note: This grade handles model.events in the structure of:
     * [
     *     {"id":"failed","data":[{"date":"2012-03-05","value":1},...]},
     *     {"id":"success","data":[{"date":"2012-04-06","value":2},...]},
     *     ...
     * ]
     */
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        yScaleMaxTransform: {
            expander: {
                func: "{baseMultiDataSetMetricsPanel}.getCompleteDataMaxValue",
                args: [{
                    expander: {
                        func: "{baseMultiDataSetMetricsPanel}.getAllEventData"
                    }
                }]
            }
        },
        colors: ["#f15e4e", "#009688"],
        mergePolicy: {
            yScaleMaxTransform: "noexpand"
        },
        distributeOptions: {
            yScaleMaxTransform: {
                source: "{that}.options.yScaleMaxTransform",
                target: "{that > graph}.options.scaleOptions.yScaleMaxTransform.literalValue"
            },
            graphColors: {
                source: "{that}.options.colors",
                target: "{that > graph}.options.lineOptions.colors"
            },
            legendColors: {
                source: "{that}.options.colors",
                target: "{that > legend}.options.legendOptions.colors"
            }
        },
        selectors: {
            svg: ".gpiic-metricsPanel-svg",
            legend: ".gpiic-metricsPanel-legend"
        },
        components: {
            graph: {
                container: "{baseMultiDataSetMetricsPanel}.dom.svg"
            },
            legend: {
                type: "floe.chartAuthoring.pieChart.legend",
                container: "{baseMultiDataSetMetricsPanel}.dom.legend",
                createOnEvent: "onLegendDataReady",
                options: {
                    model: {
                        dataSet: "{baseMultiDataSetMetricsPanel}.model.legendData"
                    }
                }
            }
        },
        events: {
            onLegendDataReady: null
        },
        listeners: {
            "onJSONPLoaded.setLegendData": {
                listener: "{that}.applier.change",
                "args": ["legendData", {
                    expander: {
                        func: "{that}.getLegendData"
                    }
                }],
                priority: "after:fireServiceResponseReady"
            },
            "onJSONPLoaded.fireLegendDataReady": {
                listener: "{that}.events.onLegendDataReady.fire",
                priority: "after:setLegendData"
            }
        },
        invokers: {
            transformEventsData: {
                funcName: "fluid.identity",
                args: ["{jsonpLoader}.model.jsonpData.events"]
            },
            getLatestDate: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getLatestDate",
                args: ["{that}.model.events"]
            },
            getFilteredEvents: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getFilteredEvents",
                args: ["{that}.model.events", "{that}.model.currentEventsDataView", "{that}.model.currentEventsDataViewSettings"]
            },
            getAllEventData: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getAllEventData",
                args: ["{that}.model.events"]
            },
            getLegendData: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getLegendData",
                args: ["{that}.model.events"]
            }
        }
    });

    // Loop thru all event data sets to find out the latest date.
    gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getLatestDate = function (events) {
        var latestDate;

        fluid.each(events, function (oneEventSet) {
            var eventsData = oneEventSet.data;

            // The events in the returned jsonP response are in the order from the earliest to the latest
            var lastEvent = eventsData[eventsData.length - 1];
            var lastEventDate = new Date(lastEvent.date);

            latestDate = (latestDate === undefined || lastEventDate > latestDate) ? lastEventDate : latestDate;
        });

        return latestDate;
    };

    // Loop thru all event data sets to calculate filtered data based on "currentEventsDataViewSettings" for each of them
    gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getFilteredEvents = function (events, currentEventsDataView, currentEventsDataViewSettings) {
        var filteredEvents = fluid.copy(events);

        fluid.each(events, function (oneEventSet, index) {
            var currentOneEventSetDataView = currentEventsDataView ? currentEventsDataView[index].data : [];
            var filteredOneEventSet = gpii.qualityInfrastructure.frontEnd.baseMetricsPanel.getFilteredEvents(oneEventSet.data, currentOneEventSetDataView, currentEventsDataViewSettings);

            fluid.set(filteredEvents, [index, "data"], filteredOneEventSet);
        });

        return filteredEvents;
    };

    // Loop thru all event data sets to join all events data into one array
    gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getAllEventData = function (events) {
        var allEventData = [];

        fluid.each(events, function (oneEventSet) {
            allEventData = allEventData.concat(oneEventSet.data);
        });

        return allEventData;
    };

    gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel.getLegendData = function (events) {
        var legendData = [];
        fluid.each(events, function (oneEventSet) {
            var oneLegendData = {};
            fluid.set(oneLegendData, ["id"], fluid.allocateGuid());
            fluid.set(oneLegendData, ["label"], oneEventSet.id);
            legendData.push(oneLegendData);
        });
        return legendData;
    };

})(jQuery, fluid);
