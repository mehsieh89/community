import allReducers from './reducers/index';
import { createStore } from 'redux';
import { deepOrange500 } from 'material-ui/styles/colors';
import { getMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Homepage from './containers/Homepage';
import Profile from './containers/Profile';
import Login from './containers/Login';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
//test

const store = createStore(allReducers);

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  },
  tabs: {
    backgroundColor: 'white',
  }

});

const styles = {
  theme: {
    fontFamily: 'Roboto'
  }
};

injectTapEventPlugin();
if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={store} >
      <MuiThemeProvider muiTheme={muiTheme} fontFamily={'Roboto'}>
        <Homepage />
      </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
}

if (document.getElementById('profile')) {
  ReactDOM.render(
    <Provider store={store} >
      <MuiThemeProvider muiTheme={muiTheme} fontFamily={'Roboto'}>
        <Profile />
      </MuiThemeProvider>
    </Provider>, document.getElementById('profile'));
}

if (document.getElementById('login')) {
  ReactDOM.render(
    <Provider store={store} >
      <MuiThemeProvider muiTheme={muiTheme} fontFamily={'Roboto'}>
        <Login />
      </MuiThemeProvider>
    </Provider>, document.getElementById('login'));
}
