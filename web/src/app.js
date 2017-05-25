import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './containers/Homepage';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import allReducers from './reducers/index';
//test
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { deepOrange500 } from 'material-ui/styles/colors';

const store = createStore(allReducers);

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  },
});

injectTapEventPlugin();
ReactDOM.render(
	<Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Homepage />
    </MuiThemeProvider>
	</Provider>, document.getElementById('root'));
