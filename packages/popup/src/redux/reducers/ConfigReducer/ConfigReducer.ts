import { IConfig } from './../../interfaces/IConfig';
import { initState } from './../../InitState';

export const configReducer = (state: IConfig = initState.config, action): IConfig => {
	switch(action.type) {
		default: {
			return state;
		}
	}
};
