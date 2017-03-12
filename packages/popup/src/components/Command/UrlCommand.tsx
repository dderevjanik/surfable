import * as React from 'react';
import { iconS, commandS, commandHighlightS, textS, descS, highlightS, SSmallText } from './Command.style';
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
	<li className={`${commandS} + ${props.active ? commandHighlightS : ''}`} onClick={() => props.onCommandClick()}>
		{((props.partialText) || (props.partialUrl))
			? (<span className={textS}>
				{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null}
				<Highlight partial={props.partialText} />
				<Highlight partial={props.partialUrl} />
			</span>)
			: <span className={textS}>{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null} {props.text} <span className={SSmallText}>{props.url}</span></span>
		}
	</li>
);
