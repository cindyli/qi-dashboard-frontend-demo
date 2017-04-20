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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel.graph", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.singleDataSetGraph", "floe.chartAuthoring.lineChart.timeSeries.area"],
        model: {
            svgTitle: "Contributors line chart",
            svgDescription: "A line chart showing statistics for contributors"
        },
        lineOptions: {
            interpolation: "cardinal"
        }
    });

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel", {
        gradeNames: ["gpii.qualityInfrastructure.frontEnd.baseSingleDataSetMetricsPanel"],
        resources: {
            template: {
                resourceText: "<div class=\"gpiic-metricsPanel-summary gpii-metricsPanel-summary\"><h2>Contributors</h2></div><div class=\"gpii-metricsPanel-graph\"><h3>Amount of Contribution</h3><p class=\"gpii-metricsPanel-instructions\">Use <a class=\"gpiic-metricsPanel-backControl gpii-metricsPanel-backControl\" href=\"#\">Back</a> and <a class=\"gpiic-metricsPanel-forwardControl gpii-metricsPanel-forwardControl\" href=\"#\">Forward</a> to scroll</p><div class=\"gpiic-metricsPanel-graphContent\"><div class=\"gpiic-metricsPanel-svg gpii-metricsPanel-svg\"></div></div></div>"
            }
        },
        selectors: {
            graph: ".gpii-metricsPanel-svg"
        },
        components: {
            summary: {
                type: "gpii.qualityInfrastructure.frontEnd.contributorsSummaryPanel",
                container: "{contributorsMetricsPanel}.dom.summary",
                createOnEvent: "{contributorsMetricsPanel}.events.onCreateGraph",
                options: {
                    model: {
                        numberOfContributors: "{contributorsMetricsPanel}.model.summary.numberOfContributors"
                    }
                }
            },
            graph: {
                type: "gpii.qualityInfrastructure.frontEnd.contributorsMetricsPanel.graph"
            }
        }
    });

})(jQuery, fluid);
