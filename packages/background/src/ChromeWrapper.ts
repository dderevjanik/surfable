type Tab = chrome.tabs.Tab;
type Window = chrome.windows.Window;

// @TODO: add reject
// @TODO: try to solve all Promises with abstract wrapper

export function getCurrentWindow() {
	return new Promise<Window>(resolve => {
		chrome.windows.getCurrent(window => {
			resolve(window);
		});
	});
};

export function getCurrentWindowTabs() {
	return new Promise<Tab[]>(resolve => {
		chrome.tabs.query({ currentWindow: true }, tabs => {
			resolve(tabs);
		});
	});
}

export function getActiveTab() {
	return new Promise<Tab>(resolve => {
		chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
			if (tabs.length === 0) {
				throw new Error('no active tab in current window');
			}
			if (tabs.length > 1) {
				throw new Error('cannot have more than one active tab per window');
			}
			resolve(tabs[0]);
		});
	});
}

export function getTabZoomFactor(tabId: number) {
	return new Promise<number>(resolve => {
		chrome.tabs.getZoom(tabId, zoomFactor => {
			resolve(zoomFactor);
		});
	});
}
