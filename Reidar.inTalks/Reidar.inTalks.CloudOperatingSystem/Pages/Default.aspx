﻿<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/inTalks.js"></script>
    <script type="text/javascript" src="../Scripts/inTalks2.js"></script>
<script type="text/javascript" src="/_layouts/SP.js"></script>

 <script type="text/javascript" src="/_layouts/SP.UI.Dialog.js"></script>

 <script type="text/javascript" src="/_layouts/SP.Core.js"></script></asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    OData
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
        <div id="responseDiv">OData response may, or may not, appear here</div>
        <p>
            <input type="button" value="dirr" onclick="inTalks.oData.cos.dir();" />
        </p>
        <p>
            <input type="button" value="football" onclick="inTalks.oData.football.readMatches();" />
        </p>
        <p>
            <input type="button" value="add match" onclick="inTalks.oData.football.matchDialog();" />
        </p>
        <div>
            <div><span style='float:left;width:100px'>Home team: </span><input type="text" id="home" /></div>
            <div><span style='float:left;width:100px'>Away team: </span><input type="text" id="away" /></div>
            <div><span style='float:left;width:100px'>Home score:</span><input type="text" id="homeScore" /></div>
            <div><span style='float:left;width:100px'>Away score:</span><input type="text" id="awayScore" /></div>
            <input type="button" value="add match" onclick="inTalks.oData.football.addMatch();" />
        </div>
    </div>

</asp:Content>
