import { keyMap } from '../data/KeyMap';
import { ACTION } from './redux/Actions';
import { store } from './redux/PopupStore';

/**
 * Send key's belonging action to redux store
 */
const processKeyEvent = (event: KeyboardEvent): void => {
	switch (event.keyCode) {
		case keyMap.esc:
			store.dispatch({ type: ACTION.PANEL_CLOSE });
			break;
		case keyMap.up:
			event.preventDefault(); // Prevent from moving input's cursor
			store.dispatch({ type: ACTION.PANEL_UP });
			break;
		case keyMap.down:
			event.preventDefault(); // Prevent from moving input's cursor
			store.dispatch({ type: ACTION.PANEL_DOWN });
			break;
		case keyMap.enter:
			store.dispatch({ type: ACTION.PANEL_EXECUTE_COMMAND });
			break;
		default: {
			// Do nothing
		}
	}
};

/**
 * Start listen on keys
 */
export const keyListener = (): void => {
	document.onkeydown = (e: KeyboardEvent) => {
		// Listen only for arrows, enter and esc keys
		if ((e.keyCode === keyMap.up) || (e.keyCode === keyMap.down) || (e.keyCode === keyMap.enter)) {
			processKeyEvent(e);
		}
	};
};
