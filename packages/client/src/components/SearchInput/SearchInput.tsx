import * as React from 'react';
import { reduxForm } from 'redux-form';
import { searchInputS } from './SearchInput.style';

export const SearchInputComponent = () => (
    <input className={ searchInputS } type="text" placeholder="type '?' to get help"/>
);

export const SearchInput = reduxForm({
    form: 'search'
})(SearchInputComponent);
