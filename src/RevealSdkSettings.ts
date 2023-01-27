declare let $: any;

export class RevealSdkSettings {

    private static _serverUrl: string = "";

    public static set ServerUrl(url: string) {
        this._serverUrl = url;
        $.ig.RevealSdkSettings.setBaseUrl(this._serverUrl);
    }

    public static get ServerUrl(): string {
        return this._serverUrl;
    }

}