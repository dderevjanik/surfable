import { ITabs } from 'surfable-common/src/interfaces/ITabs';
import { getBookmarks } from './../Bookmarks';

export type AppState = ITabs;

export const initState: AppState = {
	openedTabs: [],
	closedTabs: [],
	favorites: [],
	bookmarks: []
};

chrome.tabs.query({ currentWindow: true }, tabs => {
	initState.openedTabs = tabs;
});

chrome.topSites.get(mostVisited => {
	initState.favorites = mostVisited;
});

chrome.bookmarks.getTree(bookmarkTree => {
	const bookmarks = getBookmarks(bookmarkTree);
	initState.bookmarks = bookmarks;
});
