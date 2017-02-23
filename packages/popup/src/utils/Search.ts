import { ICommand, COMMAND } from './../interfaces/ICommand';

export const searchCommands = (searchValue: string, commandsGroup: ICommand[]): ICommand[] => {
	const valLen = searchValue.length;
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
						: null
				}
				case COMMAND.DUMMY: {
					const text = command.text;
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)] }
						: null
				}
				case COMMAND.URL_COMMAND: {
					const text = command.text;
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: [text.slice(0, ind), text.slice(ind, ind + valLen), text.slice(ind + valLen, text.length)] }
						: null
				}
				default: {
					throw new Error(`Undefined command type ${command}`);
				}
			}
		}).filter(command => command);
	return foundCommands;
};
