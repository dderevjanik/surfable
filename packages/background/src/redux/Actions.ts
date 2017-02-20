interface IAction {
	readonly type: string;
}

export const ACTION = {
	TAB_CREATED: 'TAB_CREATED' as 'TAB_CREATED',
	TAB_REMOVED: 'TAB_REMOVED' as 'TAB_REMOVED',
	TAB_UPDATED: 'TAB_UPDATED' as 'TAB_UPDATED'
};

interface ITabCreated extends IAction { type: typeof ACTION.TAB_CREATED; tab: chrome.tabs.Tab; }
interface ITabRemoved extends IAction { type: typeof ACTION.TAB_REMOVED; tabId: number; }
interface ITabUpdated extends IAction { type: typeof ACTION.TAB_UPDATED; tabId: number; tab: chrome.tabs.Tab; }

export type ActionType = ITabCreated | ITabRemoved | ITabUpdated;
