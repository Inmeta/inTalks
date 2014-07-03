<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
	<link href='http://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
    <style type="text/css">
        #contents {
            background-color: #111;
        }
        #s4-ribbonrow {
            display: none;
        }
        h1 {
            font-family: "Josefin Sans", "Segoe UI Light", "Gill Sans", 'Lucida Bright', sans-serif;
            font-size: 12vmin;
            font-size: 10vm;
            color: #aaa;
        }
        p {
            font-family: "Josefin Sans", "Segoe UI Light", "Gill Sans", 'Lucida Bright', sans-serif;
            font-size: 3vmin;
            font-size: 3vm;
            color: #aaa;
        }
        #contents div {
            font-family: "Segoe UI Light", "Josefin Sans", "Gill Sans", 'Lucida Bright', sans-serif;
            font-size: 3vmin;
            font-size: 3vm;
            color: #aaa;
        }

    </style>
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <div style="background-color:#111">
        <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" Visible="false" />
        <div id="contents"></div>
        <h1>Inmarsat</h1>
        <p>Inmarsat er et prosjekt. Ålesund. Intranett og ekstranett.</p>
                <input type="button" value="dirr" onclick="inmeta.ibc.functions.fillInformation($('#contents'));" />
    </div>
</asp:Content>
