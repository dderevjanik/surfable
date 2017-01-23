import { IMessage } from './IMessage';

interface IMutedInfo {
    muted: boolean;
}

interface ITab {
    active: boolean;
    audible: boolean;
    autoDiscardable: boolean;
    discarded: boolean;
    favIconUrl: string;
    height: number;
    highlighted: boolean;
    id: number;
    incognito: boolean;
    index: number;
    mutedInfo: IMutedInfo;
    pinned: boolean;
    selected: boolean;
    status: string;
    title: string;
    url: string;
    width : number;
    windowId : number;
}

interface ISender {
    frameId: number;
    id: string;
    tab: ITab;
    url: string;
}

export type ICallback = (message: IMessage, sender: ISender, response: any, port: any) => void;
