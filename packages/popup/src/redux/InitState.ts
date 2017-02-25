import { IAppState } from './../interfaces/IAppState';
import { commands } from './../data/Commands';
import { ICommand } from './../interfaces/ICommand';
import { commandsGroups } from './../data/CommandsGroups';
import { Group } from './../data/Group';

export const initState: IAppState = {
	defaultCommands: commandsGroups[Group.COMMANDS],
	commandsGroups: commandsGroups,
	allCommands: commandsGroups[Group.COMMANDS],
	commands: commandsGroups[Group.COMMANDS],
	opened: false,
	offset: 0,
	inputVal: Group.COMMANDS
};
