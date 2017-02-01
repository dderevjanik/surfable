import { IAction } from './IAction';

export type BOOKMARK_ADD = 'BOOKMARK_ADD';
export const BOOKMARK_ADD: BOOKMARK_ADD = 'BOOKMARK_ADD';

export interface IBookmarkAdd extends IAction {
    type: BOOKMARK_ADD
};

export const bookmarkAdd = (): IBookmarkAdd => ({
    type: BOOKMARK_ADD
});
