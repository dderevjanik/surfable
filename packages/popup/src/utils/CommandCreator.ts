import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MESSAGE } from 'surfable-common/src/Messages';
import { ICommand, COMMAND } from './../interfaces/ICommand';
import { CAT } from './../data/Category';
import { BLANK_FAVICON, MAX_COMMAND_TEXT_LENGTH, CHROME_PROTOCOL } from './../data/Constants';
import { sliceOverflowTitle, getFaviconUrl, shortenUrl } from './CommandHelper';

type Tab = chrome.tabs.Tab;
type Bookmark = chrome.bookmarks.BookmarkTreeNode;
type TopSite = chrome.topSites.MostVisitedURL;

/**
 * Create simple command to switch to another tab
 */
export const tabToCommand = (tab: Tab, index: number): ICommand => {
	// Show shortcut key only for first 10 tabs
	const description = (index < 10) ? `Ctrl + ${index}` : '';
	return {
		type: COMMAND.URL_COMMAND,
		desc: description,
		text: sliceOverflowTitle(tab.title),
		url: shortenUrl(tab.url),
		imgUrl: getFaviconUrl(tab.favIconUrl),
		action: { type: MESSAGE.TAB_SWITCH, id: tab.id, target: ETarget.BACKGROUND }
	};
};

/**
 * Create simple command to open a new tab from recently closed tabs
 */
export const closedToCommand = (closed: Tab): ICommand => ({
	type: COMMAND.URL_COMMAND,
	desc: '',
	url: shortenUrl(closed.url),
	imgUrl: getFaviconUrl(closed.favIconUrl),
	action: { type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: closed.url },
	text: sliceOverflowTitle(closed.title)
});

/**
 * Create simple command to open a new tab from favorite
 */
export const favoriteToCommand = (favorite: TopSite): ICommand => ({
	type: COMMAND.URL_COMMAND,
	desc: '',
	url: shortenUrl(favorite.url),
	action: { type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: favorite.url },
	text: sliceOverflowTitle(favorite.title)
});

/**
 * Create bookmark command to open a new tab
 */
export const bookmarkToCommand = (bookmark: Bookmark): ICommand => ({
	type: COMMAND.URL_COMMAND,
	desc: '',
	url: shortenUrl(bookmark.url),
	imgUrl: `https://www.google.com/s2/favicons?domain=${bookmark.url}`,
	action: { type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: bookmark.url },
	text: sliceOverflowTitle(bookmark.title)
});

/**
 * Command to change current URL
 */
export const changeUrlCommand = (tab: Tab): ICommand => ({
	type: COMMAND.URL_COMMAND,
	desc: '',
	url: shortenUrl(tab.url),
	imgUrl: `https://www.google.com/s2/favicons?domain=${tab.url}`,
	action: { type: MESSAGE.TAB_CHANGE_URL, target: ETarget.BACKGROUND, newUrl: tab.url },
	text: sliceOverflowTitle(tab.title)
});
