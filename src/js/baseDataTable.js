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
        title: "Corresponding Data Table",
        headers: ["date", "value"],
        headerTexts: ["Date", "Number"],
        styles: {
            hiddenAccessible: "gpii-hidden-accessible"
        },
        model: {
            dataSet: null // Must be supplied by integrators
        },
        modelRelay: {
            target: "dataSetToRender",
            namespace: "convertDataSet",
            singleTransform: {
                type: "fluid.transforms.free",
                func: "gpii.qualityInfrastructure.frontEnd.convertDataSet",
                args: {
                    "dataSet": "{that}.model.dataSet"
                }
            }
        },
        modelListeners: {
            dataSetToRender: [{
                listener: "{that}.draw",
                args: ["{change}.value"],
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
            },
            mapRowData: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseDataTable.mapRowData",
                args: ["{that}", "{arguments}.0"]
            },
            getData: {
                funcName: "gpii.qualityInfrastructure.frontEnd.baseDataTable.getData",
                args: ["{arguments}.0"]
            }
        },
        listeners: {
            "onCreate.hideDataTable": {
                "this": "{that}.container",
                method: "addClass",
                args: ["{that}.options.styles.hiddenAccessible"]
            },
            "onCreate.create": {
                listener: "gpii.qualityInfrastructure.frontEnd.baseDataTable.create",
                args: ["{that}"]
            }
        }
    });

    gpii.qualityInfrastructure.frontEnd.baseDataTable.create = function (that) {
        var headerTexts = that.options.headerTexts,
            dataSet = that.model.dataSetToRender,
            dataTableContainer = that.jQueryToD3(that.container);

        dataTableContainer.append("title").text(that.options.title);

        that.table = dataTableContainer.append("table")
            .attr({
                "aria-live": "assertive",
                "role": "status",
                "aria-relevant": "all"
            });

        var thead = that.table.append("thead");
        var tbody = that.table.append("tbody");

        thead.append("tr")
            .selectAll("th")
            .data(headerTexts)
            .enter()
            .append("th")
            .text(function (header) { return header; });

        tbody.selectAll("tr")
            .data(dataSet)
            .enter()
            .append("tr")
            .selectAll("td")
            .data(that.mapRowData)
            .enter()
            .append("td")
            .text(that.getData);

        that.events.onDataTableCreated.fire();
    };

    gpii.qualityInfrastructure.frontEnd.baseDataTable.draw = function (that, dataSet) {
        var tbody = that.table.select("tbody");
        var rows = tbody.selectAll("tr")
            .data(dataSet);

        // Update rows
        rows.enter()
            .append("tr")
            .selectAll("td")
            .data(that.mapRowData)
            .enter()
            .append("td")
            .text(that.getData);

        rows.exit().remove();

        // Update td cells
        var cells = rows.selectAll("td")
            .data(that.mapRowData)
            .text(that.getData);

        cells.enter()
            .append("td")
            .text(that.getData);

        cells.exit().remove();
    };

    gpii.qualityInfrastructure.frontEnd.baseDataTable.mapRowData = function (that, row) {
        var headers = that.options.headers;
        return headers.map(function (header) {
            return {
                header: header,
                value: row[header]
            };
        });
    };

    gpii.qualityInfrastructure.frontEnd.baseDataTable.getData = function (data) {
        return data.value;
    };

    gpii.qualityInfrastructure.frontEnd.convertDataSet = function (model) {
        return model.dataSet.length > 1 ? model.dataSet : fluid.get(model.dataSet[0], ["data"]);
    };
})(jQuery, fluid);
