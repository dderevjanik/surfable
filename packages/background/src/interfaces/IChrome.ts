import { IBookmarks } from './IBookmarks';
import { ICallback } from './ICallback';
import { ITabs } from './ITabs';

export interface IChrome {
    readonly tabs: ITabs;
    readonly bookmarks: IBookmarks;
    readonly runtime: {
        readonly onMessage: {
            readonly addListener: (callback: ICallback) => void
        }
    };
};
