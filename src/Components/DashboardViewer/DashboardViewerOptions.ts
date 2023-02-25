import { MenuItem } from "../Core/MenuItem";
import { DataSourcesConfig } from "./DataSourcesConfig";

export interface DashboardViewerOptions {
    canEdit: boolean;
    canSave: boolean;
    canSaveAs: boolean;
    dataSources: DataSourcesConfig;
    saveOnServer: boolean;
    startInEditMode: boolean;
    startWithNewVisualization: boolean;
    header: HeaderOptions;
    filters: FilterOptions;
    dataSourceDialog: DataSourceDialogOptions;
    visualizations: VisualizationOptions;
    editor: EditorOptions;
}

export interface DataSourceDialogOptions {
    showSearch: boolean;
    dataSourceProviders: DataSourceProviderType[];
}

export interface EditorOptions {
    chartTypes: ChartType[];
    defaultChartType: ChartType;        
    canAddPostCalculatedFields: boolean;        
    showAddCalculatedFields: boolean;
    showDataBlending: boolean;
    showEditDataSource: boolean;
    showMachineLearning: boolean;
}

export interface HeaderOptions {
    canAddVisualization: boolean;
    showHeader: boolean;
    menu: {
        showMenu: boolean;
        showExportToImage: boolean;
        showExportToExcel: boolean;
        showExportToPowerPoint: boolean;
        showExportToPdf: boolean;
        showRefresh: boolean;
        items: MenuItem[];
    }
}

export interface FilterOptions {
    interactiveFiltering: boolean;
    showFilters: boolean;
    canAddDateFilter: boolean;
    canAddDashboardFiter: boolean;
}

export interface VisualizationOptions {
    canMaximize: boolean;
    categoryGroupingSeparator: string;
    crosshairs: boolean;
    hoverTooltips: boolean;
    showChangeChartType: boolean;
    showStatisticalFunctions: boolean;
    menu: {
        showCopy: boolean;
        showDuplicate: boolean;
        items: MenuItem[];
    }
}

export enum ChartType {
    Pivot = "Pivot",
    Grid = "Grid",
    AreaChart = "AreaChart",
    BarChart = "BarChart",
    BubbleChart = "BubbleChart",
    CandlestickChart = "CandlestickChart",
    ColumnChart = "ColumnChart",
    ComboChart = "ComboChart",
    DoughnutChart = "DoughnutChart",
    FunnelChart = "FunnelChart",
    LineChart = "LineChart",
    OHLC_Chart = "OHLC_Chart",
    PieChart = "PieChart",
    RadialLineChart = "RadialLineChart",
    ScatterChart = "ScatterChart",
    SplineChart = "SplineChart",
    SplineAreaChart = "SplineAreaChart",
    StackedAreaChart = "StackedAreaChart",
    StackedBarChart = "StackedBarChart",
    StackedColumnChart = "StackedColumnChart",
    StepAreaChart = "StepAreaChart",
    StepLineChart = "StepLineChart",
    RadialGauge = "RadialGauge",
    BulletGraph = "BulletGraph",
    LinearGauge = "LinearGauge",
    LabelGauge = "LabelGauge",
    TreeMap = "TreeMap",
    Image = "Image",
    DIY = "DIY",
    TextView = "TextView",
    Indicator = "Indicator",
    IndicatorTarget = "IndicatorTarget",
    Sparkline = "Sparkline",
    TextBox = "TextBox",
    Choropleth = "Choropleth",
    ScatterMap = "ScatterMap",
    TimeSeriesChart = "TimeSeriesChart"
}

export enum DataSourceProviderType {
    AzureSqlServer,
    AzureSynapse,
    GoogleAnalytics,
    GoogleBigQuery,
    MicrosoftSqlServer,
    MySql,
    Oracle,
    Postgres,
    Sybase,
    WebResource,
    Rest,
    S3,
    GoogleDrive,
    GoogleSearchConsole,
    OneDrive,
    Dropbox,
    Box,
    MicrosoftDynamics,
    MicrosoftAnalysisServices,
    MicrosoftReportingServices,
    AmazonRedshift
}
