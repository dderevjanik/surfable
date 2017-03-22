import { ELevel } from '../enums/ELevel';

const style = (level: ELevel) => {
	console.log('creting elvels');
	switch (level) {
		case ELevel.ERROR: {
			return "";
		}
		case ELevel.NORMAL: {
			return "";
		}
		case ELevel.SUCCESS: {
			return "";
		}
		case ELevel.WARNING: {
			return "";
		}
		default: {
			throw new Error(`Unexpected toast's level: ${level}`);
		}
	}
};

export const Toast = (title: string, text: string, level: ELevel) => `
	<div id="xasj4lml" style="${style(level)}">
		<div>${title}</div>
		<div>${text}</div>
	</div>
`;
