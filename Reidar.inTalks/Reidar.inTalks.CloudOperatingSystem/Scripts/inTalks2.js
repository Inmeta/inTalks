var inTalks = window.inTalks || {};

if (!inTalks["oData"]) {
    inTalks.oData = {};
}
inTalks.oData.football = (function () {
    'use strict';

    function foundMatches(data) {
        $("#responseDiv").empty();

        var odataResults = data.d.results;

        $("<h2>").html("Football matches").appendTo("#results");

        console.log(data);
        console.log(odataResults);

        var ul = $("<ul>");
        // $("<li>").html("at least ONE item").appendTo(ul);

        for (var i = 0; i < odataResults.length; i++) {
            var home = odataResults[i].Home;
            var away = odataResults[i].Away;
            var homeScore = odataResults[i].HomeScore;
            var awayScore = odataResults[i].AwayScore;
            $("<li>").html("<span style='float:left; width:180px'><img src='../images/" + home + ".png' alt='" + home + "' /> <img src='../images/" + away + ".png' alt='" + away + "' /> " + home + " - " + away + "</span>" + homeScore + " - " + awayScore).appendTo(ul);
        }

        ul.appendTo("#responseDiv");
    }

    function onError(err) {
        $("#responseDiv").text("ERROR: " + JSON.stringify(err));
    }

    function readMatches() {
        // clear resultsArea and add spinning gears icon
        $("#responseDiv").empty();
        $("<img>", { "src": "/_layouts/images/GEARS_AN.GIF" }).appendTo("#responseDiv");

        // begin work to call across network
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Football')/items";

        // execute AJAX request 
        var requestHeaders = {
            "accept": "application/json;odata=verbose"
        }
        $.ajax({
            url: requestUri,
            headers: requestHeaders,
            success: foundMatches,
            error: onError
        });
    }
    return {
        readMatches: readMatches
    };
})();
