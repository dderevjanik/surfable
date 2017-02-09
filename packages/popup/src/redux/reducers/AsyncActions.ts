import {Type} from 'surfable-common/src/actions/all';
import {GET_FAVORITES, SHOW_FAVORITES} from './ActionsList';

declare const chrome;

export const getFavorites = () => chrome.runtime.sendMessage({type: GET_FAVORITES});

