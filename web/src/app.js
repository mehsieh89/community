import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/headerContainer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allreducers from './reducers/index';

const store = createStore(allreducers);

// ReactDOM.render(<h1>Hello</h1>, document.getElementById('root'));
ReactDOM.render(
	<Provider store={store}>
		<Header/>
	</Provider>, document.getElementById('root'));
