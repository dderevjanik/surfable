import { MESSAGE, MessageType } from 'surfable-common/src/Messages';
import { ETarget } from 'surfable-common/src/enums/ETarget';
import { Group } from './../data/Group';
import { sendAction } from 'surfable-common/src/Sender';
import { IAppState } from './../interfaces/IAppState';
import { ICommand, COMMAND } from './../interfaces/ICommand';
import { ACTION, ActionType } from './Actions';
import { initState } from './AppState';
import { favoriteToCommand, tabToCommand, closedToCommand, bookmarkToCommand } from './../utils/CommandCreator';
import { searchCommands } from './../utils/Search';
import { notFoundCommand } from './../utils/DummyCommands';

export const appReducer = (state: IAppState = initState, action: ActionType | MessageType): IAppState => {
	switch (action.type) {
		case ACTION.PANEL_EXECUTE_COMMAND: {
			sendAction(state.commands[state.offset].action);
			return {
				...state,
				opened: false
			};
		}
		case ACTION.PANEL_UP: {
			const nextOffset = (state.offset - 1);
			return (nextOffset < 0)
				? { ...state, offset: (state.commands.length - 1) }
				: { ...state, offset: nextOffset };
		}
		case ACTION.PANEL_DOWN: {
			const nextOffset = (state.offset + 1);
			return (nextOffset >= state.commands.length)
				? { ...state, offset: 0 }
				: { ...state, offset: nextOffset };
		}
		case ACTION.PANEL_OPEN: {
			return { ...state, inputVal: '', opened: true };
		}
		case ACTION.PANEL_CLOSE: {
			document.body.focus();
			return { ...state, opened: false };
		}
		case ACTION.SEARCH_CHANGE: {
			const searchValue = action.value.toLowerCase(); // Don't care about case
			const commandsGroupsChars = Object.keys(state.commandsGroups); // @TODO don't calculate all object keys everytime
			const commandsGroupExists = (commandsGroupsChars.indexOf(action.value[0]) > -1);

			if (commandsGroupExists) {
				const foundCommands = searchCommands(searchValue.slice(1, searchValue.length), state.commandsGroups[searchValue[0]]);
				const hasFoundSomething = (foundCommands.length > 0);
				return {
					...state,
					offset: 0,
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
		case MESSAGE.SYNC_TABS: {
			// @TODO Sort them by commands groups
			const favoriteCommands: ICommand[] = action.tabs.favorites
				.slice(0, 10)
				.map(favorite => favoriteToCommand(favorite));
			const openedTabCommands: ICommand[] = action.tabs.openedTabs
				.map((tab, index) => tabToCommand(tab, index));
			const closedTabCommands: ICommand[] = action.tabs.closedTabs
				.map(tab => closedToCommand(tab));
			const bookmarks: ICommand[] = action.tabs.bookmarks
				.map(tab => bookmarkToCommand(tab));
			return {
				...state,
				commandsGroups: {
					...state.commandsGroups,
					[Group.SWITCHTAB]: openedTabCommands,
					[Group.BOOKMARKS]: bookmarks
				}
			};
		}
		default: {
			return state;
		}
	}
};
