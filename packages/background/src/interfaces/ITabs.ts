import { ICallback } from './ICallback';

export interface ITabs {
    remove: (tabId: number) => void;
    create: (props: {windowId?: number}) => null;
};
