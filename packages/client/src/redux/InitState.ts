import { IAppState } from './../interfaces/IAppState';
import { commands } from './../data/Commands';

export const initState: IAppState = {
    config: {
        maxCommands: 7
    },
    quickpanel: {
        commands: commands,
        opened: false,
        offset: 0,
        inputVal: ''
    }
};
