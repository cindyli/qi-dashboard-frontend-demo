(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        selectors: {
            lastCommitDaysAgo: ".gpiic-commitsSummary-lastCommitDaysAgo",
            mostFrequentCommitterTotalCommits: ".gpiic-commitsSummary-mostFrequentCommitterTotalCommits",
            mostFrequentCommitter: ".gpiic-commitsSummary-mostFrequentCommitter",
            totalCommits: ".gpiic-commitsSummary-totalCommits"
        },
        model: {
            // timeOfLastCommit: date,
            // lastCommitDaysAgo: string,
            // mostFrequentCommitterTotalCommits: number
            // mostFrequentCommitter: string,
            // totalCommits: number
        },
        bindings: {
            lastCommitDaysAgo: "lastCommitDaysAgo",
            mostFrequentCommitterTotalCommits: "mostFrequentCommitterTotalCommits",
            mostFrequentCommitter: "mostFrequentCommitter",
            totalCommits: "totalCommits"
        },
        modelRelay: [
            {
                source: "{that}.model.timeOfLastCommit",
                target: "{that}.model.lastCommitDaysAgo",
                singleTransform: {
                    type: "fluid.transforms.free",
                    args: ["{that}.model.timeOfLastCommit"],
                    func: "gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.getDaysAgo"
                }
            }
        ],
        resources: {
            template: {
                resourceText: "<h2>Commits</h2><p>Last commit made <span class=\"gpiic-commitsSummary-lastCommitDaysAgo\"></span>.</p><p><span class=\"gpiic-commitsSummary-mostFrequentCommitterTotalCommits\"></span> commits made by <span class=\"gpiic-commitsSummary-mostFrequentCommitter\"></span>.</p><p>Total commits: <span class=\"gpiic-commitsSummary-totalCommits\"></span></p>"
            }
        }
    });

    // Gets a human-readable "days ago" string, when given a date string
    // or Date object representing the day to calculate back to
    gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.getDaysAgo = function (date) {
        date = (typeof date.getMonth === "function") ? date : Date.parse(date);
        var today = new Date();
        var daysAgo = gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.getDaysBetween(date, today);

        return (daysAgo === 0) ? "today" : daysAgo + " days ago";
    };

    // Given two Date objects, returns the number of elapsed days
    // between them
    gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.getDaysBetween = function (olderDate, newerDate) {

        // Elapsed time in milliseconds between olderDate and newerDate
        var elapsedTime = newerDate - olderDate;

        var elapsedTimeInDays = gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.millisecondsToDays(elapsedTime);

        return elapsedTimeInDays;
    };

    // Given a measure in milliseonds, returns it in days
    gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel.millisecondsToDays = function (milliseconds) {
        var elapsedDays = Math.round(milliseconds / 1000 / 60 / 60 / 24);         return elapsedDays;
    };

})(jQuery, fluid);
