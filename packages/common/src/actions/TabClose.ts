import { IAction } from './IAction';

export type TAB_CLOSE = 'TAB_CLOSE';
export const TAB_CLOSE: TAB_CLOSE = 'TAB_CLOSE';

export interface ITabClose extends IAction {
    type: TAB_CLOSE
};

export const tabClose = (): ITabClose => ({
    type: TAB_CLOSE,
});
