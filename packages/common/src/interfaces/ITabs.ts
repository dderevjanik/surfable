type Tab = chrome.tabs.Tab;
type MostVisitedURL = chrome.topSites.MostVisitedURL;
type TabWithHistory = {
	id: number;
	history: Tab[]
};

export interface ITabs {
	openedTabs: TabWithHistory[];
	closedTabs: chrome.tabs.Tab[];
	favorites: MostVisitedURL[];
	bookmarks: any[];
}
