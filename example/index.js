import { RevealSdkSettings, DashboardViewer, VisualizationViewer } from "../dist/esm/index.js";

RevealSdkSettings.ServerUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";

const btn = document.getElementById("button");
btn.addEventListener('click', (event) => {

});


//use title
//new VisualizationViewer("#viewer", "Sales", "New vs Renewal Sales");

//or index
//new VisualizationViewer("#viewer", "Sales", 1);

//provide options
// const vv = new VisualizationViewer("#viewer", "Sales", "New vs Renewal Sales", {
//     showChangeChartType: true,
//     menu: {
//         showMenu: true,
//         items: [
//             {
//                 title: "My Custom Item", click: (viz) => {
//                     console.log(`I clicked viz with title: ${viz.title}`);
//                 }
//             }
//         ]
//     }
// });


//const dashboard = await $.ig.RVDashboard.loadDashboard("Marketing");

var dv = new DashboardViewer("#viewer", "Sales");
dv.onDataSourcesRequested = (onComplete) => {
    const restDataSource = new $.ig.RVRESTDataSource();
    restDataSource.id = "RestDataSource"
    restDataSource.url = "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9";
    restDataSource.title = "Sales by Category";
    restDataSource.subtitle = "Excel2Json";
    restDataSource.useAnonymousAuthentication = true;

    onComplete(new $.ig.RevealDataSources([restDataSource], [], true));
}

// dv.onMenuOpening = (viz, e) => {

//     if (viz === null) {
//         return;
//     }

//     console.log(viz)

//     const view = dv.revealView._dashboardView.getWidgetView(viz._widgetModel);

//     console.log(view);
// }



