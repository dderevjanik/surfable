interface IAction {
	readonly type: string;
}

export const ACTION = {
	TAB_CREATED: 'TAB_CREATED' as 'TAB_CREATED',
	TAB_REMOVED: 'TAB_REMOVED' as 'TAB_REMOVED',
	TAB_UPDATED: 'TAB_UPDATED' as 'TAB_UPDATED',
	BOOKMARKS_UPDATED: 'BOOKMARKS_UPDATED' as 'BOOKMARKS_UPDATED',
	TAB_ACTIVE_CHANGED: 'TAB_ACTIVE_CHANGED' as 'TAB_ACTIVE_CHANGED'
};

interface ITabCreated extends IAction
{ readonly type: typeof ACTION.TAB_CREATED; readonly tab: chrome.tabs.Tab; }

interface ITabRemoved extends IAction
{ readonly type: typeof ACTION.TAB_REMOVED; readonly tabId: number; }

interface ITabUpdated extends IAction
{ readonly type: typeof ACTION.TAB_UPDATED; readonly tabId: number; readonly tab: chrome.tabs.Tab; }

interface IBookmarksUpdated extends IAction
{ readonly type: typeof ACTION.BOOKMARKS_UPDATED; }

interface ITabActiveChanged extends IAction
{ readonly type: typeof ACTION.TAB_ACTIVE_CHANGED; readonly activeTabId: number; }

export type ActionType = ITabCreated | ITabRemoved | ITabUpdated | IBookmarksUpdated | ITabActiveChanged;
