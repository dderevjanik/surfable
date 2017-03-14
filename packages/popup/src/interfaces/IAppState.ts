import { ICommand } from './ICommand';
import { ICommandsGroup } from './ICommandsGroup';

const enum ESearchMode {
	GROUPS = 0,
	COMMANDS = 1
}

export interface IAppState {
	readonly searchMode: ESearchMode;
	readonly commandsGroups: ICommandsGroup;
	readonly commands: ICommand[];
	readonly foundCommands: ICommand[];
	readonly opened: boolean;
	readonly offset: number;
	readonly inputVal: string;
	readonly tabHistory: { id: number, history: chrome.tabs.Tab[] }[];
};
