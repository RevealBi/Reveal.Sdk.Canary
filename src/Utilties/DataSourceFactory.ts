import { DataSourceConfig, DataSourcesConfig } from "../Components/DashboardViewer";

declare let $: any;

type DataSourceFactory = {
    [key: string]: {
        dataSourceCreator: () => any;
        dataSourceItemCreator?: (dataSource: any) => any;
    };
};

const dataSourceFactory: DataSourceFactory = {
    "MicrosoftSqlServer": {
        dataSourceCreator: () => new $.ig.RVSqlServerDataSource(),
        dataSourceItemCreator: dataSource => new $.ig.RVSqlServerDataSourceItem(dataSource),
    },
    "REST": {
        dataSourceCreator: () => new $.ig.RVRESTDataSource(),
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