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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        strings: {
            mostFrequent: "%mostFrequentCommitterTotalCommits commits made by %mostFrequentCommitter.",
            total: "Total commits: %totalCommits"
        },
        selectors: {
            mostFrequent: ".gpiic-commitsSummary-mostFrequentCommitter",
            total: ".gpiic-commitsSummary-totalCommits"
        },
        model: {
            // These model values are provided by integrators:
            // mostFrequentCommitterTotalCommits: number
            // mostFrequentCommitter: string,
            // totalCommits: number
        },
        bindings: {
            mostFrequent: "mostFrequent",
            total: "total"
        },
        modelRelay: [{
            target: "mostFrequent",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "template": "{that}.options.strings.mostFrequent",
                    "values": {
                        mostFrequentCommitterTotalCommits: "{that}.model.mostFrequentCommitterTotalCommits",
                        mostFrequentCommitter: "{that}.model.mostFrequentCommitter"
                    }
                },
                func: "gpii.qualityInfrastructure.frontEnd.composeStringByTemplate"
            }
        }, {
            target: "total",
            singleTransform: {
                type: "fluid.transforms.free",
                args: {
                    "template": "{that}.options.strings.total",
                    "values": {
                        totalCommits: "{that}.model.totalCommits"
                    }
                },
                func: "gpii.qualityInfrastructure.frontEnd.composeStringByTemplate"
            }
        }],
        resources: {
            template: {
                resourceText: "<h2>Commits</h2><p><span class=\"gpiic-commitsSummary-mostFrequentCommitter\"></span></p><p> <span class=\"gpiic-commitsSummary-totalCommits\"></span></p>"
            }
        }
    });

})(jQuery, fluid);
