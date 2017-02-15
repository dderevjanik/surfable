import { IMessage } from './interfaces/IAction';
import { EZoomType } from './enums/EZoomType';

export const MESSAGE = {
	NOTHING: 'NOTHING' as 'NOTHING',
	TAB_NEW: 'TAB_NEW' as 'TAB_NEW',
	TAB_RELOAD: 'TAB_RELOAD' as 'TAB_RELOAD',
	TAB_DUPLICATE: 'TAB_DUPLICATE' as 'TAB_DUPLICATE',
	TAB_CLOSE: 'TAB_CLOSE' as 'TAB_CLOSE',
	TAB_CLOSE_ALL: 'TAB_CLOSE_ALL' as 'TAB_CLOSE_ALL',
	TAB_SWITCH: 'TAB_SWITCH' as 'TAB_SWITCH',
	PRINT_PAGE: 'PRINT_PAGE' as 'PRINT_PAGE',
	WINDOW_CLOSE: 'WINDOW_CLOSE' as 'WINDOW_CLOSE',
	BOOKMARK_ADD: 'BOOKMARKD_ADD' as 'BOOKMARK_ADD',
	ZOOM: 'ZOOM' as 'ZOOM',
	CAPTURE: 'CAPTURE' as 'CAPTURE',
	SHOW_FAVORITES: 'SHOW_FAVORITES' as 'SHOW_FAVORITES',
	SHOW_TABS: 'SHOW_TABS' as 'SHOW_TABS',
	GET_FAVORITES: 'GET_FAVORITES' as 'GET_FAVORITES',
	GET_CURRENT_TABS: 'GET_CURRENT_TABS' as 'GET_CURRENT_TABS'
};

interface INothing extends IMessage {type: typeof MESSAGE.NOTHING; }
interface ITabCloseAll extends IMessage {type: typeof MESSAGE.TAB_CLOSE_ALL; }
interface ITabClose extends IMessage {type: typeof MESSAGE.TAB_CLOSE; }
interface IPrintPage extends IMessage {type: typeof MESSAGE.PRINT_PAGE; }
interface ITabSwitch extends IMessage {type: typeof MESSAGE.TAB_SWITCH; readonly id: number; }
interface IWindowClose extends IMessage {type: typeof MESSAGE.WINDOW_CLOSE; }
interface IBookmarkAdd extends IMessage {type: typeof MESSAGE.BOOKMARK_ADD; }
interface ITabNew extends IMessage {type: typeof MESSAGE.TAB_NEW; readonly url: string; }
interface IZoom extends IMessage {type: typeof MESSAGE.ZOOM; readonly zoomType: EZoomType; }
interface ICapture extends IMessage {type: typeof MESSAGE.CAPTURE; }
interface ITabReload extends IMessage {type: typeof MESSAGE.TAB_RELOAD; }
interface ITabDuplicate extends IMessage {type: typeof MESSAGE.TAB_DUPLICATE; }
interface IGetFavorites extends IMessage {type: typeof MESSAGE.GET_FAVORITES; }
interface IShowFavorites extends IMessage {type: typeof MESSAGE.SHOW_FAVORITES; readonly favorites: chrome.topSites.MostVisitedURL[]; }
interface IShowTabs extends IMessage {type: typeof MESSAGE.SHOW_TABS; readonly tabs: chrome.tabs.Tab[]; }
interface IGetCurrentTabs extends IMessage {type: typeof MESSAGE.GET_CURRENT_TABS; }
interface IPrintPage extends IMessage {type: typeof MESSAGE.PRINT_PAGE; }

export type MessageType = IBookmarkAdd | ITabNew | ITabClose | IZoom | ICapture | ITabReload | ITabDuplicate | IGetFavorites | IShowFavorites | IShowTabs | IGetCurrentTabs | IPrintPage | INothing | ITabSwitch | ITabCloseAll | IWindowClose;
