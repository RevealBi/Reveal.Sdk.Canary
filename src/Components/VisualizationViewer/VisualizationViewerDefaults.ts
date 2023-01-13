import { VisualizationViewerOptions } from "./VisualizationViewerOptions";

export const VisualizationViewerDefaults: VisualizationViewerOptions = {
    categoryGroupingSeparator: " - ",
    crosshairs: false,
    hoverTooltips: true,
    showFilters: false,
    showChangeChartType: false,
    showStatisticalFunctions: false,
    menu: {
        items: [],
        showCopy: true,
        showDuplicate: true,
        showExportToExcel: true,
        showExportToImage: true,
        showMenu: false,
        showRefresh: true,
    }
}