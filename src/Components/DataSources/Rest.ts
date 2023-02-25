import { DataSourceBase } from "./DataSourceBase";

export type RestDataSource = DataSourceBase & {
    type: "REST";
    url?: string;
    useAnonymousAuthentication?: boolean;
}