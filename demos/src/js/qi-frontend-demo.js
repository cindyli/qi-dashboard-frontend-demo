(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd.demo");

    gpii.qualityInfrastructure.frontEnd.demo.getURLParamValue = function (param) {
        var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});
        return params[param];
    };

    $(document).ready(function () {

        var repoFromURL = gpii.qualityInfrastructure.frontEnd.demo.getURLParamValue("repo");
        var shouldAnimate = gpii.qualityInfrastructure.frontEnd.demo.getURLParamValue("animate");

        if (repoFromURL !== undefined) {
            $("#gpii-demo-repoTitle").text(repoFromURL);

            gpii.qualityInfrastructure.frontEnd.demo.createPanels(repoFromURL, shouldAnimate);

        }
    });

    gpii.qualityInfrastructure.frontEnd.demo.createPanels = function (repo, shouldAnimate) {

        var commitsContainer = ".gpiic-metrics-commits",
        contributorsContainer = ".gpiic-metrics-contributors";

        var commitsPanel = gpii.qualityInfrastructure.frontEnd.createCommitsPanel(repo, commitsContainer);

        var contributorsPanel = gpii.qualityInfrastructure.frontEnd.createContributorsPanel(repo, contributorsContainer);


        $("#gpiic-metrics-back").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.moveView(commitsPanel, -180);
            gpii.qualityInfrastructure.frontEnd.demo.moveView(contributorsPanel, -180);
            e.preventDefault();
        });

        $("#gpiic-metrics-forward").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.moveView(commitsPanel, 180);
            gpii.qualityInfrastructure.frontEnd.demo.moveView(contributorsPanel, 180);
            e.preventDefault();
        });

        if (shouldAnimate) {
            gpii.qualityInfrastructure.frontEnd.demo.animate(commitsPanel, contributorsPanel, 180);
            }

    };

    gpii.qualityInfrastructure.frontEnd.demo.rollDays = function (panel, rollDays) {
        var currentMetricsEndDate = panel.model.currentEventsDataViewSettings.metricsEndDate;

        var nextMetricsEndDate = new Date(currentMetricsEndDate);

        nextMetricsEndDate.setDate(currentMetricsEndDate.getDate() + rollDays);

        panel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);
    };

    gpii.qualityInfrastructure.frontEnd.demo.moveView = function (panel, daysToScroll) {
        try {
            gpii.qualityInfrastructure.frontEnd.demo.rollDays(panel, daysToScroll);
        } catch(e) {
            gpii.qualityInfrastructure.frontEnd.demo.rollDays(panel, - daysToScroll);
        }
    };

    gpii.qualityInfrastructure.frontEnd.demo.animate = function(commitsPanel, contributorsPanel, daysToScroll) {

        var forward = false;

        var changeView = function() {
            var daysToRoll = forward ? daysToScroll : -daysToScroll;
            try {
                gpii.qualityInfrastructure.frontEnd.demo.rollDays(commitsPanel, daysToRoll);
                gpii.qualityInfrastructure.frontEnd.demo.rollDays(contributorsPanel, daysToRoll);
            }
            catch(e) {
                forward = forward ? false : true;
            }
        };

        window.setInterval(changeView, 5000);
    };

})(jQuery, fluid);
