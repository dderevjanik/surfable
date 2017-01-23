import { createStore } from 'redux';
import { appReducer } from './Reducers/AppReducer';
import { initState } from './InitState';

export const store = createStore(appReducer, initState);
