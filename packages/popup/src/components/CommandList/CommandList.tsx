import * as React from 'react';
import { Command } from './../Command/Command';
import { ITextCommand } from './../../interfaces/ITextCommand';
import { ulS } from './CommandList.style';

interface IProps {
    commands: ITextCommand[];
    activeInd: number;
    onCommandClick: (commandInd: number) => null;
};

export const CommandList = (props: IProps)  => (
    <ul className={ ulS }>
        {
            props.commands.map((command, i) =>
                <Command
                    active={(props.activeInd === i) ? true : false}
                    category={command.cat}
                    commandInd={i}
                    desc={command.desc}
                    key={i}
                    name={command.text}
                    onCommandClick={props.onCommandClick}
                    partialText={command.pText}
                />
            )
        }
    </ul>
);
