import { MESSAGE, MessageType } from 'surfable-common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { sendAction } from 'surfable-common/src/Sender';
import { IPanel } from './interfaces/IPanel';
import { ICommand } from './../interfaces/ICommand';
import { ACTION, ActionType } from './Actions';
import { initState } from './InitState';
import { favoriteToCommand, tabToCommand } from './../utils/CommandTransfer';
import { notFoundCommand } from './../utils/DummyCommands';

export const panelReducer = (state: IPanel = initState.quickpanel, action: ActionType|MessageType): IPanel => {
	switch(action.type) {
		case ACTION.PANEL_EXECUTE_COMMAND: {
			sendAction(state.commands[state.offset].action);
			return {
				...state,
				opened: false
			}
		}
		case ACTION.PANEL_UP: {
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
		case ACTION.PANEL_DOWN: {
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
		case ACTION.PANEL_OPEN: {
			return {
				...state,
				inputVal: '',
				opened: true
			};
		}
		case ACTION.PANEL_CLOSE: {
			document.body.focus();
			return {
				...state,
				opened: false
			}
		}
		case ACTION.SEARCH_CHANGE: {
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
		case MESSAGE.SHOW_FAVORITES: {
			if (action.favorites) {
				const newCommands: ICommand[] = action.favorites
					.slice(0, 10)
					.map(favorite => favoriteToCommand(favorite));
				const commands: ICommand[] = state.allCommands.concat(newCommands);
				return {
					...state,
					allCommands: commands,
					commands: commands
				};
			} else {
				return state;
			}
		}
		case MESSAGE.SHOW_TABS: {
			if (action.tabs) {
				const newCommands: ICommand[] = action.tabs.map((tab, index) =>
					tabToCommand(tab, index)
				);
				const commands: ICommand[] = state.allCommands.concat(newCommands);
				return {
					...state,
					allCommands: commands,
					commands: commands
				};
			}
			return state;
		}
		default: {
			return state;
		}
	}
};