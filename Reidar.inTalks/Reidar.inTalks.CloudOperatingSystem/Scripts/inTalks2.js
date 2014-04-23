var inTalks = window.inTalks || {};

if (!inTalks["oData"]) {
    inTalks.oData = {};
}
inTalks.oData.football = (function () {
    'use strict';

    function addMatch(home, away, homeScore, awayScore) {
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Football')/items";

        var requestHeaders = {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "content-type": "application/json;odata=verbose"
        }
        var json = JSON.stringify({
            '__metadata': { 'type': 'SP.Data.FootballListItem' },
            'Home': home, 'Away': away, 'HomeScore': homeScore, 'AwayScore': awayScore
        });
        //console.log(json);
        // execute AJAX request 
        $.ajax({
            url: requestUri,
            type: "POST",
            data: json,
            contentType: "SP.Data.FootballListItem",
            headers: requestHeaders,
            success: (function() {console.log("success");}),//readMatches, // on success, refresh the list
            error: onError
        });
    }
    function addMatchInternal() {
        //console.log('addMatchInternal');
        var home = $('#home').val();
        var away = $('#away').val();
        var homeScore = $('#homeScore').val();
        var awayScore = $('#awayScore').val();
        addMatch(home, away, homeScore, awayScore);
        readMatches();
        $('#home').empty();
        $('#away').empty();
        $('#homeScore').empty();
        $('#awayScore').empty();
    }

    function foundMatches(data) {
        $("#responseDiv").empty();

        var odataResults = data.d.results;

        $("<h2>").html("Football matches").appendTo("#responseDiv");

        //console.log(data);
        //console.log(odataResults);

        var ul = $("<ul>");

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
    function addMatchDialog() {

        //Using a generic object.
        var options = {
            title: "Add match",
            width: 500,
            height: 300,
            url: "addMatch.aspx"
        };

        SP.UI.ModalDialog.showModalDialog(options);
    }

    return {
        readMatches: readMatches,
        matchDialog: addMatchDialog,
        addMatch: addMatchInternal
    };
})();


