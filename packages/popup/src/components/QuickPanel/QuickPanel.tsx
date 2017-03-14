import * as React from 'react';
import * as Style from './QuickPanel.style';
import { connect } from 'react-redux';
import { CommandList } from './../CommandList/CommandList';
import { SearchInput } from './../SearchInput/SearchInput';
import { IAppState } from './../../interfaces/IAppState';
import { ICommand } from './../../interfaces/ICommand';
import { ACTION } from './../../redux/Actions';

interface IProps {
	readonly activeInd: number;
	readonly commands: ICommand[];
	readonly opened: boolean;
	readonly inputVal: string;
	readonly onSearchChange: (newValue: string) => null;
};

export const QuickPanelComponent = (props: IProps) => (
	<div className={Style.quickPanel}>
		<div className={Style.searchBox}>
			<SearchInput value={props.inputVal} onSearchChange={props.onSearchChange} />
		</div>
		<div>
			<CommandList commands={props.commands} activeInd={props.activeInd} />
		</div>
	</div>
);

export const QuickPanel = connect(
	(state: IAppState) => ({
		activeInd: state.offset,
		commands: state.foundCommands,
		inputVal: state.inputVal,
		opened: state.opened
	}),
	dispatch => ({
		onSearchChange: (value: string) => dispatch({ type: ACTION.SEARCH_CHANGE, value: value })
	})
)(QuickPanelComponent);
