import * as React from 'react';
import { Command } from './Command';
import { ITextCommand } from './../interfaces/ITextCommand';

interface IProps {
    commands: ITextCommand[];
    activeInd: number;
};

export const CommandList = (props: IProps)  => (
    <ul>
        {
            props.commands.map((command, i) =>
                <Command
                    key={i}
                    name={command.text}
                    desc={command.desc}
                    active={(props.activeInd === i) ? true : false}
                />
            )
        }
    </ul>
);
