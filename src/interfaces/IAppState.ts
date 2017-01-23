import { ITextCommand } from './ITextCommand';

export interface IAppState {
    commands: ITextCommand[];
    config: {
        maxCommands: number;
    },
    quickpanel: {
        opened: boolean;
        offset: number;
    }
};
