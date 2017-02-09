import {IAction} from './IAction';

export type GET_FAVORITES = 'GET_FAVORITES';
export const GET_FAVORITES: GET_FAVORITES = 'GET_FAVORITES';

export interface IGetFavorites extends IAction {
	readonly type: GET_FAVORITES;
}

export const getFavorites = (): IGetFavorites => ({
	type: GET_FAVORITES
});
