﻿var inTalks = window.inTalks || {};

inTalks.clientSideRendering = (function () {
    "use strict";
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
    function isInterestingScore(item) {
        var country = item.Home;
        if (isBadCountry(country) || isGoodCountry(country))
            return true;
        country = item.Away;
        if (isBadCountry(country) || isGoodCountry(country))
            return true;
        return false;
    }
    function prettifyCountry(country) {
        return "<img src='../../Images/" + country + ".png' alt='" + country+ "' />";
    }
    function getMatchHtml(ctx) {

        var home = ctx.CurrentItem.Home;
        var away = ctx.CurrentItem.Away;
        var homeScore = ctx.CurrentItem.HomeScore;
        var awayScore = ctx.CurrentItem.AwayScore;

        var homeHtml = prettifyCountry(home);
        var awayHtml = prettifyCountry(away);

        var score = homeScore + " - " + awayScore;

        if (homeScore !== awayScore)
        {
            if (isInterestingScore(ctx.CurrentItem)) {
                // we now know that at least one of the teams is an interesting country
                // but - is a good home team score good? 
                var goodHomeScore = isGoodCountry(home)
                    || isBadCountry(away);
                if ((goodHomeScore && homeScore > awayScore) 
                        || (!goodHomeScore && homeScore < awayScore)) {
                    score = "<span style='color: blue'>" + score + "</span><a style='padding-left:30px' href='mailto:MarioVaz.Henriques@inmeta.no?subject=muhahaha&body=Hi! I´m devastated to see that etc'>tell a friend</a>";
                } else {
                    score = "<span style='color: red'>" + score + "</span>";
                }
            }
        }
        return "<div><span style='float:left; width:175px;'>" + homeHtml + " - " + awayHtml + " " + home + " - " + away + "</span><span>" + score + "</span></div>";
    }
    return {
        getMatchHtml: getMatchHtml
    }
})();

(function () {
    var oc = {};
    oc.Templates = {};
    oc.Templates.Header = "<hr>";
    oc.Templates.Footer = "<hr>";
    oc.Templates.Item = inTalks.clientSideRendering.getMatchHtml;
    //oc.Templates.Fields = {
    //    "Away": { "View": inTalks.clientSideRendering.prettifyAwayCountry }
    //};
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(oc);

})();
