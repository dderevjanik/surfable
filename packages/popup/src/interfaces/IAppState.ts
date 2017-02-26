import { ICommand } from './ICommand';

export interface IAppState {
	readonly commandsGroups: {[key: string]: ICommand[]}
	readonly commands: ICommand[];
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
};
