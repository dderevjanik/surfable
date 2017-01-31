import { ICommands } from './../../interfaces/ICommands';
import { initState } from './../../InitState';
import { PANEL_EXECUTE_COMMAND } from './../ActionsList';

export const commandsReducer = (state: ICommands = initState.commands, action): ICommands => {
    switch(action.type) {
        case PANEL_EXECUTE_COMMAND: {
            state[action.commandInd].func();
            return state;
        }
        default: {
            return state;
        }
    }
};
