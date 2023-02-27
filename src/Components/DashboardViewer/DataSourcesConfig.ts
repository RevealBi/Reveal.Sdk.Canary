import { AmazonAthenaDataSource } from "../DataSources/AmazonAthena";
import { AmazonS3DataSource } from "../DataSources/AmazonS3";
import { GoogleBigQueryDataSource } from "../DataSources/GoogleBigQuery";
import { MicrosoftAzureSqlServerDataSource } from "../DataSources/MicrosoftAzureSqlServer";
import { MicrosoftSqlServerDataSource } from "../DataSources/MicrosoftSqlServer";
import { MySqlDataSource } from "../DataSources/MySql";
import { RestDataSource } from "../DataSources/Rest";
import { SnowflakeDataSource } from "../DataSources/Snowflake";

export type DataSourcesConfig = DataSourceConfig[];
export type DataSourceConfig = AmazonAthenaDataSource
    | AmazonS3DataSource
    | GoogleBigQueryDataSource
    | MicrosoftAzureSqlServerDataSource
    | MicrosoftSqlServerDataSource
    | MySqlDataSource
    | RestDataSource
    | SnowflakeDataSource;