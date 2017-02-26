import { ICommand } from './ICommand';
import { ICommandsGroup } from './ICommandsGroup';

export interface IAppState {
	readonly commandsGroups: ICommandsGroup;
	readonly commands: ICommand[];
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
};
