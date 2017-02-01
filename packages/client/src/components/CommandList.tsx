import * as React from 'react';
import { Command } from './Command';
import { ITextCommand } from './../interfaces/ITextCommand';

interface IProps {
    commands: ITextCommand[];
    activeInd: number;
    onCommandClick: (commandInd: number) => null;
};

export const CommandList = (props: IProps)  => (
    <ul>
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
                />
            )
        }
    </ul>
);
