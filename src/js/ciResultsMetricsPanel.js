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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel.graph", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.multiDataSetGraph"],
        model: {
            svgTitle: "CI Results line chart",
            svgDescription: "Number of CI results over a certain period of time"
        }
    });

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMultiDataSetMetricsPanel"],
        resources: {
            template: {
                resourceText: "<div class=\"gpii-metricsPanel-summary gpiic-metricsPanel-summary\"><h2>CI Builds</h2></div><div class=\"gpii-metricsPanel-graph\"><h3>Number of CI Results</h3><p class=\"gpiic-metricsPanel-instructions gpii-metricsPanel-instructions gpii-hidden\">Use <a class=\"gpiic-metricsPanel-backControl gpii-metricsPanel-backControl\" href=\"#\">Back</a> and <a class=\"gpiic-metricsPanel-forwardControl gpii-metricsPanel-forwardControl\" href=\"#\">Forward</a> to scroll</p><div class=\"gpiic-metricsPanel-graphContent\"><div class=\"gpiic-metricsPanel-svg gpii-metricsPanel-svg\"></div><div class=\"gpiic-metricsPanel-legend gpii-metricsPanel-legend\"></div></div></div><div class=\"gpiic-metricsPanel-dataTable\"></div>"
            }
        },
        strings: {
            backControlDescription: "Go back in time to view previous CI results",
            forwardControlDescription: "Go forward in time to view more recent CI results"
        },
        components: {
            summary: {
                type: "gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel",
                container: "{ciResultsMetricsPanel}.dom.summary",
                createOnEvent: "{ciResultsMetricsPanel}.events.onCreateGraph",
                options: {
                    model: {
                        lastCiResultStatus: "{ciResultsMetricsPanel}.model.summary.lastCiResultStatus",
                        numOflastPassedCiResult: "{ciResultsMetricsPanel}.model.summary.numOflastPassedCiResult",
                        totalCiResults: "{ciResultsMetricsPanel}.model.summary.totalCiResults"
                    }
                }
            },
            graph: {
                type: "gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel.graph"
            },
            dataTable: {
                options: {
                    headers: ["date", "value", "failed"],
                    headerTexts: ["Date", "Number of Successes", "Number of Failures"],
                    modelRelay: {
                        target: "dataSetToRender",
                        namespace: "convertDataSet",
                        singleTransform: {
                            type: "fluid.transforms.free",
                            func: "gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel.convertDataSet",
                            args: {
                                "dataSet": "{that}.model.dataSet"
                            }
                        }
                    }
                }
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel.convertDataSet = function (model) {
        var dataSetTogo, failedDataArray,
            processedDates = [];

        // Prepare failed and success data arrays
        fluid.each(model.dataSet, function (dataSet) {
            if (dataSet.id === "failed") {
                failedDataArray = dataSet.data;
            } else {
                dataSetTogo = dataSet.data;   // success data for now
            }
        });

        // 1. combined the values in the success and failed arrays that have date in common
        fluid.each(dataSetTogo, function (successData) {
            processedDates.push(successData.date);
            var correspondingFailedData = $.grep(failedDataArray, function (failedData) {
                return failedData.date === successData.date;
            });

            fluid.set(successData, "failed", correspondingFailedData.length > 0 ? correspondingFailedData[0].value : 0);
        });

        // 2. find out objects in the failed array whose dates are not in the success array and haven't been combined at step 1
        var unprocessedFailedData = $.grep(failedDataArray, function (failedData) {
            return $.inArray(failedData.date, processedDates) === -1;
        });

        // 3. push objects found from the step 2 into dataSetTogo
        fluid.each(unprocessedFailedData, function (failedData) {
            dataSetTogo.push({
                date: failedData.date,
                value: 0, // number of successes on that date
                failed: failedData.value
            });
        });

        // 4. sort the final array
        dataSetTogo.sort(function (a, b) {
            return (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0);
        });

        return dataSetTogo;
    };

})(jQuery, fluid);
