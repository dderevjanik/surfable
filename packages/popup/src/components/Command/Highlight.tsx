import * as React from 'react';
import * as Style from './Command.style';

interface IProps {
    readonly partial: string[];
}

export const Highlight = ({ partial }) => (
    <span>
        <span>
            {partial[0]}
        </span>
        <span className={Style.textHighlight}>
            {partial[1]}
        </span>
        <span>
            {partial[2]}
        </span>
    </span>
);
