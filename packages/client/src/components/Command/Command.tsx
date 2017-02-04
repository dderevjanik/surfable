import * as React from 'react';
import { commandS, commandHighlightS, categoryS, descS } from './Command.style';

interface IProps {
    active: boolean;
    category: string;
    commandInd: number;
    desc: string;
    name: string;
    onCommandClick: (commandInd: number) => null;
};

export const Command = (props: IProps) => (
    <li className={ `${commandS} + ${props.active ? commandHighlightS : ''}` } onClick={() => props.onCommandClick(props.commandInd)}>
        <span className={categoryS}>{`${props.category}: ${props.name}`}</span>
        <small className={descS}>{props.desc}</small>
    </li>
);
