/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/fluid-project/chartAuthoring/master/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    fluid.registerNamespace("gpii.tests");

    jqUnit.test("Test the panel creation factory function with a stub JSONP file", function () {
        jqUnit.expect(1);

        // override defaults to use stub file
        gpii.qualityInfrastructure.frontEnd.qualityInfrastructureSettings = {
            host: "../js/stubs",
            apiVersion: "a",
            endpointSuffix: ".json"
        };

        // var repo = "fluid-project/infusion";
        // var commitsPanel = gpii.qualityInfrastructure.frontEnd.createCommitsPanel(repo, commitsContainerSelector);

        var commitsContainerSelector = ".gpiic-createPanelsTests-commits";
        var commitsContainer = $(commitsContainerSelector)[0];

        jqUnit.assertEquals("Commits container has expected number of children", 2, commitsContainer.childNodes.length);

    });

})(jQuery, fluid);
