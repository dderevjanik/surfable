import { MESSAGE } from '../Messages';
import { ACTION } from './redux/Actions';
import { ETarget } from '../enums/ETarget';
import { MessageType } from '../Messages';
import { store } from './redux/store';

/**
 * Will listen on events/messages incoming from other parts of extension
 */
export const messageReceiver = (): void => {
	chrome.runtime.onMessage.addListener(
		(message: MessageType) => {
			if (message.target === ETarget.POPUP) {
				console.debug(`Message '${message.type}' received`);
				// Try to avoid dispatching a message to popup store
				// It'll be less confusing and also 'safer'
				switch (message.type) {
					case MESSAGE.SHOW_FAVORITES:
						store.dispatch({ type: message.type, favorites: message.favorites });
						break;
					case MESSAGE.SYNC_CHROME_STATE:
						store.dispatch({ type: ACTION.SYNC_CHROME_STATE, chromeState: message.chromeState });
						break;
					case MESSAGE.TAB_HISTORY:
						store.dispatch({ type: ACTION.TAB_SHOW_HISTORY });
						break;
					default: {
						throw new Error(`Unknown message type: ${message.type}. Make sure that proper handler exists in message receiver`);
					}
				}
			} else {
				// Do nothing, message isn't adressed for 'Popup'
			}
		}
	)
};
