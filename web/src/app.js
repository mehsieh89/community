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
  raisedButton: {
    primaryColor: '#31575B',
    secondaryColor: '#C22B33'
  },
  flatButton: {
    textColor: '#31575B',
    primaryTextColor: '#31575B',
    secondaryColor: '#C22B33'
  },
  tabs: {
    backgroundColor: 'white',
  },
  tab: {
    fontWeight: 'bold',
  },
  theme: {
    fontFamily: 'Roboto'
  },
  datePicker: {
    selectColor: '#31575B',
  },
  timePicker: {
    accentColor: '#31575B',
    clockColor: '#31575B',
    headerColor: '#31575B',
  },
  textField: {
    focusColor: '#31575B',
  },
  dialog: {
    textColor: '#C22B33',
  }
});


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
