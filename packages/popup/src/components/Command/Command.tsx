import * as React from 'react';
import { commandS, commandHighlightS, textS, descS, highlightS } from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly category: string;
	readonly commandInd: number;
	readonly desc: string;
	readonly partialText: string[];
	readonly name: string;
	readonly onCommandClick: () => void;
};

export const Command = (props: IProps) => (
	<li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick()}>
		{ (props.partialText)
			? (<span className={textS}>
					<span>{props.partialText[0]}</span>
					<span className={highlightS}>{props.partialText[1]}</span>
					<span>{props.partialText[2]}</span>
				</span>)
			: <span className={textS}>{`${props.category}: ${props.name}`}</span>
		}
		<small className={descS}>{props.desc}</small>
	</li>
);
