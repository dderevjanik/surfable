import { PANEL_OPEN, PANEL_CLOSE, PANEL_UP, PANEL_DOWN } from './../ActionsList';
import { IPanel } from './../../interfaces/IPanel';
import { initState } from './../../InitState';

export const panelReducer = (state: IPanel = initState.quickpanel, action): IPanel => {
    switch(action.type) {
        case PANEL_UP: {
            break;
        }
        case PANEL_DOWN: {
            break;
        }
        case PANEL_OPEN: {
            if (!state.opened) {
                const searchInput = document.getElementById('surfable_input');
                if (searchInput) {
                    searchInput.focus();
                }
            };
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
        default: {
            return state;
        }
    }
};
