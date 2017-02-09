import {GET_FAVORITES} from './ActionsList';
import {sendToBackground} from 'surfable-common/src/Sender';

export const getFavorites = () => sendToBackground({type: GET_FAVORITES});
