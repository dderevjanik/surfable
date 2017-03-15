import { IMessage } from './interfaces/IAction';
import { ELevel } from './enums/ELevel';
import { EZoomType } from './enums/EZoomType';
import { ITabs } from './interfaces/ITabs';
import { IChromeState } from './interfaces/IChromeState';

export const MESSAGE = {
	NOTHING: 'NOTHING' as 'NOTHING',
	TAB_NEW: 'TAB_NEW' as 'TAB_NEW',
	TAB_RELOAD: 'TAB_RELOAD' as 'TAB_RELOAD',
	TAB_DUPLICATE: 'TAB_DUPLICATE' as 'TAB_DUPLICATE',
	TAB_CLOSE: 'TAB_CLOSE' as 'TAB_CLOSE',
	TAB_CLOSE_ALL: 'TAB_CLOSE_ALL' as 'TAB_CLOSE_ALL',
	TAB_SWITCH: 'TAB_SWITCH' as 'TAB_SWITCH',
	TAB_HISTORY: 'TAB_HISTORY' as 'TAB_HISTORY',
	PRINT_PAGE: 'PRINT_PAGE' as 'PRINT_PAGE',
	WINDOW_CLOSE: 'WINDOW_CLOSE' as 'WINDOW_CLOSE',
	BOOKMARK_ADD: 'BOOKMARKD_ADD' as 'BOOKMARK_ADD',
	ZOOM: 'ZOOM' as 'ZOOM',
	CAPTURE: 'CAPTURE' as 'CAPTURE',
	SHOW_FAVORITES: 'SHOW_FAVORITES' as 'SHOW_FAVORITES',
	GET_FAVORITES: 'GET_FAVORITES' as 'GET_FAVORITES',
	SYNC_CHROME_STATE: 'SYNC_CHROME_STATE' as 'SYNC_CHROME_STATE',
	SYNC_CHROME_REQUEST: 'SYNC_CHROME_REQUEST' as 'SYNC_CHROME_REQUEST',
	SHOW_TOAST: 'SHOW_TOAST' as 'SHOW_TOAST',
	SEARCH_CHANGE: 'SEARCH_CHANGE' as 'SEARCH_CHANGE'
};

interface INothing extends IMessage
{ readonly type: typeof MESSAGE.NOTHING; }

interface ITabCloseAll extends IMessage
{ readonly type: typeof MESSAGE.TAB_CLOSE_ALL; }

interface ITabClose extends IMessage
{ readonly type: typeof MESSAGE.TAB_CLOSE; }

interface IPrintPage extends IMessage
{ readonly type: typeof MESSAGE.PRINT_PAGE; }

interface ITabSwitch extends IMessage
{ readonly type: typeof MESSAGE.TAB_SWITCH; readonly id: number; }

interface IWindowClose extends IMessage
{ readonly type: typeof MESSAGE.WINDOW_CLOSE; }

interface IBookmarkAdd extends IMessage
{ readonly type: typeof MESSAGE.BOOKMARK_ADD; }

interface ITabNew extends IMessage
{ readonly type: typeof MESSAGE.TAB_NEW; readonly url: string; }

interface IZoom extends IMessage
{ readonly type: typeof MESSAGE.ZOOM; readonly zoomType: EZoomType; }

interface ICapture extends IMessage
{ readonly type: typeof MESSAGE.CAPTURE; }

interface ITabReload extends IMessage
{ readonly type: typeof MESSAGE.TAB_RELOAD; }

interface ITabDuplicate extends IMessage
{ readonly type: typeof MESSAGE.TAB_DUPLICATE; }

interface ITabHistory extends IMessage
{ readonly type: typeof MESSAGE.TAB_HISTORY; }

interface IGetFavorites extends IMessage
{ readonly type: typeof MESSAGE.GET_FAVORITES; }

interface IShowFavorites extends IMessage
{ readonly type: typeof MESSAGE.SHOW_FAVORITES; readonly favorites: chrome.topSites.MostVisitedURL[]; }

interface ISyncChromeState extends IMessage
{ readonly type: typeof MESSAGE.SYNC_CHROME_STATE; readonly chromeState: IChromeState; }

interface IPrintPage extends IMessage
{ readonly type: typeof MESSAGE.PRINT_PAGE; }

interface ISyncChromeStateRequest extends IMessage
{ readonly type: typeof MESSAGE.SYNC_CHROME_REQUEST; }

interface IShowToast extends IMessage
{ readonly type: typeof MESSAGE.SHOW_TOAST; readonly title: string; readonly text: string; readonly level: ELevel; }

interface ISearchChange extends IMessage
{ readonly type: typeof MESSAGE.SEARCH_CHANGE; readonly value: string; }

export type MessageType = IBookmarkAdd | ITabNew | ITabClose | IZoom | ICapture | ITabReload | ITabDuplicate | IGetFavorites | IShowFavorites | IPrintPage | INothing | ITabSwitch | ITabCloseAll | IWindowClose | ISyncChromeState | IShowToast | ISearchChange | ISyncChromeStateRequest | ITabHistory;
