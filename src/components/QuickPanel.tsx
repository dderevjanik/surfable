import * as React from 'react';
import { connect } from 'react-redux';
import { CommandList } from './CommandList';
import { IAppState } from './../interfaces/IAppState';
import { ITextCommand } from './../interfaces/ITextCommand';
import { executeCommand } from './../redux/reducers/Actions';

interface IProps {
    activeInd: number;
    commands: ITextCommand[];
    opened: boolean;
    inputVal: string;
    onCommandClick: (commandInd: number) => null;
};

export const QuickPanelComponent = (props: IProps) => (
    <div className={`quickpanel ${props.opened ? '' : 'hidden'}`}>
        <div className="searchbox">
            <input id="search_input" type="text" value={props.inputVal} placeholder="type '?' to get help"/>
        </div>
        <div className="commands">
            <CommandList commands={props.commands} activeInd={props.activeInd} onCommandClick={props.onCommandClick}/>
        </div>
    </div>
);

export const QuickPanel = connect(
    (state: IAppState) => ({
            activeInd: state.quickpanel.offset,
            commands: state.commands,
            inputVal: state.quickpanel.inputVal,
            opened: state.quickpanel.opened
    }),
    (dispatch) => ({
        onCommandClick: (commandInd: number) => dispatch(executeCommand(commandInd))
    })
)(QuickPanelComponent);
