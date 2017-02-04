import * as React from 'react';
import { connect } from 'react-redux';
import { CommandList } from './../CommandList/CommandList';
import { SearchInput } from './../SearchInput/SearchInput';
import { IAppState } from './../../interfaces/IAppState';
import { ITextCommand } from './../../interfaces/ITextCommand';
import { executeCommand } from './../../redux/reducers/Actions';
import { quickPanelS, searchBoxS } from './QuickPanel.style';

interface IProps {
    activeInd: number;
    commands: ITextCommand[];
    opened: boolean;
    inputVal: string;
    onCommandClick: () => null;
};

export const QuickPanelComponent = (props: IProps) => (
    <div className={ quickPanelS }>
        <div className={ searchBoxS }>
            <SearchInput/>
        </div>
        <div>
            <CommandList commands={ props.commands } activeInd={props.activeInd} onCommandClick={props.onCommandClick}/>
        </div>
    </div>
);

export const QuickPanel = connect(
    (state: IAppState) => ({
            activeInd: state.quickpanel.offset,
            commands: state.quickpanel.commands,
            inputVal: state.quickpanel.inputVal,
            opened: state.quickpanel.opened
    }),
    (dispatch) => ({
        onCommandClick: () => dispatch(executeCommand())
    })
)(QuickPanelComponent);
