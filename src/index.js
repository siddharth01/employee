import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// Initial action to load merchant list from API
import { getEmployees } from './actions/employeeActions';
// Store config
import configureStore from './store/configureStore';
// Service Worker
import registerServiceWorker from './registerServiceWorker';
// App component
import App from './App';

const store = configureStore();
// Load merchant list from API as soon as application initiates
store.dispatch(getEmployees());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
