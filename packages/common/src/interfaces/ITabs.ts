export interface ITabs {
	openedTabs: chrome.tabs.Tab[];
	closedTabs: chrome.tabs.Tab[];
	favorites: chrome.topSites.MostVisitedURL[];
}
