import { DataSourceBase } from "./DataSourceBase";

export type MicrosoftSqlServerDataSource = DataSourceBase & {
    type: "MicrosoftSqlServer";
    database?: string;
    host?: string;
    port?: string;
    schema?: string;
    items?: MicrosoftSqlServerDataSourceItem[];
}

export type MicrosoftSqlServerDataSourceItem = DataSourceBase & {
    table?: string;
    procedure?: string;
    procedureParameters?: string;
}