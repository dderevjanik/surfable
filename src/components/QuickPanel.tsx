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
    <div className={`quickpanel ${props.opened ? '' : 'hidden'}`}>
        <div className="searchbox">
            <input id="search_input" type="text" value="" placeholder="type '?' to get help"/>
        </div>
        <div className="commands">
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
