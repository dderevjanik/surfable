import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QuickPanel } from './components/QuickPanel/QuickPanel';

export const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <QuickPanel/>
        </Provider>,
        document.getElementById('app')
    );
}
