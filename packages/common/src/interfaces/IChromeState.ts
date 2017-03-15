type Tab = chrome.tabs.Tab;
type Bookmark = chrome.bookmarks.BookmarkTreeNode;
type MostVisitedUrl = chrome.topSites.MostVisitedURL;
export type RecentUrl = string[];

export type TabWithHistory = {
	id: number;
	history: Tab[];
}

export interface IChromeState {
	currentActiveWindowId: number;
	currentActiveTabId: number;
	openedTabs: TabWithHistory[];
	closedTabs: Tab[];
	favorites: MostVisitedUrl[];
	bookmarks: Bookmark[];
	recentUrls: RecentUrl[];
}
