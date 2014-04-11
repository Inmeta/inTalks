var inTalks = window.inTalks || {};

inTalks.clientSideRendering = (function () {
    "use strict";
    // This function provides the rendering logic for home / away fields 
    function countryFieldTemplate(ctx) {

        var fieldValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        if (isBadCountry(fieldValue)) {
            return "<span style='color: red'>" + fieldValue + "</span>";
        }
        if (isGoodCountry(fieldValue)) {
            return "<span style='color: blue'>" + fieldValue + "</span>";
        }
        return fieldValue;
    }
    function isBadCountry(country) {
        if (country === "Portugal" || country === "Brazil")
            return true;
        return false;
    }
    function isGoodCountry(country) {
        if (country === "Spain")
            return true;
        return false;
    }
    function isInterestingScore(ctx) {
        var country = ctx.CurrentItem.Home;
        if (isBadCountry(country) || isGoodCountry(country))
            return true;
        country = ctx.CurrentItem.Away;
        if (isBadCountry(country) || isGoodCountry(country))
            return true;
        return false;
    }
    function prettyScoreFieldTemplate(ctx) {

        if (!isInterestingScore(ctx))
            return ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        var fieldValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];

        // we now know that at least one of the teams is an interesting country
        // but - is a good home team score good? 
        var goodHomeScore = isGoodCountry(ctx.CurrentItem.Home)
            || isBadCountry(ctx.CurrentItem.Away);  

        var homeScore = ctx.CurrentItem.HomeScore;
        var awayScore = ctx.CurrentItem.AwayScore;

        if (homeScore === awayScore)
            return fieldValue;

        if ((goodHomeScore && homeScore > awayScore)
            || (!goodHomeScore && homeScore < awayScore))
            return "<span style='color: blue'>" + fieldValue + "</span>";
        return "<span style='color: red'>" + fieldValue + "</span>";
    }
    return {
        prettyCountryFieldTemplate: countryFieldTemplate,
        prettyHomeScoreFieldTemplate: prettyScoreFieldTemplate,
        prettyAwayScoreFieldTemplate: prettyScoreFieldTemplate
    }
})();

(function () {
    var oc = {};
    oc.Templates = {};
    oc.Templates.Fields = {
        "Away": { "View": inTalks.clientSideRendering.prettyCountryFieldTemplate },
        "Home": { "View": inTalks.clientSideRendering.prettyCountryFieldTemplate },
        "HomeScore": { "View": inTalks.clientSideRendering.prettyHomeScoreFieldTemplate },
        "AwayScore": { "View": inTalks.clientSideRendering.prettyAwayScoreFieldTemplate }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(oc);
})();

