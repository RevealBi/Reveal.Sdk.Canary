import { ViewerOptions } from "./ViewerOptions";
import { ViewerDefaults } from "./ViewerDefaults";
import { merge } from "../../Utilties/Merge";

declare let $: any;

export class DashboardViewer {
    private _revealView: any = null;    
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

        this._revealView = new $.ig.RevealView(selector);
        this._revealView.dashboard = dashboard;

        this.updateOptions(options);

        this._revealView.onDataSourceSelectionDialogShowing = this.onDataSourceSelectionDialogOpening;
        this._revealView.onDataSourcesRequested = this.onDataSourcesRequested;
        this._revealView.onImageExported = this.onImageExported;
        this._revealView.onLinkedDashboardProviderAsync = this.onLinkedDashboardRequested;
        this._revealView.onSave = this.onSave;
        this._revealView.onVisualizationSeriesColorAssigning = this.onSeriesColorAssigning;
        this._revealView.onTooltipShowing = this.onTooltipShowing;
        this._revealView.onVisualizationDataLoading = this.onDataLoading;
        this._revealView.onVisualizationDataPointClicked = this.onDataPointClicked;

        this._revealView.onMenuOpening = (viz: any, e: any) => {
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

    exportToExcel() : void {
        this._revealView._dashboardView.exportToExcel();
    }

    exportToImage(showDialog: boolean = true) : void | Promise<Element | null> {

        if (showDialog) {
            this._revealView._dashboardView.exportImage();
            return;
        }

        return this._revealView.toImage();        
    }

    exportToPdf() : void {
        this._revealView._dashboardView.exportToFormat("pdf");
    }

    exportToPowerPoint() : void {
        this._revealView._dashboardView.exportToFormat("pptx");
    }

    async loadDashboard(dashboard: any): Promise<void> {
        if (typeof dashboard === "string") {
            dashboard = await $.ig.RVDashboard.loadDashboard(dashboard);
        }
        this._revealView.dashboard = dashboard;
    }

    refresh() {
        this._revealView.refreshDashboardData();
    }

    updateOptions(options: Partial<ViewerOptions> | undefined) {

        if (options === undefined) {
            this.options = DashboardViewer.defaultOptions;
        }
        else {
            this.options = merge(this.options, options);
        }

        this._revealView.canEdit = this.options.canEdit;
        this._revealView.canSave = this.options.canSave;
        this._revealView.canSaveAs = this.options.canSaveAs;
        this._revealView.serverSideSave = this.options.saveOnServer;
        this._revealView.startInEditMode = this.options.startInEditMode;
        this._revealView.startWithNewVisualization = this.options.startWithNewVisualization;

        //header
        this._revealView.showHeader = this.options.header.showHeader;
        this._revealView.canAddVisualization = this.options.header.canAddVisualization;
        this._revealView.showMenu = this.options.header.menu.showMenu;
        this._revealView.showExportToExcel = this.options.header.menu.showExportToExcel;
        this._revealView.showExportImage = this.options.header.menu.showExportToImage;
        this._revealView.showExportToPDF = this.options.header.menu.showExportToPdf;
        this._revealView.showExportToPowerpoint = this.options.header.menu.showExportToPowerPoint;
        this._revealView.showRefresh = this.options.header.menu.showRefresh;

        //filters
        this._revealView.showFilters = this.options.filters.showFilters;
        this._revealView.canAddDashboardFiter = this.options.filters.canAddDashboardFiter;
        this._revealView.canAddDateFilter = this.options.filters.canAddDateFilter;
        this._revealView.interactiveFilteringEnabled = this.options.filters.interactiveFiltering;

        //visualizations
        this._revealView.canMaximizeVisualization = this.options.visualizations.canMaximize;
        this._revealView.categoryGroupingSeparator = this.options.visualizations.categoryGroupingSeparator;
        this._revealView.crosshairsEnabled = this.options.visualizations.crosshairs;
        this._revealView.hoverTooltipsEnabled = this.options.visualizations.hoverTooltips;
        this._revealView.showChangeVisualization = this.options.visualizations.showChangeChartType;
        this._revealView.showStatisticalFunctions = this.options.visualizations.showStatisticalFunctions;
        this._revealView.canCopyVisualization = this.options.visualizations.menu.showCopy;
        this._revealView.canDuplicateVisualization = this.options.visualizations.menu.showDuplicate;

        //dataSourceDialog
        this._revealView.showDataSourceSelectionDialogSearch = this.options.dataSourceDialog.showSearch;
        this._revealView.addDataSourceEnabledProviders = this.options.dataSourceDialog.dataSourceProviders;

        //editor
        this._revealView.availableChartTypes = this.options.editor.chartTypes;
        this._revealView.defaultChartType = this.options.editor.defaultChartType;
        this._revealView.canAddCalculatedFields = this.options.editor.showAddCalculatedFields;
        this._revealView.canAddPostCalculatedFields = this.options.editor.canAddPostCalculatedFields;
        this._revealView.showDataBlending = this.options.editor.showDataBlending;
        this._revealView.showEditDataSource = this.options.editor.showEditDataSource;
        this._revealView.showMachineLearningModelsIntegration = this.options.editor.showMachineLearning;

    }

    updateLayout() {
        this._revealView.updateSize();
    }

    updateTheme() {
        this._revealView.refreshTheme();
    }

    onDataLoading?: (args: any) => void;
    onDataPointClicked?: (vizualization: any, cell: any, row: any) => void;
    onDataSourceSelectionDialogOpening?: (args: any) => void;
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