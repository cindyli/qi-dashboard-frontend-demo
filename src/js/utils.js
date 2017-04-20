/*
Copyright 2017 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://raw.githubusercontent.com/waharnum/qi-dashboard-frontend-demo/GPII-1681/LICENSE.txt
*/

(function ($, fluid) {

    "use strict";

    /**
     * Composed a string using fluid.stringTemplate()
     * @param model {Object} An object that contains two properties `template` and `values` that are used as arguments at calling fluid.stringTemplate().
     * @param strict {Boolean} (optional) If `true`, plain Arrays will fail the test rather than passing.
     * @return {String} Returns a new string with tokens in the `template` being replaced by `values`.
     */
    gpii.qualityInfrastructure.frontEnd.composeStringByTemplate = function (model) {
        return fluid.stringTemplate(model.template, model.values);
    };

})(jQuery, fluid);
