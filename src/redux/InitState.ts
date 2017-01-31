import { IAppState } from './../interfaces/IAppState';
import { commands } from './../data/Commands';

export const initState: IAppState = {
    commands: commands,
    config: {
        maxCommands: 7
    },
    quickpanel: {
        opened: false,
        offset: 0,
        inputVal: ''
    }
};
