import { DataSourceConfig, DataSourcesConfig } from "../Components/DashboardViewer";

declare let $: any;

type DataSourceFactory = {
    [key: string]: {
        dataSourceCreator: () => any;
        dataSourceItemCreator?: (dataSource: any) => any;
    };
};

const dataSourceFactory: DataSourceFactory = {
    "AmazonAthena": {
        dataSourceCreator: () => new $.ig.RVAthenaDataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVAthenaDataSourceItem(dataSource),
    },
    "AmazonS3": {
        dataSourceCreator: () => new $.ig.RVS3DataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVS3DataSourceItem(dataSource),
    },
    "GoogleBigQuery": {
        dataSourceCreator: () => new $.ig.RVBigQueryDataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVBigQueryDataSourceItem(dataSource),
    },
    "MicrosoftAzureSqlServer": {
        dataSourceCreator: () => new $.ig.RVAzureSqlDataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVAzureSqlDataSourceItem(dataSource),
    },
    "MicrosoftSqlServer": {
        dataSourceCreator: () => new $.ig.RVSqlServerDataSource(),
        dataSourceItemCreator: dataSource => new $.ig.RVSqlServerDataSourceItem(dataSource),
    },
    "MySql": {
        dataSourceCreator: () => new $.ig.RVMySqlDataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVMySqlDataSourceItem(dataSource),
    },
    "REST": {
        dataSourceCreator: () => new $.ig.RVRESTDataSource(),
    },
    "Snowflake": {
        dataSourceCreator: () => new $.ig.RVSnowflakeDataSource(),
        //dataSourceItemCreator: dataSource => new $.ig.RVSnowflakeDataSourceItem(dataSource),
    },
};

export function getRVDataSources(dataSources: DataSourcesConfig) {
    const rvDataSources: any[] = [];
    let rvDataSourceItems: any[] = [];

    dataSources.forEach(ds => {
        const creator = dataSourceFactory[ds.type].dataSourceCreator;
        if (!creator) {
            throw new Error(`Unsupported dataSourceType: ${ds.type}`);
        }

        var rvDataSource = creator();
        setRVDataSourceProperties(ds, rvDataSource);
        rvDataSources.push(rvDataSource);
        rvDataSourceItems = getRVDataSourceItems(ds, rvDataSource);
    });

    return { dataSources: rvDataSources, dataSourceItems: rvDataSourceItems };
}

function getRVDataSourceItems(dataSource: DataSourceConfig, rvDataSource: any) {
    const rvDataSourceItems: any[] = [];

    const items = dataSource["items"];
    if (items) {
        const creator = dataSourceFactory[dataSource.type].dataSourceItemCreator;
        if (!creator) {
            throw new Error(`Unsupported dataSourceItemType: ${dataSource.type}`);
        }

        items.forEach((item: any) => {
            const dsi = creator(rvDataSource)
            setRVDataSourceItemProperties(item, dsi);
            rvDataSourceItems.push(dsi);
        })
    }

    return rvDataSourceItems;
}

function setRVDataSourceProperties(dataSource: DataSourceConfig, rvDataSource: any) {

    copyObjectProperties(dataSource, rvDataSource);

    if (dataSource.type === "REST") {
        rvDataSource.useAnonymousAuthentication = dataSource.useAnonymousAuthentication ?? true;
    }
}

function setRVDataSourceItemProperties(dataSourceItem: any, rvDataSourceItem: any) {
    copyObjectProperties(dataSourceItem, rvDataSourceItem);
}

function copyObjectProperties(source: any, target: any) {
    for (const prop in source) {
        if (source.hasOwnProperty(prop)) {
            target[prop] = source[prop];
        }
    }
}