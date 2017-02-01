import { IAction } from './IAction';

export type TAB_NEW = 'TAB_NEW';
export const TAB_NEW: TAB_NEW = 'TAB_NEW';

export interface ITabNew extends IAction {
    type: TAB_NEW
};

export const tabNew = (): ITabNew => ({
    type: TAB_NEW,
});
