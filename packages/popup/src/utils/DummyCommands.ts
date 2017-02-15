import { ETarget } from 'surfable-common/src/enums/ETarget';
import { ICommand } from './../interfaces/ICommand';

export const notFoundCommand: ICommand = {
	type: 'SIMPLE_COMMAND',
	cat: '',
	desc: '',
	action: {type: 'NOTHING', target: ETarget.BACKGROUND},
	text: 'No commands matching'
};
