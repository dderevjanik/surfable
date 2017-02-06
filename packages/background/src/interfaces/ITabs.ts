import { ICallback } from './ICallback';
import { ITab } from './ITab';

export interface IQueryOptions {
    readonly active: boolean;
};

export interface IZoomSettings {
    readonly ZoomSettingsMode: any;
    readonly ZoomSettingsScope: any;
};

export interface ITabs {
    readonly remove: (tabId: number) => void;
    readonly create: (props: {windowId?: number, url?: string}) => void;
    readonly connect: any;
    readonly sendRequest: any;
    readonly sendMessage: any;
    readonly getSelected: any;
    readonly getAllInWindow: any;
    readonly duplicate: any;
    readonly getCurrent: any;
    readonly getZoom: any;
    readonly setZoom: any;
    readonly query: (query: IQueryOptions, callback: (payload: ITab[]) => void) => void;
    readonly get: any;
    readonly highlight: any;
    readonly update: any;
    readonly move: any;
    readonly reload: any;
    readonly detectLanguage: any;
    readonly captureVisibleTab: any;
    readonly executeScript: any;
    readonly insertCSS: any;
    readonly setZoomSettings: any;
    readonly getZoomSettings: any;
    readonly discard: any;
};

























