import * as React from 'react';
import * as Style from './Command.style';
import { Highlight } from './Highlight';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly desc: string;
	readonly text: string;
	readonly partialText?: string[];
	readonly partialUrl?: string[];
	readonly url: string;
	readonly imgUrl: string;
	readonly onCommandClick: () => void;
};

export const UrlCommand = (props: IProps) => (
	<li className={`${Style.command} + ${props.active ? Style.commandHighlight : ''}`} onClick={() => props.onCommandClick()}>
		{props.imgUrl ? <img className={Style.icon} src={props.imgUrl} /> : null}
		<span className={Style.text}>
			{(props.partialText)
				? <Highlight partial={props.partialText} />
				: <span>{props.text}</span>}
			{(props.partialUrl)
				? <span className={Style.textSmall}>
					<Highlight partial={props.partialUrl} />
				</span>
				: <span className={Style.textSmall}>{props.url}</span>}
		</span>
	</li>
);
