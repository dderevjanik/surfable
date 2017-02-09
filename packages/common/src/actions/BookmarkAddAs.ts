import { IAction } from './IAction';

export type BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';
export const BOOKMARK_ADD_AS: BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';

export interface IBookmarkAddAs extends IAction {
	readonly type: BOOKMARK_ADD_AS;
	readonly title: string;
}

export const bookmarkAddAs = (bookmarkTitle: string): IBookmarkAddAs => ({
	type: BOOKMARK_ADD_AS,
	title: bookmarkTitle
});
