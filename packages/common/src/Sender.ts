import {Type} from './actions/All';
import {ETarget} from './enums/ETarget';

declare const chrome;

const sendMessage = (message: Type) => chrome.runtime.sendMessage(message);

export const sendToBackground = (message: Type) =>
	sendMessage({
		...message,
		target: ETarget.BACKGROUND
	});

export const sendToPopup = (message: Type) =>
	sendMessage({
		...message,
		target: ETarget.POPUP
	});

export const sendToContent = (message: Type) =>
	sendMessage({
		...message,
		target: ETarget.CONTENT
	});

export const sendAction = (message: Type) => {
	switch(message.target) {
		case ETarget.BACKGROUND: {
			sendMessage(message);
			break;
		}
		case ETarget.CONTENT: {
			sendMessage(message);
			break;
		}
		case ETarget.POPUP: {
			sendMessage(message);
			break;
		}
		default: {
			throw new Error(`Unexpected target '${message.target}' for message '${message.type}'`);
		}
	}
}
