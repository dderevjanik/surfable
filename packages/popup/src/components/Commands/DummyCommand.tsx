import * as React from 'react';
import * as Style from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly text: string;
	readonly onCommandClick: () => void;
};

export const DummyCommand = (props: IProps) => (
	<li className={`${Style.command} + ${props.active ? Style.commandHighlight : ''}`} onClick={() => props.onCommandClick()}>
		<i> {props.text} </i>
	</li>
);
