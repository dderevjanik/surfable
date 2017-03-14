import { ITabs } from 'surfable-common/src/interfaces/ITabs';
import { getBookmarks } from './../Bookmarks';

export type AppState = ITabs;

export const initState: AppState = {
	openedTabs: [],
	closedTabs: [],
	favorites: [],
	bookmarks: []
};

// Fill store
chrome.tabs.query({ currentWindow: true }, tabs => {
	initState.openedTabs = tabs.map(t => ({ id: t.id, history: [t] }));
});

chrome.topSites.get(mostVisited => {
	initState.favorites = mostVisited;
});

chrome.bookmarks.getTree(bookmarkTree => {
	const bookmarks = getBookmarks(bookmarkTree);
	initState.bookmarks = bookmarks;
});
