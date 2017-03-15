import { IChromeState } from 'surfable-common/src/interfaces/IChromeState';
import { getBookmarks } from './../Bookmarks';

export type AppState = {
	chromeState: IChromeState
};

export const initState: AppState = {
	chromeState: {
		currentActiveTabId: -1,
		currentActiveWindowId: -1,
		openedTabs: [],
		closedTabs: [],
		favorites: [],
		bookmarks: [],
		recentUrls: []
	}
};

// Fill store on start of the App
chrome.tabs.query({ currentWindow: true }, tabs => {
	initState.chromeState.openedTabs = tabs.map(t => ({ id: t.id, history: [t] }));
});

chrome.tabs.query({ currentWindow: true, active: true }, tab => {
	initState.chromeState.currentActiveTabId = tab[0].id;
});

chrome.topSites.get(mostVisited => {
	initState.chromeState.favorites = mostVisited;
});

chrome.bookmarks.getTree(bookmarkTree => {
	const bookmarks = getBookmarks(bookmarkTree);
	initState.chromeState.bookmarks = bookmarks;
});
