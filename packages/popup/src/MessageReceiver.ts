import { MESSAGE } from 'surfable-common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MessageType } from '../../common/src/Messages';
import { store } from './redux/store';

/**
 * Will listen on events/messages incoming from other parts of extension
 */
export const messageReceiver = () => {
	chrome.runtime.onMessage.addListener(
		(message: MessageType) => {
			if (message.target === ETarget.POPUP) {
				switch(message.type) {
					case MESSAGE.SHOW_FAVORITES:
						store.dispatch({type: message.type, favorites: message.favorites});
						break;
					case MESSAGE.SHOW_TABS:
						store.dispatch(message);
						break;
					default: {
						throw new Error(`Unknown message type: ${message.type}`);
					}
				}
			} else {
				// Do nothing, message isn't adressed for 'Popup'
			}
		}
	)
};
