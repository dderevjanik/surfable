import { PANEL_OPEN, PANEL_CLOSE, PANEL_UP, PANEL_DOWN, PANEL_EXECUTE_COMMAND, PANEL_KEYPRESS } from './../ActionsList';
import { IPanel } from './../../interfaces/IPanel';
import { initState } from './../../InitState';

export const panelReducer = (state: IPanel = initState.quickpanel, action): IPanel => {
    switch(action.type) {
        case PANEL_UP: {
            return {
                ...state,
                offset: (state.offset - 1)
            }
        }
        case PANEL_DOWN: {
            return {
                ...state,
                offset: (state.offset + 1)
            }
        }
        case PANEL_OPEN: {
            const searchInput = document.getElementById('search_input');
            console.log(searchInput);
            if (searchInput) {
                searchInput.focus();
            }
            return {
                ...state,
                inputVal: '',
                opened: true
            };
        }
        case PANEL_CLOSE: {
            document.body.focus();
            return {
                ...state,
                opened: false
            }
        }
        case PANEL_EXECUTE_COMMAND: {
            return {
                ...state,
                opened: false
            }
        }
        case PANEL_KEYPRESS: {
            return {
                ...state,
                inputVal: (state.inputVal + action.char)
            }
        }
        default: {
            return state;
        }
    }
};
