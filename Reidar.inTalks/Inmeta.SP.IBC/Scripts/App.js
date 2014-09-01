'use strict';

//var context = SP.ClientContext.get_current();
//var user = context.get_web().get_currentUser();

//// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
//$(document).ready(function () {
//    getUserName();
//});

//// This function prepares, loads, and then executes a SharePoint query to get the current users information
//function getUserName() {
//    context.load(user);
//    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
//}

//// This function is executed if the above call is successful
//// It replaces the contents of the 'message' element with the user name
//function onGetUserNameSuccess() {
//    $('#message').text('Hello ' + user.get_title());
//}

//// This function is executed if the above call fails
//function onGetUserNameFail(sender, args) {
//    alert('Failed to get user name. Error:' + args.get_message());
//}

var inmeta = window.inmeta || {};

if (!inmeta["ibc"]) {
    inmeta.ibc = {};
}
inmeta.ibc.functions = (function () {
    'use strict';

    function getQueryStringParameter(param) {
        var params = document.URL.split("?")[1].split("&");
        var strParams = "";
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split("=");
            if (singleParam[0] == param) {
                return singleParam[1];
            }
        }
    };
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    // Load the SP.RequestExecutor.js file.
    $.getScript(hostweburl + "/_layouts/15/SP.RequestExecutor.js");

    function animateProjects(elements) {
        setTimeout((function () {
            var element1 = elements[0];
            element1.toggle("slow");
            //    element1.animate({ left: "+=50", height: "toggle" }, 5000, function () {
            //});
            elements = rotateArray(elements);
            element1 = elements[0];
            element1.toggle("slow");
            animateProjects(elements);
        }), 15000);
    }
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
    function fillInformation2() {
        // clear resultsArea and add spinning gears icon
        $("#contents").empty();
        $("<img>", { "src": "/_layouts/images/GEARS_AN.GIF" }).appendTo("#contents");

        var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
        var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));

        var appContext = new SP.ClientContext.get_current();
        var hostContext = new SP.AppContextSite(appContext, hostweburl);
        //$("#contents").text("Hostweb " + hostweburl);

        // begin work to call across network
        var requestUri = hostweburl + "/_api/Web/Lists/getByTitle('Projects')/items";

        // execute AJAX request 
        //var requestHeaders = {
        //    "accept": "application/json;odata=verbose"
        //}
        //$.ajax({
        //    url: requestUri,
        //    headers: requestHeaders,
        //    success: foundProjects,
        //    error: onError
        //});
        var executor = new SP.RequestExecutor(appweburl.toLowerCase());
        executor.executeAsync({
            url: appweburl +
                "/_api/SP.AppContextSite(@target)/web/lists/getByTitle('Projects')/Items?@target='" +
                hostweburl + "'&select=Title,Body,TeamMembers",
            method: "GET",
            headers: { "accept": "application/json;odata=verbose" },
            success: foundProjects,
            error: function (data) { console.log(data); }
        });
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

        var projects = data.d.results;

        var elements = [];

        var outerDiv = $("<div>");
        for (var i = 0; i < projects.length; i++) {
            var title = projects[i].Title;
            var body = projects[i].Body;
            var team = projects[i].TeamMembers;
            var bodyEl = $("<p>").html(body);
            var element = $("<div>").html("<h1>" + title + "</h1><p>" + body + "</p>").attr("id", "proj" + i);
            element.appendTo(outerDiv);
            elements[i] = element;
        }
        outerDiv.appendTo($("#contents"));
        animateInformation(elements);
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
    function animateInformation(elements) {
        for (var i = 1; i < elements.length; i++) {
            var element = elements[i];
            element.toggle();
            //element.animate({opacity: 0.25, left: "+=50", height: "toggle"}, 200, function () {
            //});
        }
        animateProjects(elements);
    }
    function rotateArray(array) {
        if (array.length < 2)
            return array;
        var firstElement = array[0];
        for (var i = 0; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array[array.length - 1] = firstElement;
        return array;
    }
    return {
        getInformation: getInformation,
        fillInformation: fillInformation,
        fillInformation2: fillInformation2,
        animateInformation: animateInformation,
        getQueryStringParameter: getQueryStringParameter,
    }
})();
