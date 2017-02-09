import {IAction} from './IAction';

export type SHOW_TABS = 'SHOW_TABS';
export const SHOW_TABS: SHOW_TABS = 'SHOW_TABS';

export interface IShowTabs extends IAction {
	readonly type: SHOW_TABS;
	readonly tabs: chrome.tabs.Tab[];
}

export const showTabs = (tabs: chrome.tabs.Tab[]): IShowTabs => ({
	type: SHOW_TABS,
	tabs: tabs
});
