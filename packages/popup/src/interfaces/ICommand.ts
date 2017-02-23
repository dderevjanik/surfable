import { MessageType } from 'surfable-common/src/Messages';

export const COMMAND = {
	SIMPLE: 'SIMPLE' as 'SIMPLE',
	LONG_DESC: 'LONG_DESC' as 'LONG_DESC',
	DUMMY: 'DUMMY' as 'DUMMY',
	URL_COMMAND: 'URL_COMMAND' as 'URL_COMMAND',
	QUICKPANEL_COMMAND: 'QUICKPANEL_COMMAND' as 'QUICKPANEL_COMMAND'
};

export interface IQuickPanelCommand {
	readonly type: typeof COMMAND.QUICKPANEL_COMMAND;
	readonly text: string;
	readonly desc: string;
	readonly action: MessageType;
	readonly group: string;
}

export interface ISimpleCommand {
	readonly type: typeof COMMAND.SIMPLE;
	readonly text: string;
	readonly desc: string;
	readonly cat: string;
	readonly imgUrl?: string;
	readonly pText?: string[]; // Refactor, please :-)
	readonly action: MessageType;
}

export interface IDummyCommand {
	readonly type: typeof COMMAND.DUMMY;
	readonly text: string;
	readonly action: MessageType;
}

export interface IUrlCommand {
	readonly type: typeof COMMAND.URL_COMMAND;
	readonly text: string;
	readonly action: MessageType;
	readonly url: string;
	readonly imgUrl?: string;
	readonly pText?: string[];
}

export type ICommand = ISimpleCommand | IDummyCommand | IUrlCommand | IQuickPanelCommand;
