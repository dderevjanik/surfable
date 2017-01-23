import * as React from 'react';
import { connect } from 'react-redux';
import { CommandList } from './CommandList';
import { IAppState } from './../interfaces/IAppState';
import { ITextCommand } from './../interfaces/ITextCommand';

interface IProps {
    activeInd: number;
    commands: ITextCommand[];
    opened: boolean;
};

export const QuickPanelComponent = (props: IProps) => (
    <div className={`surfable_quickpanel ${props.opened ? '' : 'hidden'}`}>
        <div className="surfable_searchbox">
            <input id="surfable_input" type="text" value="" placeholder="type '?' to get help"/>
        </div>
        <div className="surfable_commands">
            <CommandList commands={props.commands} activeInd={props.activeInd}/>
        </div>
    </div>
);

export const QuickPanel = connect(
    (state: IAppState) => ({
            activeInd: state.quickpanel.offset,
            commands: state.commands,
            opened: state.quickpanel.opened
    })
)(QuickPanelComponent);
