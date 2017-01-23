import { ICommands } from './../../interfaces/ICommands';
import { initState } from './../../InitState';

export const commandsReducer = (state: ICommands = initState.commands, action): ICommands => {
    switch(action.type) {
        default: {
            return state;
        }
    }
};
