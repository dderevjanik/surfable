import {createStore} from 'redux';
import {appReducer} from './AppReducer';
import {initState} from './AppState';

export const store = createStore(appReducer, initState);
