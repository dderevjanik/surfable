import {createStore, applyMiddleware} from 'redux';
import {appReducer} from './AppReducer';
import {initState} from './InitState';

export const store = createStore(appReducer, initState);
