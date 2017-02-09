import {Chrome} from '../../../popup/src/data/Chrome';
import {IAction} from './IAction';

export type SHOW_FAVORITES = 'SHOW_FAVORITES';
export const SHOW_FAVORITES: SHOW_FAVORITES = 'SHOW_FAVORITES';

export interface IShowFavorites extends IAction {
	readonly type: SHOW_FAVORITES;
	readonly favorites: chrome.topSites.MostVisitedURL[];
}

export const showFavorites = (favorites: chrome.topSites.MostVisitedURL[]): IShowFavorites => ({
	type: SHOW_FAVORITES,
	favorites: favorites
});
