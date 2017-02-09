import {PANEL_OPEN, PANEL_CLOSE, PANEL_UP, PANEL_DOWN, PANEL_EXECUTE_COMMAND, PANEL_KEYPRESS, SEARCH_CHANGE, SHOW_FAVORITES} from './../ActionsList';
import {IPanel} from './../../interfaces/IPanel';
import {ITextCommand} from './../../../interfaces/ITextCommand';
import {initState} from './../../InitState';
import {tabNew} from 'surfable-common/src/actions/tabNew';

declare const chrome;

const notFoundCommand: ITextCommand = {
	cat: '',
	desc: '',
	func: () => null,
	text: 'No commands matching'
};

export const panelReducer = (state: IPanel = initState.quickpanel, action): IPanel => {
	switch(action.type) {
		case PANEL_EXECUTE_COMMAND: {
			console.log(state.commands[state.offset]);
			state.commands[state.offset].func();
			return {
				...state,
				opened: false
			}
		}
		case PANEL_UP: {
			const nextOffset = (state.offset - 1);
			if (nextOffset < 0) {
				return state;
			} else {
				return {
					...state,
					offset: nextOffset
				}
			}
		}
		case PANEL_DOWN: {
			const nextOffset = (state.offset + 1);
			if (nextOffset >= state.commands.length) {
				return state;
			} else {
				return {
					...state,
					offset: nextOffset
				}
			}
		}
		case PANEL_OPEN: {
			return {
				...state,
				inputVal: '',
				opened: true
			};
		}
		case PANEL_CLOSE: {
			document.body.focus();
			return {
				...state,
				opened: false
			}
		}
		case PANEL_KEYPRESS: {
			return {
				...state,
				inputVal: (state.inputVal + action.char)
			}
		}
		case SEARCH_CHANGE: {
			const searchValue = action.value.toLowerCase();
			if (searchValue.length > 0 && searchValue !== state.inputVal) {
				const valLen = searchValue.length;
				const foundCommands = state.allCommands
					.map(command => {
						const text = (command.cat + ': ' + command.text);
						const ind = text.toLowerCase().indexOf(searchValue);
						return (ind >= 0)
							? {...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)]}
							: null
					}).filter(command => command);
				console.log(foundCommands);
				return {
					...state,
					inputVal: (action.value),
					offset: 0,
					commands: (foundCommands.length > 0) ? foundCommands : [notFoundCommand]
				};
			} else {
				return {
					...state,
					inputVal: (action.value),
					commands: state.allCommands
				};
			}
		}
		case SHOW_FAVORITES: {
			if (action.favorites) {
				const newCommands: ITextCommand[] = action.favorites.map(favorite => ({
					desc: '',
					cat: 'Favorite',
					text: (favorite.length > 50) ? (favorite.title.slice(0, 50) + '...') : favorite.title,
					func: () => chrome.runtime.sendMessage(tabNew(favorite.url))
				}));
				const commands: ITextCommand[] = state.allCommands.concat(newCommands);
				return {
					...state,
					allCommands: commands,
					commands: commands
				};
			} else {
				return state;
			}
		}
		default: {
			return state;
		}
	}
};
