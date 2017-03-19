import { IAppState } from './../interfaces/IAppState';
import { ICommand } from './../interfaces/ICommand';
import { ESearchMode } from './../enums/ESearchMode';
import { commands } from './../data/Commands';
import { commandsGroups } from './../data/CommandsGroups';
import { Group } from './../data/Group';

export const initState: IAppState = {
	searchMode: ESearchMode.GROUPS,
	commandsGroups: commandsGroups,
	commands: commandsGroups[Group.COMMANDS],
	foundCommands: commandsGroups[Group.COMMANDS],
	opened: false,
	offset: 0,
	inputVal: Group.COMMANDS,
	chromeState: {
		bookmarks: [],
		closedTabs: [],
		currentActiveTabId: -1,
		currentActiveWindowId: -1,
		favorites: [],
		openedTabs: [],
		recentUrls: []
	}
};
