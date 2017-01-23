import * as React from 'react';
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QuickPanel } from './components/QuickPanel';

export const render = () => {
    const wrapper = document.createElement('div');
    wrapper.id = 'surfable';
    document.body.appendChild(wrapper);

    ReactDOM.render(
        <Provider store={store}>
            <QuickPanel/>
        </Provider>,
        document.getElementById('surfable')
    );
}
