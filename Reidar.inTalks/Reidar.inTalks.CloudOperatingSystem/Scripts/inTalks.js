var inTalks = window.inTalks || {};

inTalks.oData = (function () {

    function dir() {
        var resultElem = document.getElementById("responseDiv");
        resultElem.innerHTML = "<div style='color:red'>we've got results!</div>";
    }
    return {
        dir: dir
    };
})();
