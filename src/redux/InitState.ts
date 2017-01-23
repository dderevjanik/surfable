import { IAppState } from './../interfaces/IAppState';

export const initState: IAppState = {
    commands: [],
    config: {
        maxCommands: 7
    },
    quickpanel: {
        opened: false,
        offset: 0
    }
};
