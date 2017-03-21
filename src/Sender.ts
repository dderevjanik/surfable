import { MessageType } from './Messages';
import { ETarget } from './enums/ETarget';

declare const chrome: any;
declare const process: any;

const sendMessage = (message: MessageType): void => {
	if (process.env.dev) {
		console.log(`Message '${message.type}' sent`);
	}
	chrome.runtime.sendMessage(message);
};

/**
 * Send specific message to Background
 */
export const sendToBackground = (message: MessageType): void =>
	sendMessage({
		...message,
		target: ETarget.BACKGROUND
	});

/**
 * Send specific message to Popup
 */
export const sendToPopup = (message: MessageType): void =>
	sendMessage({
		...message,
		target: ETarget.POPUP
	});

/**
 * Send specific message to Content
 */
export const sendToContent = (message: MessageType): void =>
	sendMessage({
		...message,
		target: ETarget.CONTENT
	});

/**
 * Dispatch message between Background, Popup and Content
 */
export const sendAction = (message: MessageType): void => {
	switch (message.target) {
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
			throw new Error(`Unexpected target '${message.target}' for message's type '${message.type}'`);
		}
	}
}
