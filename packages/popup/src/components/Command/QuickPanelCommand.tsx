import * as React from 'react';
import { commandS, commandHighlightS, highlightCommandS, textS, descS, SSmallText } from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly text: string;
	readonly desc: string;
	readonly group: string;
	readonly onCommandClick: () => void;
};

export const QuickPanelCommand = (props: IProps) => (
	<li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick()}>
		<span className={highlightCommandS}>{props.text}</span>
		<span className={SSmallText}>{props.desc}</span>
	</li>
);
