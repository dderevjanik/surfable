import * as React from 'react';
import { iconS, commandS, commandHighlightS, textS, descS, highlightS, SSmallText } from './Command.style';

interface IProps {
	readonly active: boolean;
	readonly commandInd: number;
	readonly desc: string;
	readonly text: string;
	readonly partialText?: string[];
	readonly url: string;
	readonly imgUrl: string;
	readonly onCommandClick: () => void;
};

export const UrlCommand = (props: IProps) => (
	<li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick()}>
		{ (props.partialText)
			? (<span className={textS}>
					{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null}
					<span>{props.partialText[0]}</span>
					<span className={highlightS}>{props.partialText[1]}</span>
					<span>{props.partialText[2]}</span>
					<span className={SSmallText}>{props.url}</span>
				</span>)
			: <span className={textS}>{props.imgUrl ? <img className={iconS} src={props.imgUrl} /> : null} {props.text} <span className={SSmallText}>{props.url}</span></span>
		}
	</li>
);
