import {IAction} from './IAction';

export type GET_CURRENT_TABS = 'GET_CURRENT_TABS';
export const GET_CURRENT_TABS: GET_CURRENT_TABS = 'GET_CURRENT_TABS';

export interface IGetCurrentTabs extends IAction {
	readonly type: GET_CURRENT_TABS;
}

export const getCurrentTabs = (): IGetCurrentTabs => ({
	type: GET_CURRENT_TABS
});
