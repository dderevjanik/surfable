import { help, commands } from './Commands';
import { ICommand } from './../interfaces/ICommand';
import { Group } from './Group';
import { ICommandsGroup } from './../interfaces/ICommandsGroup'

export const commandsGroups: ICommandsGroup = {
	[Group.HELP]: help,
	[Group.COMMANDS]: commands,
	[Group.SWITCHTAB]: [],
	[Group.BOOKMARKS]: []
};
