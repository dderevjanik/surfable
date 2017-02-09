import { IPanel } from './../redux/interfaces/IPanel';
import { IConfig } from './../redux/interfaces/IConfig';

export interface IAppState {
	readonly config: IConfig;
	readonly quickpanel: IPanel;
};
