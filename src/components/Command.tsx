import * as React from 'react';

interface IProps {
    name: string;
    desc: string;
    active: boolean;
};

export const Command = (props: IProps) => (
    <li className={ props.active ? 'surfable_command_hover' : ''}>
        <span>{ props.name }</span>
        <small>{ props.desc }</small>
    </li>
);
