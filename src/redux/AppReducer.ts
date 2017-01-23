import { PANEL_OPEN, PANEL_CLOSE } from './ActionsList';
import { IAppState } from './../interfaces/IAppState';
import { initState } from './InitState';


export const appReducer = (state: IAppState = initState, action): IAppState => {
    switch(action.type) {
        case PANEL_OPEN: {
            if (!state.quickpanel.opened) {
                const searchInput = document.getElementById('surfable_input');
                if (searchInput) {
                    searchInput.focus();
                }
            };
            return {
                ...state,
                quickpanel: {
                    ...state.quickpanel,
                    opened: true
                }
            };
        }
        case PANEL_CLOSE: {
            return {
                ...state,
                quickpanel: {
                    ...state.quickpanel,
                    opened: false
                }
            }
        }
        default: {
            return state;
        }
    }
};
