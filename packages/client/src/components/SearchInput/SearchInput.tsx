import * as React from 'react';
import { reduxForm } from 'redux-form';
import { searchInputS } from './SearchInput.style';

interface IProps {
    value: string;
    onSearchChange: (value: string) => void;
};

export class SearchInput extends React.Component<IProps, {}>{

    searchInput: HTMLInputElement = null;

    componentDidMount() {
        this.searchInput.focus();
    }

    render() {
        return (
            <input
                ref={(input) => { this.searchInput = input }}
                className={ searchInputS }
                type="text"
                onChange={(e) => this.props.onSearchChange(e.target.value)}
                placeholder="type '?' to get help"
                value={this.props.value}
            />
        );
    }
};
