import {IAction} from './IAction';

export type NOTHING = 'NOTHING';
export const NOTHING: NOTHING = 'NOTHING';

export interface INothing extends IAction {
	readonly type: NOTHING;
}

export const nothing = (): INothing => ({
	type: NOTHING
});
