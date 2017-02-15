import { MessageType } from '../../common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { MESSAGE } from 'surfable-common/src/Messages';
import { IAppState } from './interfaces/IAppState';
import { PressedKeysMap } from './Types';
import { keyMap } from './data/KeyMap';
import { store } from './redux/store';
import { ACTION } from './redux/Actions';
import { render } from './Index';

render();

const processEvent = (event: KeyboardEvent) => {
	switch(event.keyCode) {
		case keyMap.esc:
			store.dispatch({type: ACTION.PANEL_CLOSE});
			break;
		case keyMap.up:
			store.dispatch({type: ACTION.PANEL_UP});
			break;
		case keyMap.down:
			store.dispatch({type: ACTION.PANEL_DOWN});
			break;
		case keyMap.enter:
			store.dispatch({type: ACTION.PANEL_EXECUTE_COMMAND});
			break;
		default: {
			// Do nothing
		}
	}
};

document.onkeydown = (e: KeyboardEvent) => {
	if ((e.keyCode >= 37) && (e.keyCode <= 40) || (e.keyCode === keyMap.esc) || (e.keyCode === keyMap.enter)) {
		processEvent(e);
	}
}

chrome.runtime.sendMessage({type: MESSAGE.GET_CURRENT_TABS, target: ETarget.BACKGROUND});
chrome.runtime.sendMessage({type: MESSAGE.GET_FAVORITES, target: ETarget.BACKGROUND});
chrome.runtime.onMessage.addListener(
	(message: MessageType) => {
		switch(message.type) {
			case MESSAGE.SHOW_FAVORITES:
				store.dispatch({type: message.type, favorites: message.favorites});
				break;
			case MESSAGE.SHOW_TABS:
				store.dispatch(message);
				break;
			default: {
				// Do nothing
			}
		}
	}
);
