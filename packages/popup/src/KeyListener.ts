import { keyMap } from './data/KeyMap';
import { ACTION } from './redux/Actions';
import { store } from './redux/store';

const processKeyEvent = (event: KeyboardEvent) => {
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

export const keyListener = () => {
	document.onkeydown = (e: KeyboardEvent) => {
		if ((e.keyCode >= 37) && (e.keyCode <= 40) || (e.keyCode === keyMap.esc) || (e.keyCode === keyMap.enter)) {
			processKeyEvent(e);
		}
	};
};
