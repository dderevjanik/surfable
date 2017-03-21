import { IAppState } from './../interfaces/IAppState';
import { ESearchMode } from './../enums/ESearchMode';
import { commandsGroups } from './../data/CommandsGroups';
import { Group } from './../data/Group';

export const initState: IAppState = {
	language: 'en',
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
