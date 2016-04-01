(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd.demo");

    gpii.qualityInfrastructure.frontEnd.demo.daysToZoom = 180;

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
            gpii.qualityInfrastructure.frontEnd.demo.moveView(commitsPanel, -gpii.qualityInfrastructure.frontEnd.demo.daysToZoom);
            gpii.qualityInfrastructure.frontEnd.demo.moveView(contributorsPanel, -gpii.qualityInfrastructure.frontEnd.demo.daysToZoom);
            e.preventDefault();
        });

        $("#gpiic-metrics-forward").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.moveView(commitsPanel, gpii.qualityInfrastructure.frontEnd.demo.daysToZoom);
            gpii.qualityInfrastructure.frontEnd.demo.moveView(contributorsPanel, gpii.qualityInfrastructure.frontEnd.demo.daysToZoom);
            e.preventDefault();
        });

        $("#gpiic-metrics-zoom-sixMonths").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(commitsPanel, 180);
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(contributorsPanel, 180);
            e.preventDefault();
        });

        $("#gpiic-metrics-zoom-oneYear").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(commitsPanel, 365);
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(contributorsPanel, 365);
            e.preventDefault();
        });

        $("#gpiic-metrics-zoom-threeMonths").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(commitsPanel, 90);
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(contributorsPanel, 90);
            e.preventDefault();
        });

        $("#gpiic-metrics-zoom-oneMonth").click(function (e) {
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(commitsPanel, 30);
            gpii.qualityInfrastructure.frontEnd.demo.changeZoom(contributorsPanel, 30);
            e.preventDefault();
        });

        if (shouldAnimate) {
            gpii.qualityInfrastructure.frontEnd.demo.animate(commitsPanel, contributorsPanel, gpii.qualityInfrastructure.frontEnd.demo.daysToZoom);
            }

    };

    gpii.qualityInfrastructure.frontEnd.demo.rollDays = function (panel, rollDays) {
        var currentMetricsEndDate = panel.model.currentEventsDataViewSettings.metricsEndDate;

        var nextMetricsEndDate = new Date(currentMetricsEndDate);

        nextMetricsEndDate.setDate(currentMetricsEndDate.getDate() + rollDays);

        panel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);
    };

    gpii.qualityInfrastructure.frontEnd.demo.changeZoom = function (panel, daysToZoom) {
        gpii.qualityInfrastructure.frontEnd.demo.daysToZoom = daysToZoom;
        panel.applier.change("currentEventsDataViewSettings.daysBack", daysToZoom);
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
