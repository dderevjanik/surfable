interface IMutedInfo {
    readonly muted: boolean;
}

export interface ITab {
    readonly active: boolean;
    readonly audible: boolean;
    readonly autoDiscardable: boolean;
    readonly discarded: boolean;
    readonly favIconUrl: string;
    readonly height: number;
    readonly highlighted: boolean;
    readonly id: number;
    readonly incognito: boolean;
    readonly index: number;
    readonly mutedInfo: IMutedInfo;
    readonly pinned: boolean;
    readonly selected: boolean;
    readonly status: string;
    readonly title: string;
    readonly url: string;
    readonly width : number;
    readonly windowId : number;
}
