import { MessageType } from 'surfable-common/src/Messages';

export const COMMAND = {
	SIMPLE: 'SIMPLE' as 'SIMPLE',
	LONG_DESC: 'LONG_DESC' as 'LONG_DESC',
	DUMMY: 'DUMMY' as 'DUMMY',
	URL_COMMAND: 'URL_COMMAND' as 'URL_COMMAND',
	QUICKPANEL_COMMAND: 'QUICKPANEL_COMMAND' as 'QUICKPANEL_COMMAND'
};

interface ICommandBase {
	// REFACTOR: Try to find proper way how to add 'type' property to this interface
	readonly text: string;
	readonly action: MessageType;
}

export interface IQuickPanelCommand extends ICommandBase {
	readonly type: typeof COMMAND.QUICKPANEL_COMMAND;
	readonly text: string;
	readonly desc: string;
	readonly action: MessageType;
	readonly group: string;
}

export interface ISimpleCommand extends ICommandBase {
	readonly type: typeof COMMAND.SIMPLE;
	readonly desc: string;
	readonly cat: string;
	readonly imgUrl?: string;
	readonly pText?: string[]; // Refactor, please :-)
}

export interface IDummyCommand extends ICommandBase {
	readonly type: typeof COMMAND.DUMMY;
}

export interface IUrlCommand extends ICommandBase {
	readonly type: typeof COMMAND.URL_COMMAND;
	readonly desc: string;
	readonly url: string;
	readonly imgUrl?: string;
	readonly pText?: string[];
	readonly pUrl?: string[];
}

export type ICommand = ISimpleCommand | IDummyCommand | IUrlCommand | IQuickPanelCommand;
