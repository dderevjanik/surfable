import { combineReducers } from 'redux';
import { commandsReducer } from './CommandsReducer/CommandsReducer';
import { configReducer } from './ConfigReducer/ConfigReducer';
import { panelReducer } from './PanelReducer/PanelReducer';
import { initState } from './../InitState';

export const appReducer = combineReducers({
    commands: commandsReducer,
    config: configReducer,
    quickpanel: panelReducer
});
