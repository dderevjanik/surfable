import * as Action from './ActionTypes';
import { IAction } from './IAction';

/**
 * Add current page to bookmarks
 */
const bookmarkAdd = (): IAction => ({
    type: Action.BOOKMARK_ADD
});

/**
 * Add current page to bookmarks with specific name
 */
const bookmarkAddAs = (bookmarkTitle: string): IAction => ({
    type: Action.BOOKMARK_ADD_AS,
    title: bookmarkTitle
});

/**
 * Close current tab
 */
const tabClose = (): IAction => ({
    type: Action.TAB_CLOSE
});

/**
 * Open new tab
 */
const tabNew = (): IAction => ({
    type: Action.TAB_NEW
});

