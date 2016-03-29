(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.qualityInfrastructure.frontEnd.demo");

    gpii.qualityInfrastructure.frontEnd.demo.animate = function(commitsPanel, contributorsPanel) {
        // var dayZooms = [30, 60, 180, 365, 730, 1040, 2080];

        var originalMetricsEndDate = fluid.copy( contributorsPanel.model.currentEventsDataViewSettings.metricsEndDate);
        var nextMetricsEndDate;

        var changeView = function() {
            try {
                var currentMetricsEndDate = contributorsPanel.model.currentEventsDataViewSettings.metricsEndDate;

                nextMetricsEndDate = new Date(currentMetricsEndDate);

                nextMetricsEndDate.setDate(currentMetricsEndDate.getDate() - 30);

                commitsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);

                contributorsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", nextMetricsEndDate);
            }
            // An error means we've moved past the start of the data coverage
            // range, so should reset to the start
            catch(e) {
                commitsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", originalMetricsEndDate);

                contributorsPanel.applier.change("currentEventsDataViewSettings.metricsEndDate", originalMetricsEndDate);

            }

        };

        window.setInterval(changeView, 3000);
    };

})(jQuery, fluid);
