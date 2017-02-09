import * as React from 'react';
import { iconS, commandS, commandHighlightS, textS, descS, highlightS } from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly category: string;
	readonly commandInd: number;
	readonly desc: string;
	readonly imgUrl: string;
	readonly partialText: string[];
	readonly name: string;
	readonly onCommandClick: () => void;
};

export const Command = (props: IProps) => (
	<li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick()}>
		{ (props.partialText)
			? (<span className={textS}>
					{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null}
					<span>{props.partialText[0]}</span>
					<span className={highlightS}>{props.partialText[1]}</span>
					<span>{props.partialText[2]}</span>
				</span>)
			: <span className={textS}>{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null}{`${props.category}: ${props.name}`}</span>
		}
		<small className={descS}>{props.desc}</small>
	</li>
);
