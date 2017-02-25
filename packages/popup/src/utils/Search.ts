import { ICommand, COMMAND } from './../interfaces/ICommand';

/**
 * Search for commands
 * Return those commands, which best suits to searchvalue.
 */
export const searchCommands = (searchValue: string, commandsGroup: ICommand[]): ICommand[] => {
	const valLen = searchValue.length;
	// If there's no value to search, return all commands in group
	if(valLen === 0) {
		return commandsGroup;
	}
	const foundCommands = commandsGroup
		.map(command => {
			switch (command.type) {
				case COMMAND.QUICKPANEL_COMMAND: {
					return command;
				}
				case COMMAND.SIMPLE: {
					const text = (command.cat + ': ' + command.text);
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)] }
						: null;
				}
				case COMMAND.DUMMY: {
					const text = command.text;
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)] }
						: null;
				}
				case COMMAND.URL_COMMAND: {
					const text = command.text;
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)] }
						: null;
				}
				default: {
					throw new Error(`Undefined command type ${command}. Make sure that search function is implemented for '${command}' type.`);
				}
			}
		}).filter(command => command);
	return foundCommands;
};
