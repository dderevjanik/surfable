import { IAppState } from './../interfaces/IAppState';
import { commands } from './../data/Commands';
import { ICommand } from './../interfaces/ICommand';
import { commandsGroups } from './../data/CommandsGroups';

export const initState: IAppState = {
	config: {
		maxCommands: 7
	},
	quickpanel: {
		defaultCommands: commands,
		commandsGroups: commandsGroups,
		allCommands: commands,
		commands: commands,
		opened: false,
		offset: 0,
		inputVal: ''
	}
};
