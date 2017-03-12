import { IAppState } from './../interfaces/IAppState';
import { commands } from './../data/Commands';
import { ICommand } from './../interfaces/ICommand';
import { commandsGroups } from './../data/CommandsGroups';
import { Group } from './../data/Group';

export const initState: IAppState = {
	commandsGroups: commandsGroups,
	commands: commandsGroups[Group.COMMANDS],
	opened: false,
	offset: 0,
	inputVal: Group.COMMANDS
};
