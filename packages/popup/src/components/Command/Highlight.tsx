import * as React from 'react';
import { highlightS } from './Command.style';

interface IProps {
    readonly partial: string[];
}

export const Highlight = ({ partial }) => (
    <span>
        <span>
            {partial[0]}
        </span>
        <span className={highlightS}>
            {partial[1]}
        </span>
        <span>
            {partial[2]}
        </span>
    </span>
);
