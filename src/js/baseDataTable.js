/*
Copyright 2018 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    // The base component shared by creating graphs that handle either the single data set
    // or the multiple data set.
    fluid.defaults("gpii.qualityInfrastructure.frontEnd.baseDataTable", {
        gradeNames: ["floe.d3ViewComponent"],
        headers: ["date", "value"],
        model: {
            dataSet: null // Must be supplied by integrators
        },
        modelListeners: {
            dataSet: [{
                listener: "gpii.qualityInfrastructure.frontEnd.baseDataTable.updateTable",
                args: ["{that}.draw", "{change}.value"],
                excludeSource: "init"
            }]
        },
        events: {
            onDataTableCreated: null
        },
        invokers: {
            draw: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseDataTable.draw",
                args: ["{that}", "{arguments}.0"]
            }
        },
        listeners: {
            "onCreate.create": {
                listener: "gpii.qualityInfrastructure.frontEnd.baseDataTable.create",
                args: ["{that}"]
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.baseDataTable.create = function (that) {
        var headers = that.options.headers,
            dataSet = that.model.dataSet;

        that.table = that.jQueryToD3(that.container)
            .append("table")
            .attr({
                "aria-live": "polite",
                "aria-relevant": "all"
            });

        var thead = that.table.append("thead");

        that.table.append("tbody");

        // append the header row
        thead.append("tr")
        .selectAll("th")
        .data(headers)
        .enter()
        .append("th")
        .text(function (header) { console.log(header); return header; });

        that.draw(dataSet);
        that.events.onDataTableCreated.fire();
    };

    gpii.qualityInfrastructure.frontEnd.baseDataTable.updateTable = function (drawFunc, modelDataSet) {
        drawFunc(fluid.get(modelDataSet[0], ["data"]));
    };

    gpii.qualityInfrastructure.frontEnd.baseDataTable.draw = function (that, dataSet) {
        console.log("in draw", dataSet);

        var rows = that.table.selectAll("tbody tr")
        .data(dataSet);

        rows.exit().remove();

        rows.enter()
        .append("tr")
        .selectAll("td")
        .data(function (d) {console.log(d.date); return [d.date, d.value]; })
        .enter()
        .append("td")
        .text(function (d) { return d; });
    };
})(jQuery, fluid);
