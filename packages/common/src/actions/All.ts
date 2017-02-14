import { IAction } from './IAction';
import { INothing } from './Nothing';
import { IBookmarkAdd } from './BookmarkAdd';
import { IBookmarkAddAs } from './BookmarkAddAs';
import { ITabClose } from './TabClose';
import { ITabNew } from './TabNew';
import { IZoom } from './Zoom';
import { ICapture } from './Capture';
import { ITabReload } from './TabReload';
import { ITabDuplicate } from './TabDuplicate';
import { IGetFavorites } from './GetFavorites';
import { IShowFavorites } from './ShowFavorites';
import { IGetCurrentTabs } from './GetCurrentTabs';
import { IShowTabs } from './ShowTabs';

export type PRINT_PAGE = 'PRINT_PAGE';
export const PRINT_PAGE: PRINT_PAGE = 'PRINT_PAGE';
export interface IPrintPage extends IAction {
	type: PRINT_PAGE;
}

export type TAB_SWITCH = 'TAB_SWITCH';
export const TAB_SWITCH: TAB_SWITCH = 'TAB_SWITCH';

export interface ITabSwitch extends IAction {
	type: TAB_SWITCH;
	id: number;
}

export type Type = IBookmarkAdd | IBookmarkAddAs | ITabNew | ITabClose | IZoom | ICapture | ITabReload | ITabDuplicate | IGetFavorites | IShowFavorites | IShowTabs | IGetCurrentTabs | IPrintPage | INothing | ITabSwitch;

export { BOOKMARK_ADD } from './BookmarkAdd';
export { BOOKMARK_ADD_AS } from './BookmarkAddAs';
export { TAB_CLOSE } from './TabClose';
export { TAB_NEW } from './TabNew';
export { ZOOM } from './Zoom';
export { CAPTURE } from './Capture';
export { TAB_RELOAD } from './TabReload';
export { TAB_DUPLICATE } from './TabDuplicate';
export { GET_FAVORITES } from './GetFavorites';
export { SHOW_FAVORITES } from './ShowFavorites';
export { SHOW_TABS } from './ShowTabs';
export { GET_CURRENT_TABS } from './GetCurrentTabs';
export { NOTHING } from './Nothing';
