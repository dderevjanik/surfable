import { createStore } from 'redux';
import { appReducer } from './BackgroundReducer';
import { initState } from './BackgroundState';

export const store = createStore(appReducer, initState);
