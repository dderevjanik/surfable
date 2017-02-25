import { ICommand } from './ICommand';

export interface IAppState {
	readonly defaultCommands: ICommand[];
	readonly commandsGroups: {[key: string]: ICommand[]}
	readonly allCommands: ICommand[];
	readonly commands: ICommand[];
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
};
