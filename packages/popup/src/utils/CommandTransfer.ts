import { ETarget } from'surfable-common/src/enums/ETarget';
import { MESSAGE } from 'surfable-common/src/Messages';
import { ICommand } from './../interfaces/ICommand';
import { CAT } from './../data/Category';
import { BLANK_FAVICON, MAX_COMMAND_TEXT_LENGTH, CHROME_PROTOCOL } from './../data/Constants';

/**
 * Create simple command to switch to another tab
 */
export const tabToCommand = (tab: chrome.tabs.Tab, index: number): ICommand => {
	// Show shortcut key only for first 10 tabs
	console.log(tab);
	const description = (index < 10) ? `Ctrl + ${index}` : '';
	const text = (tab.title.length > MAX_COMMAND_TEXT_LENGTH)
		? (tab.title.slice(0, MAX_COMMAND_TEXT_LENGTH) + '...')
		: tab.title;
	const iconUrl = (tab.favIconUrl)
		? (tab.favIconUrl.indexOf(CHROME_PROTOCOL) === 0)
			? BLANK_FAVICON
			: tab.favIconUrl
		: BLANK_FAVICON;
	return {
		type: 'SIMPLE_COMMAND',
		desc: description,
		cat: CAT.GOTO,
		text: text,
		imgUrl: iconUrl,
		action: {type: MESSAGE.TAB_SWITCH, id: tab.id, target: ETarget.BACKGROUND}
	};
};

/**
 * Create simple command to open new tab from favorite
 */
export const favoriteToCommand = (favorite: chrome.topSites.MostVisitedURL): ICommand => {
	const text = (favorite.title.length > MAX_COMMAND_TEXT_LENGTH)
		? (favorite.title.slice(0, MAX_COMMAND_TEXT_LENGTH) + '...')
		: favorite.title;
	return {
		type: 'SIMPLE_COMMAND',
		desc: '',
		cat: CAT.FAVORITE,
		action: {type: MESSAGE.TAB_NEW, target: ETarget.BACKGROUND, url: favorite.url},
		text: text
	};
};
