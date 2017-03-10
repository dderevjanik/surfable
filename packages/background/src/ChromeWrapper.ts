export function getActiveTab() {
	return new Promise<chrome.tabs.Tab>(resolve => {
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
