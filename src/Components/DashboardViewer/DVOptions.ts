export interface DVOptions {
    canEdit: boolean;
    canSave: boolean;
    canSaveAs: boolean;
    startInEditMode: boolean;
    startWithNewVisualization: boolean;

    header: {
        showHeader: boolean;
        canAddVisualization: boolean;
        menu: {
            showMenu: boolean;
            showExportToImage: boolean;
            showExportToExcel: boolean;
            showExportToPowerPoint: boolean;
            showExportToPdf: boolean;
            showRefresh: boolean;
            items: DVMenuItem[];
        }
    }

    filters: {
        interactiveFiltering: boolean;
        showFilters: boolean;
        canAddDateFilter: boolean;
        canAddDashboardFiter: boolean;
    }

    dataSourceDialog: {
        showSearch: boolean;
    }

    visualizations: {
        canMaximize: boolean;
        categoryGroupingSeparator: string;
        crosshairs: boolean;
        hoverTooltips: boolean;
        showChangeChartType: boolean;
        showStatisticalFunctions: boolean;
        menu: {
            showCopy: boolean;
            showDuplicate: boolean;
            items: DVMenuItem[];
        }
    }

    editor: {
        chartTypes: DVChartType[];
        defaultChartType: DVChartType;        
        canAddPostCalculatedFields: boolean;        
        showAddCalculatedFields: boolean;
        showDataBlending: boolean;
        showEditDataSource: boolean;
        showMachineLearning: boolean;
    }
}

export interface DVMenuItem {
    icon: string;
    title: string;
    click: (viz: any) => void;
}

export enum DVChartType {
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