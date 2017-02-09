import { IAction } from './IAction';

export type BOOKMARK_ADD = 'BOOKMARK_ADD';
export const BOOKMARK_ADD: BOOKMARK_ADD = 'BOOKMARK_ADD';

export interface IBookmarkAdd extends IAction {
	readonly type: BOOKMARK_ADD;
}

/**
 * Add current page to bookmarks
 */
export const bookmarkAdd = (): IBookmarkAdd => ({
	type: BOOKMARK_ADD
});
