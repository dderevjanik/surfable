import {ETarget} from './../enums/ETarget';

export interface IAction {
	readonly type: string;
	readonly target?: ETarget;
	[key: string]: any;
}
