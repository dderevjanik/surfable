import { store } from './redux/Store';
import { MessageType, MESSAGE } from 'surfable-common/src/Messages';
import { sendToPopup } from '../../common/src/Sender';

export const synchronizeTabs = () => {
	store.subscribe(() => {
		console.log('sending');
		sendToPopup({type: MESSAGE.SHOW_TABS, tabs: store.getState()});
	});
}
