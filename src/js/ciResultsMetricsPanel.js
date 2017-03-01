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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.ciResultsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseMetricsPanel"],
        resources: {
            template: {
                resourceText: "<div class=\"gpii-metricsPanel-summary gpiic-metricsPanel-summary\"><h2>Loading CI Results Metrics...</h2></div><div class=\"gpii-metricsPanel-graph gpiic-metricsPanel-graph\"><h3>Number of CI Results</h3><p class=\"gpii-metricsPanel-instructions\">Use <a class=\"gpiic-metricsPanel-backControl gpii-metricsPanel-backControl\" href=\"#\">Back</a> and <a class=\"gpiic-metricsPanel-forwardControl gpii-metricsPanel-forwardControl\" href=\"#\">Forward</a> to scroll</p></div>"
            }
        },
        components: {
            summary: {
                type: "gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel",
                container: "{ciResultsMetricsPanel}.dom.summary",
                createOnEvent: "{ciResultsMetricsPanel}.events.onServiceResponseReady",
                options: {
                    model: {
                        timeOfLastCiResult: "{ciResultsMetricsPanel}.model.summary.timeOfLastCiResult",
                        totalCiResults: "{ciResultsMetricsPanel}.model.summary.totalCiResults"
                    }
                }
            },
            graph: {
                options: {
                    model: {
                        svgTitle: "CI Results line chart",
                        svgDescription: "A line chart showing statistics for CI results"
                    }
                }
            }
        }
    });

})(jQuery, fluid);
