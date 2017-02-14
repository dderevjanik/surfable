import * as Actions from 'surfable-common/src/actions/All';
export type SIMPLE_COMMAND = 'SIMPLE_COMMAND';
export const SIMPLE_COMMAND: 'SIMPLE_COMMAND' = 'SIMPLE_COMMAND';

export interface SimpleCommand {
	readonly type: SIMPLE_COMMAND;
	readonly text: string;
	readonly desc: string;
	readonly cat: string;
	readonly imgUrl?: string;
	readonly pText?: string[]; // Refactor, please :-)
	readonly action: Actions.Type;
}

export type ICommand = SimpleCommand;
