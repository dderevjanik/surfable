import * as React from 'react';
import { reduxForm } from 'redux-form';
import { searchInputS } from './SearchInput.style';

class SearchInputComponent extends React.Component<{}, {}>{

    searchInput: HTMLInputElement = null;

    componentDidMount() {
        this.searchInput.focus();
    }

    render() {
        return (
            <input
                ref={(input) => {this.searchInput = input}}
                className={ searchInputS }
                type="text"
                placeholder="type '?' to get help"
            />
        );
    }
};

export const SearchInput = reduxForm({
    form: 'search'
})(SearchInputComponent);
