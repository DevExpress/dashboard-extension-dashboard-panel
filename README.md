The **Dashboard Panel** is a [Web Dashboard extension](https://documentation.devexpress.com/#Dashboard/CustomDocument117232) that displays a list of available dashboards and lets you switch between the designer and viewer modes. You can see the dashboard panel in action by visiting the [DevExpress Web Dashboard Demo](https://demos.devexpress.com/Dashboard/).

## Installation

1. Download the latest version of scripts [here](https://github.com/DevExpress/dashboard-extension-dashboard-panel/releases/) and add the *dist* folder in your project containing Web Dashboard.

2. Attach the download script (*dashboard-panel.min.js*) to the project.
```xml
<head>
    <script src="/your-path/dashboard-extension-dashboard-panel/dist/dashboard-panel.min.js"></script>
    <!-- ... -->
</head>
```
3. Attach the download style sheet file (*dashboard-panel.css*) to the project.
```xml
<head>
    <link rel="stylesheet" type="text/css" href="/your-path/dashboard-extension-dashboard-panel/dist/dashboard-panel-style.css" />
    <!-- ... -->
</head>
```

4. Add the ```/dashboard-extension-dashboard-panel/dist/dashboard-panel.html``` file content inside the ```<body>``` section onto the page containing Web Dashboard. 

5. Handle the Web Dashboard's [BeforeRender](https://documentation.devexpress.com/#Dashboard/DevExpressDashboardWebScriptsASPxClientDashboard_BeforeRendertopic) event to perform client-side customization of the Web Dashboard control before the control and its elements have been rendered.
```xml
<!-- For ASP.NET Web Forms -->
<dx:ASPxDashboard ID="ASPxDashboard1" runat="server" DashboardStorageFolder="~/App_Data/Dashboards">
  <ClientSideEvents BeforeRender="onBeforeRender" />
</dx:ASPxDashboard>
```
```C#
@* For ASP.NET MVC *@
@Html.DevExpress().Dashboard(settings => {
    settings.Name = "Dashboard";
    settings.ClientSideEvents.BeforeRender = "onBeforeRender";
}).GetHtml()
```

6. Register the custom item extension to add the Web Page to the Web Dashboard.
```javascript
function onBeforeRender(sender) {
  var dashboardControl = sender.GetDashboardControl();
  dashboardControl.registerExtension(new CustomExtensions.CustomDashboardPanelExtension(dashboardControl));
}
```

## API
The DashboardPanelExtension class contains the following public properties:

- **DashboardPanelExtension.allowSwitchToDesigner** property - Gets or sets whether you can switch into the designer mode. This property control the visibility of the *Edit in Designer* button.  
- **DashboardPanelExtension.name** property - Gets a unique name of a Web Dashboard extension. The default value is 'dashboard-panel'.
- **DashboardPanelExtension.panelWidth** property - Gets or sets the width of the Dashboard Panel extension. The default value is 250 px.
- **DashboardPanelExtension.visible** property - Gets or sets whether the Dashboard Panel is visible.


## Development 

You can use this extension code as a base for your own [dashboard item extension](https://documentation.devexpress.com/#Dashboard/CustomDocument117546) development. 

Before you start, we advise you to [fork](https://help.github.com/articles/fork-a-repo/) this repository and work with your own copy.

1. Clone this extension to get a local copy of the repository.
```Batchfile
git clone https://github.com/DevExpress/dashboard-extension-dashboard-panel.git
cd dashboard-extension-dashboard-panel
```

2. In this extension we use the [Node.js](https://nodejs.org/en/about/) toolset. Use the command below to install all modules listed as dependencies in the extension's **package.json** file.
```Batchfile
npm install
```

3. Then install [Gulp](http://gulpjs.com) to build the solution. You can install it globally...
```Batchfile
npm install -g gulp
gulp build
```

... or use a local Gulp version.
```Batchfile
.\node_modules\.bin\gulp build
```

You can find the resulting files at ```...\dashboard-extension-dashboard-panel\dist```:
**dashboard-panel.js** and **dashboard-panel.min.js**.


## License

This extension is distributed under the **MIT** license (free and open-source), but can only be used with a commercial DevExpress Dashboard software product. You can [review the license terms](https://www.devexpress.com/Support/EULAs/NetComponents.xml) or [download a free trial version](https://go.devexpress.com/DevExpressDownload_UniversalTrial.aspx) of the Dashboard suite at [DevExpress.com](https://www.devexpress.com).

## Support & Feedback

* Follow [this guideline](https://www.devexpress.com/Support/Center/Question/Details/T491859) for general information about a custom extension.
* To learn how to create a custom item, see the following [KB article](https://www.devexpress.com/Support/Center/Question/Details/T491984).
* To address questions regarding the Web Dashboard and JavaScript API, use [DevExpress Support Center](https://www.devexpress.com/Support/Center).
