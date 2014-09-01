<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <meta name="WebPartPageExpansion" content="full" />
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
	<link href='https://fonts.googleapis.com/css?family=Josefin+Sans' rel='stylesheet' type='text/css'>
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
    <table style="background-color:#111;height:1080px;width:100%;vertical-align:top" id="everything">
        <tr><td style="height:100%;vertical-align:top">
        <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" Visible="false" />
        <div id="contents"></div>

        <input type="button" value="read projects" onclick="inmeta.ibc.functions.fillInformation($('#contents'));" />
        <input type="button" value="read projects 2" onclick="inmeta.ibc.functions.fillInformation2();" />
        <input type="button" value="animate!" onclick="inmeta.ibc.functions.animateInformation([$('#proj0'), $('#proj1'), $('#proj2'), $('#proj3')]);" />
        </td></tr>
    </table>
</asp:Content>
