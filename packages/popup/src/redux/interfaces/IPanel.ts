import { ICommand } from '../../interfaces/ICommand';

export interface IPanel {
	readonly allCommands: ICommand[];
	commands: ICommand[];
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
};
