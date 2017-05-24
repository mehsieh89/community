import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './containers/Homepage';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allreducers from './reducers/index';

const store = createStore(allreducers);

ReactDOM.render(
	<Provider store={store}>
		<Homepage />
	</Provider>, document.getElementById('root'));
