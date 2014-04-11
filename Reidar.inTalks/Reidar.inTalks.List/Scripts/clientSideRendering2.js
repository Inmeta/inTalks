var inTalks = window.inTalks || {};

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
    function colorizeCountry(country) {
        if (isBadCountry(country)) {
            return "<span style='color:red'>" + country + "</span>";
        } else if (isGoodCountry(country)) {
            return "<span style='color:blue'>" + country + "</span>";
        }
        return country;
    }
    function getMatchHtml(ctx) {

        var home = ctx.CurrentItem.Home;
        var away = ctx.CurrentItem.Away;
        var homeScore = ctx.CurrentItem.HomeScore;
        var awayScore = ctx.CurrentItem.AwayScore;

        var homeHtml = colorizeCountry(home);
        var awayHtml = colorizeCountry(away);

        var score = homeScore + " - " + awayScore;

        if (homeScore !== awayScore)
        {
            if (isInterestingScore(ctx.CurrentItem)) {
                // we now know that at least one of the teams is an interesting country
                // but - is a good home team score good? 
                var goodHomeScore = isGoodCountry(home)
                    || isBadCountry(away);
                if (goodHomeScore) {
                    if (homeScore > awayScore) {
                        score = "<span style='color: blue'>" + score + "</span>";
                    } else {
                        score = "<span style='color: red'>" + score + "</span>";
                    }
                } else {
                    if (homeScore < awayScore) {
                        score = "<span style='color: blue'>" + score + "</span>";
                    } else {
                        score = "<span style='color: red'>" + score + "</span>";
                    }
                }
            }
        }
        return "<div><span style='float:left; width:150px;'>" + homeHtml + " - " + awayHtml + "</span><span>" + score + "</span></div>";
    }
    return {
        getMatchHtml: getMatchHtml
    }
})();

(function () {
    var oc = {};
    oc.Templates = {};
    oc.Templates.Item = inTalks.clientSideRendering.getMatchHtml;
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(oc);
})();
