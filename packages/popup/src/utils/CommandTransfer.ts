import { ETarget } from'surfable-common/src/enums/ETarget';
import { MESSAGE } from 'surfable-common/src/Messages';
import { ICommand } from './../interfaces/ICommand';
import { CAT } from './../data/Category';
import { BLANK_FAVICON, MAX_COMMAND_TEXT_LENGTH, CHROME_PROTOCOL } from './../data/Constants';
import { sliceOverflowTitle, getFaviconUrl } from './CommandHelper';

/**
 * Create simple command to switch to another tab
 */
export const tabToCommand = (tab: chrome.tabs.Tab, index: number): ICommand => {
	// Show shortcut key only for first 10 tabs
	const description = (index < 10) ? `Ctrl + ${index}` : '';
	return {
		type: 'SIMPLE_COMMAND',
		desc: description,
		cat: CAT.GOTO,
		text: sliceOverflowTitle(tab.title),
		imgUrl: getFaviconUrl(tab.favIconUrl),
		action: {type: MESSAGE.TAB_SWITCH, id: tab.id, target: ETarget.BACKGROUND}
	};
};

/**
 * Create simple command to open new tab from recently closed tabs
 */
export const closedToCommand = (closed: chrome.tabs.Tab): ICommand => ({
	type: 'SIMPLE_COMMAND',
	desc: '',
	cat: CAT.RECENT,
	imgUrl: getFaviconUrl(closed.url),
	action: {type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: closed.url},
	text: sliceOverflowTitle(closed.title)
});

/**
 * Create simple command to open new tab from favorite
 */
export const favoriteToCommand = (favorite: chrome.topSites.MostVisitedURL): ICommand => ({
	type: 'SIMPLE_COMMAND',
	desc: '',
	cat: CAT.FAVORITE,
	action: {type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: favorite.url},
	text: sliceOverflowTitle(favorite.title)
});
