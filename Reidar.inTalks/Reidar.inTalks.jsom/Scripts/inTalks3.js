var inTalks = window.inTalks || {};

inTalks.jsom = (function () {
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

    var appContext = new SP.ClientContext.get_current();
    var hostContext = new SP.AppContextSite(appContext, hostweburl);

    function createList(name) {
        if (name === undefined || name === null || name.length === 0)
            return;

        var web = appContext.get_web();

        // info about what we want to create
        var lci = new SP.ListCreationInformation();
        lci.set_title(name);
        lci.set_description("Announcement list " + name);
        lci.set_templateType(SP.ListTemplateType.announcements);

        // create the list "under" the web
        web.get_lists().add(lci);
        appContext.load(web);

        // Create list 
        appContext.executeQueryAsync(function (data) {
            console.log("List created!");
            $("<a>", {"href": "../lists/" + name}).html(name).appendTo("#links");
        }, function (sender, args) {
            console.log("ERROR");
            console.log(args.get_message());
        });
    }
    return {
        createList: createList
    }
})();