import { DashboardViewerOptions, ChartType } from "./DashboardViewerOptions";

export const DashboardViewerDefaults: DashboardViewerOptions = {
    canEdit: true,
    canSave: true,
    canSaveAs: true,
    dataSources: [],
    saveOnServer: true,
    startInEditMode: false,
    startWithNewVisualization: false,

    header: {
        showHeader: true,
        canAddVisualization: true,
        menu: {
            showMenu: true,
            showExportToExcel: true,
            showExportToImage: true,
            showExportToPdf: true,
            showExportToPowerPoint: true,
            showRefresh: true,
            items: [],
        },
    },

    filters: {
        canAddDashboardFiter: true,
        canAddDateFilter: true,
        interactiveFiltering: true,
        showFilters: true,
    },

    dataSourceDialog: {
        showSearch: false,
        dataSourceProviders: [],
    },

    visualizations: {
        canMaximize: true,
        categoryGroupingSeparator: " - ",
        crosshairs: false,
        hoverTooltips: true,
        showChangeChartType: true,
        showStatisticalFunctions: true,
        menu: {
            showCopy: true,
            showDuplicate: true,
            items: []
        }
    },

    editor: {
        chartTypes: Object.keys(ChartType).map((k) => k as ChartType),
        defaultChartType: ChartType.ColumnChart,        
        canAddPostCalculatedFields: true,
        showAddCalculatedFields: true,
        showDataBlending: true,
        showEditDataSource: true,
        showMachineLearning: false,
    },
}