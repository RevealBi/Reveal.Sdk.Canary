import { DataSourceBase } from "./DataSourceBase";

export type MsSqlServerDataSource = DataSourceBase & {
    type: "MicrosoftSqlServer";
    database?: string;
    host?: string;
    port?: string;
    schema?: string;
    items?: MsSqlServerDataSourceItem[];
}

export type MsSqlServerDataSourceItem = DataSourceBase & {
    table?: string;
    procedure?: string;
    procedureParameters?: string;
}