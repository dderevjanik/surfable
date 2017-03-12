import * as React from 'react';
import * as Style from './SearchInput.style';

interface IProps {
	readonly value: string;
	readonly onSearchChange: (value: string) => void;
}

export class SearchInput extends React.Component<IProps, {}>{

	searchInput: HTMLInputElement = null;

	componentDidMount() {
		// Automatically focus on search input, so user will be able to type ASAP
		this.searchInput.focus();
	}

	render() {
		return (
			<input
				ref={(input) => { this.searchInput = input; }}
				className={Style.searchInput}
				type="text"
				onChange={(e) => this.props.onSearchChange(e.target.value)}
				placeholder="type '?' to get help on actions you can take from here"
				value={this.props.value}
			/>
		);
	}
};
