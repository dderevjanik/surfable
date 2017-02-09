import { IAction } from './IAction';

export type TAB_DUPLICATE = 'TAB_DUPLICATE';
export const TAB_DUPLICATE: TAB_DUPLICATE = 'TAB_DUPLICATE';

export interface ITabDuplicate extends IAction {
	readonly type: TAB_DUPLICATE;
};

/**
 * Close current page
 */
export const tabDuplicate = (): ITabDuplicate => ({
	type: TAB_DUPLICATE,
});
