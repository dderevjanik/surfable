import { IBookmarks } from './IBookmarks';
import { ICallback } from './ICallback';
import { ITabs } from './ITabs';

export interface IChrome {
    tabs: ITabs;
    bookmarks: IBookmarks;
    runtime: {
        onMessage: {
            addListener: (callback: ICallback) => void
        }
    };
};
