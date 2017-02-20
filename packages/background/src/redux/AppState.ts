import { ITabs } from 'surfable-common/src/interfaces/ITabs';

export type AppState = ITabs;

export const initState: AppState = {
	openedTabs: [],
	closedTabs: [],
	favorites: []
};

chrome.tabs.query({currentWindow: true}, tabs => {
	initState.openedTabs = tabs;
});

chrome.topSites.get(mostVisited => {
	initState.favorites = mostVisited;
});
