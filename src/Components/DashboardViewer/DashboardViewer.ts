import { ViewerOptions } from "./ViewerOptions";
import { ViewerDefaults } from "./ViewerDefaults";
import { merge } from "../../Utilties/Merge";

declare let $: any;

export class DashboardViewer {
    private revealView: any = null;    
    static defaultOptions: ViewerOptions = ViewerDefaults;    
    options: ViewerOptions = DashboardViewer.defaultOptions;

    constructor(selector: string)
    constructor(selector: string, dashboard: any)
    constructor(selector: string, dashboard: any, options: Partial<ViewerOptions>)
    constructor(selector: string, dashboard?: any, options?: Partial<ViewerOptions>) {
        $.ig.RevealSdkSettings.enableNewCharts = true;
        this.init(selector, dashboard, options);
    }

    private async init(selector: string, dashboard?: any, options?: Partial<ViewerOptions>): Promise<void> {

        if (typeof dashboard === "string") {
            dashboard = await $.ig.RVDashboard.loadDashboard(dashboard);
        }

        this.revealView = new $.ig.RevealView(selector);
        this.revealView.dashboard = dashboard;

        this.updateOptions(options);

        this.revealView.onDataSourcesRequested = this.onDataSourcesRequested;
        this.revealView.onImageExported = this.onImageExported;
        this.revealView.onLinkedDashboardProviderAsync = this.onLinkedDashboardRequested;
        this.revealView.onSave = this.onSave;
        this.revealView.onVisualizationSeriesColorAssigning = this.onSeriesColorAssigning;
        this.revealView.onTooltipShowing = this.onTooltipShowing;
        this.revealView.onVisualizationDataLoading = this.onDataLoading;
        this.revealView.onVisualizationDataPointClicked = this.onDataPointClicked;

        this.revealView.onMenuOpening = (viz: any, e: any) => {
            if (viz === null) {
                const items = this.options.header.menu.items;
                items.forEach(item => {
                    e.menuItems.push(new $.ig.RVMenuItem(item.title, item.icon, item.click));
                })
            }
            else {
                const vizItems = this.options.visualizations.menu.items;
                vizItems.forEach(vizItem => {
                    e.menuItems.push(new $.ig.RVMenuItem(vizItem.title, vizItem.icon, () => vizItem.click(viz)));
                })
            }

            if (this.onMenuOpening !== undefined) {
                this.onMenuOpening(viz, e);
            }            
        }
    }

    exportToImage() : Promise<Element | null> {
        return this.revealView.toImage();
    }

    async loadDashboard(dashboard: any): Promise<void> {
        if (typeof dashboard === "string") {
            dashboard = await $.ig.RVDashboard.loadDashboard(dashboard);
        }
        this.revealView.dashboard = dashboard;
    }

    refresh() {
        this.revealView.refreshDashboardData();
    }

    updateOptions(options: Partial<ViewerOptions> | undefined) {

        if (options === undefined) {
            this.options = DashboardViewer.defaultOptions;
        }
        else {
            this.options = merge(this.options, options);
        }

        this.revealView.canEdit = this.options.canEdit;
        this.revealView.canSave = this.options.canSave;
        this.revealView.canSaveAs = this.options.canSaveAs;
        this.revealView.serverSideSave = this.options.saveOnServer;
        this.revealView.startInEditMode = this.options.startInEditMode;
        this.revealView.startWithNewVisualization = this.options.startWithNewVisualization;

        //header
        this.revealView.showHeader = this.options.header.showHeader;
        this.revealView.canAddVisualization = this.options.header.canAddVisualization;
        this.revealView.showMenu = this.options.header.menu.showMenu;
        this.revealView.showExportToExcel = this.options.header.menu.showExportToExcel;
        this.revealView.showExportImage = this.options.header.menu.showExportToImage;
        this.revealView.showExportToPDF = this.options.header.menu.showExportToPdf;
        this.revealView.showExportToPowerpoint = this.options.header.menu.showExportToPowerPoint;
        this.revealView.showRefresh = this.options.header.menu.showRefresh;

        //filters
        this.revealView.showFilters = this.options.filters.showFilters;
        this.revealView.canAddDashboardFiter = this.options.filters.canAddDashboardFiter;
        this.revealView.canAddDateFilter = this.options.filters.canAddDateFilter;
        this.revealView.interactiveFilteringEnabled = this.options.filters.interactiveFiltering;

        //visualizations
        this.revealView.canMaximizeVisualization = this.options.visualizations.canMaximize;
        this.revealView.categoryGroupingSeparator = this.options.visualizations.categoryGroupingSeparator;
        this.revealView.crosshairsEnabled = this.options.visualizations.crosshairs;
        this.revealView.hoverTooltipsEnabled = this.options.visualizations.hoverTooltips;
        this.revealView.showChangeVisualization = this.options.visualizations.showChangeChartType;
        this.revealView.showStatisticalFunctions = this.options.visualizations.showStatisticalFunctions;
        this.revealView.canCopyVisualization = this.options.visualizations.menu.showCopy;
        this.revealView.canDuplicateVisualization = this.options.visualizations.menu.showDuplicate;

        //dataSourceDialog
        this.revealView.showDataSourceSelectionDialogSearch = this.options.dataSourceDialog.showSearch;
        this.revealView.addDataSourceEnabledProviders = this.options.dataSourceDialog.dataSourceProviders;

        //editor
        this.revealView.availableChartTypes = this.options.editor.chartTypes;
        this.revealView.defaultChartType = this.options.editor.defaultChartType;
        this.revealView.canAddCalculatedFields = this.options.editor.showAddCalculatedFields;
        this.revealView.canAddPostCalculatedFields = this.options.editor.canAddPostCalculatedFields;
        this.revealView.showDataBlending = this.options.editor.showDataBlending;
        this.revealView.showEditDataSource = this.options.editor.showEditDataSource;
        this.revealView.showMachineLearningModelsIntegration = this.options.editor.showMachineLearning;

    }

    updateLayout() {
        this.revealView.updateSize();
    }

    updateTheme() {
        this.revealView.refreshTheme();
    }

    onDataLoading?: (args: any) => void;
    onDataPointClicked?: (vizualization: any, cell: any, row: any) => void;
    onDataSourcesRequested?: (onComplete: any, trigger: any) => void;
    onEditorClosed?: (args: any) => void;
    onEditorClosing?: (args: any) => void;
    onEditorOpened?: (args: any) => void;
    onEditorOpening?: (args: any) => void;
    onImageExported?: (image: any) => void;
    onLinkedDashboardRequested?: (dashboardId: any, title: any) => Promise<any>;
    onMenuOpening?: (vizualization: any, args: any) => void;
    onSave?: (rv:any, args: any) => void;
    onSeriesColorAssigning?: (visualization: any, defaultColor: any, fieldName: any, categoryName: any) => void;
    onTooltipShowing?: (args: any) => void;
}