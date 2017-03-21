import { createStore } from 'redux';
import { appReducer } from './PopupReducer';
import { initState } from './PopupState';

export const store = createStore(appReducer, initState);
