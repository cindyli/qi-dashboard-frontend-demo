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

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        selectors: {
            lastCiResultDaysAgo: ".gpiic-commitsSummary-lastCiResultDaysAgo",
            totalCiResults: ".gpiic-commitsSummary-totalCiResults"
        },
        model: {
            // timeOfLastCiResult: date,
            // lastCiResultDaysAgo: string,
            // totalCiResults: number
        },
        bindings: {
            lastCiResultDaysAgo: "lastCiResultDaysAgo",
            totalCiResults: "totalCiResults"
        },
        modelRelay: [
            {
                target: "{that}.model.lastCiResultDaysAgo",
                singleTransform: {
                    input: "{that}.model.timeOfLastCiResult",
                    type: "fluid.transforms.free",
                    args: ["{that}.model.timeOfLastCommit"],
                    func: "gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.getDaysAgo"
                }
            }
        ],
        resources: {
            template: {
                resourceText: "<h2>CI Results</h2><p>Last CI result made <span class=\"gpiic-commitsSummary-lastCiResultDaysAgo\"></span>.</p><p>Total CI Results: <span class=\"gpiic-commitsSummary-totalCiResults\"></span></p>"
            }
        }
    });

    // Gets a human-readable "days ago" string, when given a date string
    // or Date object representing the day to calculate back to
    gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.getDaysAgo = function (date) {
        date = (typeof date.getMonth === "function") ? date : Date.parse(date);
        var today = new Date();
        var daysAgo = gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.getDaysBetween(date, today);

        return (daysAgo === 0) ? "today" : daysAgo + " days ago";
    };

    // Given two Date objects, returns the number of elapsed days
    // between them
    gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.getDaysBetween = function (olderDate, newerDate) {

        // Elapsed time in milliseconds between olderDate and newerDate
        var elapsedTime = newerDate - olderDate;

        var elapsedTimeInDays = gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.millisecondsToDays(elapsedTime);

        return elapsedTimeInDays;
    };

    // Given a measure in milliseonds, returns it in days
    gpii.qualityInfrastructure.frontEnd.ciResultsSummaryPanel.millisecondsToDays = function (milliseconds) {
        var elapsedDays = Math.round(milliseconds / 1000 / 60 / 60 / 24);         return elapsedDays;
    };

})(jQuery, fluid);
