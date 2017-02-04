import { ICommands } from './ICommands';

export interface IPanel {
    readonly commands: ICommands;
    readonly opened: boolean;
    readonly offset: number;
    readonly inputVal: string;
};
