import * as React from 'react';
import * as Style from './Command.style';
import { Highlight } from './Highlight';

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

export const SimpleCommand = (props: IProps) => (
	<li className={`${Style.command} + ${props.active ? Style.commandHighlight : ''}`} onClick={() => props.onCommandClick()}>
		{(props.partialText)
			? (<span className={Style.text}>
				{props.imgUrl ? <img className={Style.icon} src={props.imgUrl} /> : null}
				<Highlight partial={props.partialText} />
			</span>)
			: <span className={Style.text}>{props.imgUrl ? <img className={Style.icon} src={props.imgUrl} /> : null}{`${props.category}: ${props.name}`}</span>
		}
		<small className={Style.description}>{props.desc}</small>
	</li>
);
