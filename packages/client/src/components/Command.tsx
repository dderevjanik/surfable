import * as React from 'react';

interface IProps {
    active: boolean;
    category: string;
    commandInd: number;
    desc: string;
    name: string;
    onCommandClick: (commandInd: number) => null;
};

export const Command = (props: IProps) => (
    <li className={ props.active ? 'command_highlight' : ''} onClick={() => props.onCommandClick(props.commandInd)}>
        <span>{ `${props.category}: ${props.name}` }</span>
        <small>{ props.desc }</small>
    </li>
);
