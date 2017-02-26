import { ICommand } from './ICommand';

export type ICommandsGroup = {
    [groupShortcut: string]: ICommand[]
};
