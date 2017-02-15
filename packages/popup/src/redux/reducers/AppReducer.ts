import {combineReducers} from 'redux';
import {configReducer} from './ConfigReducer/ConfigReducer';
import {panelReducer} from './PanelReducer/PanelReducer';
import {initState} from './../InitState';

export const appReducer = combineReducers({
	config: configReducer,
	quickpanel: panelReducer
});
