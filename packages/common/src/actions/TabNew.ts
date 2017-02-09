import { IAction } from './IAction';

export type TAB_NEW = 'TAB_NEW';
export const TAB_NEW: TAB_NEW = 'TAB_NEW';

export interface ITabNew extends IAction {
	readonly type: TAB_NEW,
	readonly url: string;
};

/**
 * Open a new tab with specific url.
 * @param {string} url - url to open. When empty, it'll open a blank page
 */
export const tabNew = (url: string): ITabNew => ({
	type: TAB_NEW,
	url: url
});
