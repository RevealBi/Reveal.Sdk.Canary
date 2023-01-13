import { MenuItem } from "../Core/MenuItem";

export interface VisualizationViewerOptions {
    showFilters: boolean;
    categoryGroupingSeparator: string;
    crosshairs: boolean;
    hoverTooltips: boolean;
    showChangeChartType: boolean;
    showStatisticalFunctions: boolean;
    menu: {
        items: MenuItem[];
        showCopy: boolean;
        showDuplicate: boolean;
        showExportToExcel: boolean;
        showExportToImage: boolean;
        showMenu: boolean;
        showRefresh: boolean;
    }
}