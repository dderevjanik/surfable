import { ICommand, COMMAND } from './../interfaces/ICommand';

/**
 * Convert string to array of sliced substrings
 */
export const makeSlicedText = (text: string, index: number, length: number): string[] =>
	[
		text.slice(0, index),
		text.slice(index, (index + length)),
		text.slice((index + length), text.length)
	];

/**
 * Search for commands
 * Return those commands, which best suits to searchvalue.
 */
export const searchCommands = (searchValue: string, commandsGroup: ICommand[]): ICommand[] => {
	const valLen = searchValue.length;
	// If there's no value to search, return all commands in group
	if (valLen === 0) {
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
						? { ...command, pText: makeSlicedText(text, ind, valLen) }
						: null;
				}
				case COMMAND.DUMMY: {
					const text = command.text;
					const ind = text.toLowerCase().indexOf(searchValue);
					return (ind >= 0)
						? { ...command, pText: makeSlicedText(text, ind, valLen) }
						: null;
				}
				case COMMAND.URL_COMMAND: {
					const text = command.text.toLowerCase();
					const textFoundInd = text.indexOf(searchValue);
					const url = command.url.toLowerCase();
					const urlFoundInd = url.indexOf(searchValue);
					return ((textFoundInd >= 0) || (urlFoundInd >= 0))
						? { ...command, pText: makeSlicedText(text, textFoundInd, valLen), pUrl: makeSlicedText(url, urlFoundInd, valLen) }
						: null;
				}
				default: {
					throw new Error(`Undefined command type ${command}. Make sure that search function is implemented for '${command}' type.`);
				}
			}
		}).filter(command => command);
	return foundCommands;
};
