import { IAction } from './IAction';

export type TAB_CLOSE = 'TAB_CLOSE';
export const TAB_CLOSE: TAB_CLOSE = 'TAB_CLOSE';

export interface ITabClose extends IAction {
	readonly type: TAB_CLOSE;
};

/**
 * Close current page
 */
export const tabClose = (): ITabClose => ({
	type: TAB_CLOSE,
});
