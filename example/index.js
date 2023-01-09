import { DashboardViewer } from "../dist/esm/index.js";

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

const btn = document.getElementById("button");
btn.addEventListener('click', (event) => {

});



