import * as React from 'react';
import * as Style from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly text: string;
	readonly desc: string;
	readonly group: string;
	readonly onCommandClick: () => void;
};

export const QuickPanelCommand = (props: IProps) => (
	<li className={`${Style.command} + ${props.active ? Style.commandHighlight : ''}`} onClick={() => props.onCommandClick()}>
		<span className={Style.textHighlight}>{props.text}</span>
		<span className={Style.textSmall}>{props.desc}</span>
	</li>
);
