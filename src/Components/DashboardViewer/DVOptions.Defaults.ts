import { DVOptions, DVChartType } from "./DVOptions";

export const DefaultOptions: DVOptions = {
    canEdit: true,
    canSave: true,
    canSaveAs: true,
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
        chartTypes: Object.keys(DVChartType).map((k) => k as DVChartType),
        defaultChartType: DVChartType.ColumnChart,        
        canAddPostCalculatedFields: true,
        showAddCalculatedFields: true,
        showDataBlending: true,
        showEditDataSource: true,
        showMachineLearning: false,
    },
}