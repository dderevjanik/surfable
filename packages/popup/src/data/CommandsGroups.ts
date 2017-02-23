import { help, commands } from './Commands';
import { ICommand } from './../interfaces/ICommand';

export const commandsGroups: {[key: string]: ICommand[]} = {
	'?': help,
	'>': commands
};
