
import { VisualizationViewerDefaults } from "./VisualizationViewerDefaults";
import { VisualizationViewerOptions } from "./VisualizationViewerOptions";
import { merge } from "../../Utilties/Merge";

declare let $: any;

export class VisualizationViewer {

    private _revealView: any = null;
    static defaultOptions: VisualizationViewerOptions = VisualizationViewerDefaults;    
    options: VisualizationViewerOptions = VisualizationViewer.defaultOptions;

    constructor(selector: string)
    constructor(selector: string, dashboard: any)
    constructor(selector: string, dashboard: any, visualization: string | number)
    constructor(selector: string, dashboard: any, visualization: string | number, options: Partial<VisualizationViewerOptions>)
    constructor(selector: string, dashboard?: any, visualization?: string | number, options?: Partial<VisualizationViewerOptions>) {
        $.ig.RevealSdkSettings.enableNewCharts = true;
        this.init(selector, dashboard, visualization, options);
    }

    private async init(selector: string, dashboard?: any, visualization?: string | number, options?: Partial<VisualizationViewerOptions>): Promise<void> {

        if (typeof dashboard === "string") {
            dashboard = await $.ig.RVDashboard.loadDashboard(dashboard);
        }

        this._revealView = new $.ig.RevealView(selector);
        this._revealView.dashboard = dashboard;

        this._revealView.canEdit = false;
        this._revealView.singleVisualizationMode = true;

        this.setVisualization(dashboard, visualization);

        this.updateOptions(options);
        
        this._revealView.onMenuOpening = (viz: any, e: any) => {
            if (viz === null) {
                return;
            }
            else {
                const vizItems = this.options.menu.items;
                vizItems.forEach(vizItem => {
                    e.menuItems.push(new $.ig.RVMenuItem(vizItem.title, vizItem.icon, () => vizItem.click(viz)));
                })
            }     
        }
    }

    setVisualization(dashboard: any, visualization: string | number | undefined) {
        if (visualization === undefined) return;

        if (typeof visualization === "string") {
            const viz = dashboard.visualizations.getByTitle(visualization);
            if (viz === null) {
                console.log(`Visualization with title ${visualization} is not found`);
                return;
            }

            this._revealView.maximizedVisualization = viz;
        }
        else {
            const viz = dashboard.visualizations[visualization];
            if (viz === null) {
                console.log(`Visualization at index ${visualization} is not found`);
                return;
            }

            this._revealView.maximizedVisualization = viz;
        }
    }

    updateOptions(options: Partial<VisualizationViewerOptions> | undefined) {
        if (options === undefined) {
            this.options = VisualizationViewer.defaultOptions;
        }
        else {
            this.options = merge(this.options, options);
        }

        this._revealView.showExportToExcel = this.options.menu.showExportToExcel;
        this._revealView.showExportImage = this.options.menu.showExportToImage;
        this._revealView.showMenu = this.options.menu.showMenu;
        this._revealView.showRefresh = this.options.menu.showRefresh;

        this._revealView.showFilters = this.options.showFilters;
        
        this._revealView.categoryGroupingSeparator = this.options.categoryGroupingSeparator;
        this._revealView.crosshairsEnabled = this.options.crosshairs;
        this._revealView.hoverTooltipsEnabled = this.options.hoverTooltips;
        this._revealView.showChangeVisualization = this.options.showChangeChartType;
        this._revealView.showStatisticalFunctions = this.options.showStatisticalFunctions;
        this._revealView.canCopyVisualization = this.options.menu.showCopy;
        this._revealView.canDuplicateVisualization = this.options.menu.showDuplicate;
    }
}