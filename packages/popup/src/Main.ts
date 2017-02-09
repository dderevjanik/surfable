import {ITextCommand} from './interfaces/ITextCommand';
import {IAppState} from './interfaces/IAppState';
import {PressedKeysMap} from './Types';
import {keyMap} from './data/KeyMap';
import {store} from './redux/store';
import {panelClose, panelOpen, panelUp, panelDown, executeCommand, keyPress} from './redux/Reducers/Actions';
import {render} from './Index';
import {getFavorites} from './redux/reducers/AsyncActions';
import {Type, SHOW_FAVORITES} from 'surfable-common/src/Actions/All';

render();

const processEvent = (event: KeyboardEvent) => {
	switch(event.keyCode) {
		case keyMap.esc: {
			store.dispatch(panelClose());
			break;
		}
		case keyMap.up: {
			store.dispatch(panelUp());
			break;
		}
		case keyMap.down: {
			store.dispatch(panelDown());
			break;
		}
		case keyMap.enter: {
			store.dispatch(executeCommand());
			break;
		}
		default: {
			store.dispatch(keyPress(String.fromCharCode(event.keyCode)));
		}
	}
};

document.onkeydown = (e: KeyboardEvent) => {
	if ((e.keyCode >= 37) && (e.keyCode <= 40) || (e.keyCode == keyMap.esc) || (e.keyCode == keyMap.enter)) {
		processEvent(e);
	}
}

getFavorites();
chrome.runtime.onMessage.addListener(
	(message: Type) => {
		switch(message.type) {
			case SHOW_FAVORITES: {
				store.dispatch({type: message.type, favorites: message.favorites});
				break;
			}
			default: {
				break;
			}
		}
	}
);
