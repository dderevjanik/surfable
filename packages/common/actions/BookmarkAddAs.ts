import { IAction } from './IAction';

export type BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';
export const BOOKMARK_ADD_AS: BOOKMARK_ADD_AS = 'BOOKMARK_ADD_AS';

export interface IBookmarkAddAs extends IAction {
    type: BOOKMARK_ADD_AS;
    title: string;
};

export const bookmarkAddAs = (bookmarkTitle: string): IBookmarkAddAs => ({
    type: BOOKMARK_ADD_AS,
    title: bookmarkTitle
});
