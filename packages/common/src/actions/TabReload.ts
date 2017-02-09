import { IAction } from './IAction';

export type TAB_RELOAD = 'TAB_RELOAD';
export const TAB_RELOAD: TAB_RELOAD = 'TAB_RELOAD';

export interface ITabReload extends IAction {
	readonly type: TAB_RELOAD;
};

/**
 * Close current page
 */
export const tabReload = (): ITabReload => ({
	type: TAB_RELOAD
});
