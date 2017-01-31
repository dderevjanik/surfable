import * as React from 'react';

interface IProps {
    active: boolean;
    commandInd: number;
    desc: string;
    name: string;
    onCommandClick: (commandInd: number) => null;
};

export const Command = (props: IProps) => (
    <li className={ props.active ? 'command_highlight' : ''} onClick={() => props.onCommandClick(props.commandInd)}>
        <span>{ props.name }</span>
        <small>{ props.desc }</small>
    </li>
);
