import { ICommand } from './ICommand';

export type ICommandsGroup = {
    readonly [groupShortcut: string]: ICommand[]
};
