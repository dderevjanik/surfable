import { IBookmarkAdd } from './BookmarkAdd';
import { IBookmarkAddAs } from './BookmarkAddAs';
import { ITabClose } from './TabClose';
import { ITabNew } from './TabNew';

export type Type =
    IBookmarkAdd | IBookmarkAddAs |
    ITabNew | ITabClose;

export { BOOKMARK_ADD } from './BookmarkAdd';
export { BOOKMARK_ADD_AS } from './BookmarkAddAs';
export { TAB_CLOSE } from './TabClose';
export { TAB_NEW } from './TabNew';
