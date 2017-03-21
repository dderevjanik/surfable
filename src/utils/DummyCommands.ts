import { ETarget } from '../enums/ETarget';
import { ICommand, COMMAND } from './../interfaces/ICommand';

export const notFoundCommand: ICommand = {
	type: COMMAND.DUMMY,
	cat: '',
	desc: '',
	action: { type: 'NOTHING', target: ETarget.BACKGROUND },
	text: 'No commands matching'
};
