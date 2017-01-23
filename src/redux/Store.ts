import { createStore } from 'redux';
import { appReducer } from './AppReducer';
import { initState } from './InitState';

export let store = createStore(appReducer);
