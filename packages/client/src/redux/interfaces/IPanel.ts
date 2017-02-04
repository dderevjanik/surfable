import { ICommands } from './ICommands';

export interface IPanel {
    commands: ICommands;
    opened: boolean;
    offset: number;
    inputVal: string;
};
