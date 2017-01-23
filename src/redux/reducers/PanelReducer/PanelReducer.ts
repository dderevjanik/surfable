import { PANEL_OPEN, PANEL_CLOSE, PANEL_UP, PANEL_DOWN, PANEL_EXECUTE_COMMAND } from './../ActionsList';
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
            setTimeout(() => {
                if (!state.opened) {
                    const searchInput = document.getElementById('surfable_input');
                    if (searchInput) {
                        searchInput.focus();
                    }
                };
            }, 100);
            return {
                ...state,
                opened: true
            };
        }
        case PANEL_CLOSE: {
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
        default: {
            return state;
        }
    }
};
