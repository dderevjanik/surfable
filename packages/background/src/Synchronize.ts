import { store } from './redux/Store';
import { MessageType, MESSAGE } from 'surfable-common/src/Messages';
import { sendToPopup } from '../../common/src/Sender';

/**
 * On every store change, it'll synchronize it with other parts
 */
export const synchronizeTabs = () => {
	store.subscribe(() => {
		sendToPopup({type: MESSAGE.SYNC_TABS, tabs: store.getState()});
	});
}
