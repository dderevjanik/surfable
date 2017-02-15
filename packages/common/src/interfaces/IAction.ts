import { ETarget } from './../enums/ETarget';

export interface IMessage {
	readonly type: string;
	readonly target?: ETarget;
	[key: string]: any;
}
