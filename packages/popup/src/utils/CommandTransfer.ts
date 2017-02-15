import { ICommand } from './../interfaces/ICommand';
import { CAT } from './../data/Category';
import { ETarget } from'surfable-common/src/enums/ETarget';

/**
 * Create simple command to switch to another tab
 */
export const tabToCommand = (tab: chrome.tabs.Tab, index: number): ICommand => {
	// Show shortcut key only for first 10 tabs
	console.log(tab);
	const description = (index < 10) ? `Ctrl + ${index}` : '';
	const text = (tab.title.length > 50)
		? (tab.title.slice(0, 50) + '...')
		: tab.title;
	const iconUrl = (tab.favIconUrl)
		? (tab.favIconUrl.indexOf('chrome://') === 0)
			? 'https://image.flaticon.com/icons/png/128/12/12195.png'
			: tab.favIconUrl
		: 'https://image.flaticon.com/icons/png/128/12/12195.png';
	return {
		type: 'SIMPLE_COMMAND',
		desc: description,
		cat: CAT.GOTO,
		text: text,
		imgUrl: iconUrl,
		action: {type: 'TAB_SWITCH', id: tab.id, target: ETarget.BACKGROUND}
	};
};

/**
 * Create simple command to open new tab from favorite
 */
export const favoriteToCommand = (favorite: chrome.topSites.MostVisitedURL): ICommand => {
	const text = (favorite.title.length > 50)
		? (favorite.title.slice(0, 50) + '...')
		: favorite.title;
	return {
		type: 'SIMPLE_COMMAND',
		desc: '',
		cat: CAT.FAVORITE,
		action: {type: 'TAB_NEW', target: ETarget.BACKGROUND, url: favorite.url},
		text: text
	};
};
