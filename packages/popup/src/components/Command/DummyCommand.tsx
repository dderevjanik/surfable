import * as React from 'react';
import { iconS, commandS, commandHighlightS, textS, descS, highlightS } from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly text: string;
	readonly onCommandClick: () => void;
};

export const DummyCommand = (props: IProps) => (
	<li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick()}>
		<i> {props.text} </i>
	</li>
);
