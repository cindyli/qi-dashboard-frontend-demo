(function ($, fluid) {

    "use strict";

    fluid.defaults("gpii.qualityInfrastructure.frontEnd.commitsSummaryPanel", {
        gradeNames: ["floe.chartAuthoring.templateInjection", "floe.chartAuthoring.valueBinding"],
        selectors: {
            timeOfLastCommit: ".gpiic-commitsSummary-timeOfLastCommits",
            mostFrequentCommitterTotalCommits: ".gpiic-commitsSummary-mostFrequentCommitterTotalCommits",
            mostFrequentCommitter: ".gpiic-commitsSummary-mostFrequentCommitter",
            totalCommits: ".gpiic-commitsSummary-totalCommits"
        },
        model: {
            // timeOfLastCommit: date,
            // mostFrequentCommitter: string,
            // totalCommits: number
        },
        bindings: {
            timeOfLastCommit: "timeOfLastCommit",
            mostFrequentCommitterTotalCommits: "mostFrequentCommitterTotalCommits",
            mostFrequentCommitter: "mostFrequentCommitter",
            totalCommits: "totalCommits"
        },
        resources: {
            template: {
                resourceText: "<h2>Commits</h2><p>Last commit made <span class=\"gpiic-commitsSummary-timeOfLastCommits\">2 days ago</span>.</p><p><span class=\"gpiic-commitsSummary-mostFrequentCommitterTotalCommits\">Highest # of</span> commits made by <span class=\"gpiic-commitsSummary-mostFrequentCommitter\">dhh</span>.</p><p>Total commits: <span class=\"gpiic-commitsSummary-totalCommits\">52,512</span></p>"
            }
        }
    });

})(jQuery, fluid);
