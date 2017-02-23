import { MESSAGE, MessageType } from 'surfable-common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { sendAction } from 'surfable-common/src/Sender';
import { IPanel } from './interfaces/IPanel';
import { ICommand, COMMAND } from './../interfaces/ICommand';
import { ACTION, ActionType } from './Actions';
import { initState } from './InitState';
import { favoriteToCommand, tabToCommand, closedToCommand } from './../utils/CommandCreator';
import { searchCommands } from './../utils/Search';
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
			const searchValue = action.value.toLowerCase(); // Don't care about case
			const commandsGroupsChars = Object.keys(state.commandsGroups); // REFACTOR: don't calculate all object keys everytime
			const charBelognsToGroup = commandsGroupsChars.indexOf(action.value[0]) > -1;

			if (charBelognsToGroup) {
				const foundCommands = searchCommands(action.value.slice(1, action.value.length), state.commandsGroups[action.value[0]]);
				const hasFoundSomething = (foundCommands.length > -1);
				return {
					...state,
					inputVal: action.value,
					commands: hasFoundSomething ? foundCommands : [notFoundCommand]
				};
			}
			return {
				...state,
				inputVal: action.value,
				commands: [notFoundCommand]
			};
		}
		case MESSAGE.SHOW_TABS: {
			const favoriteCommands: ICommand[] = action.tabs.favorites
				.slice(0, 10)
				.map(favorite => favoriteToCommand(favorite))
			const openedTabCommands: ICommand[] = action.tabs.openedTabs
				.map((tab, index) => tabToCommand(tab, index));
			const closedTabCommands: ICommand[] = action.tabs.closedTabs
				.map((tab) => closedToCommand(tab));
			const allNewCommands = favoriteCommands.concat(openedTabCommands.concat(closedTabCommands));
			return {
				...state,
				allCommands: state.defaultCommands.concat(allNewCommands),
				commands: state.defaultCommands.concat(allNewCommands)
			};
		}
		default: {
			return state;
		}
	}
};
