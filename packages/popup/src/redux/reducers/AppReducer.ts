import { combineReducers } from 'redux';
import { formReducer } from 'redux-form';
import { configReducer } from './ConfigReducer/ConfigReducer';
import { panelReducer } from './PanelReducer/PanelReducer';
import { initState } from './../InitState';

export const appReducer = combineReducers({
    config: configReducer,
    form: formReducer,
    quickpanel: panelReducer
});
