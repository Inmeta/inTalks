﻿var inTalks = window.inTalks || {};

if (!inTalks["oData"]) {
    inTalks.oData = {};
}
inTalks.oData.cos = (function () {
    'use strict';

    function weGotLucky(data) {
        $("#responseDiv").empty();

        var odataResults = data.d.results;

        $("<h2>").html("Lists in this site").appendTo("#results");

        var ul = $("<ul>");
        // $("<li>").html("at least ONE item").appendTo(ul);

        for (var i = 0; i < odataResults.length; i++) {
            $("<li>").html(odataResults[i].Title).appendTo(ul);
        }

        ul.appendTo("#responseDiv");
    }

    function onError(err) {
        $("#responseDiv").text("ERROR: " + JSON.stringify(err));
    }

    function dir() {
        // clear resultsArea and add spinning gears icon
        $("#responseDiv").empty();
        $("<img>", { "src": "/_layouts/images/GEARS_AN.GIF" }).appendTo("#responseDiv");

        // begin work to call across network
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists";

        // execute AJAX request 
        var requestHeaders = {
            "accept": "application/json;odata=verbose"
        }
        $.ajax({
            url: requestUri,
            headers: requestHeaders,
            success: weGotLucky,
            error: onError
        });
    }
    return {
        dir: dir
    };
})();
