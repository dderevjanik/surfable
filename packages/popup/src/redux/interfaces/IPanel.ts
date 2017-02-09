import { ICommands } from './ICommands';

export interface IPanel {
	readonly allCommands: ICommands;
	commands: ICommands;
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
};
