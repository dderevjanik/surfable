import { help, commands } from './Commands';
import { ICommand } from './../interfaces/ICommand';
import { Group } from './Group';

export const commandsGroups: {[key: string]: ICommand[]} = {
	[Group.HELP]: help,
	[Group.COMMANDS]: commands,
	[Group.SWITCHTAB]: [],
	[Group.BOOKMARKS]: []
};
