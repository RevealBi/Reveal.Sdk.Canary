import { RevealSdkSettings, DashboardViewer, VisualizationViewer } from "../dist/esm/index.js";

RevealSdkSettings.ServerUrl = "https://samples.revealbi.io/upmedia-backend/reveal-api/";

const btn = document.getElementById("button");
btn.addEventListener('click', (event) => {

});

var dv = new DashboardViewer("#viewer", "Sales", {
    dataSources: [
        { type: "REST", title: "Sales by Category", subtitle: "Excel2Json", url: "https://excel2json.io/api/share/6e0f06b3-72d3-4fec-7984-08da43f56bb9" },
        {
            type: "MicrosoftSqlServer", id: "MySQLServer", title: "My SQL Server", items: [
                { table: "Products", title: "My Products Table" },
                { table: "Orders", title: "My Orders Table" },
                { table: "OrderDetails", title: "My OrderDetails Table" },
            ]
        }
    ],
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

