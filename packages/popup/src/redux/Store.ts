import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './Reducers/AppReducer';
import {initState} from './InitState';

export const store = createStore(appReducer, initState, applyMiddleware(thunk));
