import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import {Provider} from 'react-redux'
import AppContainer from './containers/AppContainer'
const store = configureStore()
ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
