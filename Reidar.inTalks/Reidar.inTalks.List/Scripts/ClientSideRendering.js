var inTalks = window.inTalks || {};



//inTalks.clientSideRendering = (function () {
//    "use strict";
//    // This function provides the rendering logic for list view 
//    function demoFieldTemplate(ctx) {

//        var fieldValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

//        return "<span style='color: #f00'>" + fieldValue + "</span>";
//    }
//    return {
//        demoFieldTemplate: demoFieldTemplate
//    }
//})();


//(function () {
//    "use strict";

//    // Create object that have the context information about the field that we want to change it's output render  
//    var demoFieldContext = {};
//    demoFieldContext.Templates = {};
//    demoFieldContext.Templates.Fields = {
//        // Apply the new rendering for Home field on List View 
//        "Away": { "View": inTalks.clientSideRendering.demoFieldTemplate }
//    };

//    //SPClientTemplates.TemplateManager.RegisterTemplateOverrides(demoFieldContext);

//})();

(function () {
    var oc = {
        BaseViewID: 1,
        ListTemplateType: 100
    };
    //oc.Templates = {
    //    Header: "<div id='accordion' class='inmeta-demo-header'>",
    //    Item: getDemoHtml,
    //    Footer: "</div>"
    //};
    oc.Templates = {};
    oc.Templates.Fields = {
        "Away": { "View": getDemoHtml }
        //"Title": { "View": getDemoHtml }
};
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(oc);
})();

function getDemoHtml(ctx) {
    //var home = ctx.CurrentItem.Title;
    var home = ctx.CurrentItem.Title;
    var away = ctx.CurrentItem.Away;
    var homeScore = ctx.CurrentItem.HomeScore;
    var awayScore = ctx.CurrentItem.AwayScore;
    console.log("home " + home + " away " + away + ": " + homeScore + " - " + awayScore);
    if ((home === 'A' && homeScore > awayScore) || (away === 'A' && homeScore < awayScore)) {
        return "<span style='color: green'>" + away + "</span>";
    }
    if ((home === 'A' && homeScore < awayScore) || (away === 'A' && homeScore > awayScore)) {
        return "<span style='color: red'>" + away + "</span>";
    }
    return away;
}
