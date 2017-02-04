import { ICallback } from './ICallback';
import { ITab } from './ITab';

export interface IQueryOptions {
    active: boolean;
};

export interface ITabs {
    remove: (tabId: number) => void;
    create: (props: {windowId?: number, url?: string}) => void;
    query: (query: IQueryOptions, callback: (payload: ITab[]) => void) => void;
};
