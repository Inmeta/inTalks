(function () {
    oc.Templates = {};
    oc.Templates.Fields = {
        "Away": { "View": getPrettyCountryHtml },
        "Home": { "View": getPrettyCountryHtml }
    };
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(oc);
})();

function getPrettyCountryHtml(ctx) {
    var fieldValue = ctx.CurrentItem[ctx.CurrentFieldSchema.Name];
    if (fieldValue === "Portugal") {
        return "<span style='color: red'>" + fieldValue + "</span>";
    }
    if (fieldValue === "Spain") {
        return "<span style='color: blue'>" + fieldValue + "</span>";
    }
    return fieldValue;
}

