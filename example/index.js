import { DashboardViewer, DVChartType } from "../dist/esm/index.js";

// const dashboard = await $.ig.RVDashboard.loadDashboard("Sales");

var dv = new DashboardViewer("#viewer", "Sales", {
    canEdit: true,
    header: {
        menu: {
            showExportToPdf: false,
            showExportToImage: false,
            items: [
                {
                    title: "My Menu Item", click: () => {
                        console.log("I clicked this");
                    }
                }
            ]
        }
    },
});

dv.dataSourcesRequested = (onComplete) => {
    const restDataSource = new $.ig.RVRESTDataSource();
    restDataSource.id = "RestDataSource"
    restDataSource.url = "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9";
    restDataSource.title = "Sales by Category";
    restDataSource.subtitle = "Excel2Json";
    restDataSource.useAnonymousAuthentication = true;

    onComplete(new $.ig.RevealDataSources([restDataSource], [], true));
}