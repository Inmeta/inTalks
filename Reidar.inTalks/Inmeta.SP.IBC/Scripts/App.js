'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    getUserName();
});

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above call is successful
// It replaces the contents of the 'message' element with the user name
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
}

// This function is executed if the above call fails
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}

var inmeta = window.inmeta || {};

if (!inmeta["ibc"]) {
    inmeta.ibc = {};
}
inmeta.ibc.functions = (function () {
    'use strict';
    function fillInformation(contentsElement) {
        readProjects();
        //var projects = getInformation();
        //var outerDiv = $("<div>");
        //for (var i = 0; i < projects.length; i++) {
        //    var title = projects[i].title;
        //    var body = projects[i].body;
        //    var team = projects[i].team;
        //    $("<div>").html("<h1>" + title + "</h1><p>" + body + "</p>").appendTo(outerDiv);
        //}
        //outerDiv.appendTo(contentsElement);
    }
    function readProjects() {
        // clear resultsArea and add spinning gears icon
        $("#contents").empty();
        $("<img>", { "src": "/_layouts/images/GEARS_AN.GIF" }).appendTo("#contents");

        // begin work to call across network
        var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('Broadcast items')/items";

        // execute AJAX request 
        var requestHeaders = {
            "accept": "application/json;odata=verbose"
        }
        $.ajax({
            url: requestUri,
            headers: requestHeaders,
            success: foundProjects,
            error: onError
        });
    }
    function onError(err) {
        $("#contents").text("ERROR: " + JSON.stringify(err));
    }
    function foundProjects(data) {
        $("#contents").empty();

        var projects = /* JSON.*/ data.d.results;

        var outerDiv = $("<div>");
        for (var i = 0; i < projects.length; i++) {
            var title = projects[i].Title;
            var body = projects[i].Body;
            var team = projects[i].TeamMembers;
            var bodyEl = $("<p>").html(body);
            console.log(bodyEl.html());
            $("<div>").html("<h1>" + title + "</h1><p>" + body + "</p>").appendTo(outerDiv);
        }
        outerDiv.appendTo($("#contents"));
    }
    function getInformation() {
        var info = [];
        var team = [];
        team[0] = "Pål";
        team[1] = "Reidar";
        team[2] = "Mario";
        team[3] = "Anders";
        team[4] = "Jon";
        team[5] = "Knut";
        var team2 = []; team2[0] = "Svarteper";
        info[0] = { title: "Inmarsat", body: "is a project", team: team };
        info[1] = { title: "Espire", body: "First rule of Espire: Nobody talks about Espire", team: team2 };
        return info;
    }
    return {
        getInformation: getInformation,
        fillInformation: fillInformation
    }
})();
