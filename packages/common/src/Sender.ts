import {Type} from './actions/All';
import {ETarget} from './enums/ETarget';

export const sendToBackground = (message: Type) =>
	chrome.runtime.sendMessage({
		...message,
		target: ETarget.BACKGROUND
	});

export const sendToPopup = (message: Type) =>
	chrome.runtime.sendMessage({
		...message,
		target: ETarget.POPUP
	});

export const sendToContent = (message: Type) =>
	chrome.runtime.sendMessage({
		...message,
		target: ETarget.CONTENT
	});
