import {IBookmarkAdd} from './BookmarkAdd';
import {IBookmarkAddAs} from './BookmarkAddAs';
import {ITabClose} from './TabClose';
import {ITabNew} from './TabNew';
import {IZoom} from './Zoom';
import {ICapture} from './Capture';
import {ITabReload} from './TabReload';
import {ITabDuplicate} from './TabDuplicate';
import {IGetFavorites} from './GetFavorites';
import {IShowFavorites} from './ShowFavorites';

export type Type = IBookmarkAdd | IBookmarkAddAs | ITabNew | ITabClose | IZoom | ICapture | ITabReload | ITabDuplicate | IGetFavorites | IShowFavorites;

export {BOOKMARK_ADD} from './BookmarkAdd';
export {BOOKMARK_ADD_AS} from './BookmarkAddAs';
export {TAB_CLOSE} from './TabClose';
export {TAB_NEW} from './TabNew';
export {ZOOM} from './Zoom';
export {CAPTURE} from './Capture';
export {TAB_RELOAD} from './TabReload';
export {TAB_DUPLICATE} from './TabDuplicate';
export {GET_FAVORITES} from './GetFavorites';
export {SHOW_FAVORITES} from './ShowFavorites';
