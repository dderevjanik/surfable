import { IBookmarkAdd } from './BookmarkAdd';
import { IBookmarkAddAs } from './BookmarkAddAs';
import { ITabClose } from './TabClose';
import { ITabNew } from './TabNew';
import { IZoom } from './Zoom';
import { ICapture } from './Capture';

export type Type = IBookmarkAdd | IBookmarkAddAs | ITabNew | ITabClose | IZoom | ICapture;

export { BOOKMARK_ADD } from './BookmarkAdd';
export { BOOKMARK_ADD_AS } from './BookmarkAddAs';
export { TAB_CLOSE } from './TabClose';
export { TAB_NEW } from './TabNew';
export { ZOOM } from './Zoom';
export { CAPTURE } from './Capture';
