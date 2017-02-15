import { MessageType } from './Messages';
import { ETarget } from './enums/ETarget';

declare const chrome;

const sendMessage = (message: MessageType) => chrome.runtime.sendMessage(message);

/**
 * Send specific message to Background
 */
export const sendToBackground = (message: MessageType) =>
	sendMessage({
		...message,
		target: ETarget.BACKGROUND
	});

/**
 * Send specific message to Popup
 */
export const sendToPopup = (message: MessageType) =>
	sendMessage({
		...message,
		target: ETarget.POPUP
	});

/**
 * Send specific message to Content
 */
export const sendToContent = (message: MessageType) =>
	sendMessage({
		...message,
		target: ETarget.CONTENT
	});

/**
 * Dispatch message between Background, Popup and Content
 */
export const sendAction = (message: MessageType) => {
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
