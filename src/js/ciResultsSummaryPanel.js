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
            lastCiResultStatus: ".gpiic-ciResultsSummary-lastCiResultStatus",
            numOflastPassedCiResult: ".gpiic-ciResultsSummary-numOflastPassedCiResult",
            totalCiResults: ".gpiic-ciResultsSummary-totalCiResults"
        },
        model: {
            // lastCiResultStatus: string,
            // numOflastPassedCiResult: number,
            // totalCiResults: number
        },
        bindings: {
            lastCiResultStatus: "lastCiResultStatus",
            numOflastPassedCiResult: "numOflastPassedCiResult",
            totalCiResults: "totalCiResults"
        },
        resources: {
            template: {
                resourceText: "<h2>CI Builds</h2><p>Last CI build <span class=\"gpiic-ciResultsSummary-lastCiResultStatus\"></span>.</p><p><span class=\"gpiic-ciResultsSummary-numOflastPassedCiResult\"></span> of <span class=\"gpiic-ciResultsSummary-numOflastPassedCiResult\"></span> last CI builds passed.</p><p>Total CI Builds: <span class=\"gpiic-ciResultsSummary-totalCiResults\"></span>.</p>"
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
