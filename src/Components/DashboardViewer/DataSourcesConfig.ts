import { MsSqlServerDataSource } from "../DataSources/MicrosoftSqlServer";
import { RestDataSource } from "../DataSources/Rest";

export type DataSourcesConfig = DataSourceConfig[];
export type DataSourceConfig = MsSqlServerDataSource | RestDataSource;