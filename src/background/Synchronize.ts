import { store } from './redux/BackgroundStore';
import { MESSAGE } from '../Messages';
import { sendToPopup } from '../Sender';

/**
 * On every store change, it'll synchronize it with other parts
 */
export const synchronizeChromeState = (): void => {
	store.subscribe(() => {
		sendToPopup({ type: MESSAGE.SYNC_CHROME_REQUEST, chromeState: store.getState().chromeState });
	});
};
