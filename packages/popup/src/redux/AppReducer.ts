import {combineReducers} from 'redux';
import {panelReducer} from './PanelReducer';
import {initState} from './InitState';

export const appReducer = combineReducers({
	quickpanel: panelReducer
});
