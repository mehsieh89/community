import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeHeader, updateForm, changeCenter, setMarkers, addGeolocation, addEvents, setCurrentEvent, toggleEventDetails, setCurrentEventParticipants, disableButton } from '../actions';
import { Card, MenuItem, RaisedButton, SelectField, TextField } from 'material-ui';
import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Community</h1>
        <h3 style={styles.text}>explore your surroundings, create new experiences</h3>
        <a href="/auth/facebook"><img src="https://www.bunditcenter.com/images/fb_signin.png" width="250" /></a>
      </div>
    );
  }
}

const styles = {
  title: {
    fontSize: 70,
    fontFamily: 'Vibur',
    marginBottom: 0
  },
  text: {
    fontSize: 20
  },
  container: {
    paddingTop: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'auto',
    height: window.innerHeight * 0.7,
    backgroundImage: 'url("https://www.iasfund.org/wp-content/uploads/2014/12/slider-community-hands.png")',
    backgroundSize: 'cover'
  }
};

const mapStateToProps = (state) => {
  return {
    header: state.header,
    events: state.events.allEvents,
    eventDetails: state.eventDetails,
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addEvents: addEvents,
    toggleEventDetails: toggleEventDetails,
    setCurrentEvent: setCurrentEvent,
    setCurrentEventParticipants: setCurrentEventParticipants,
    disableButton: disableButton
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Login);
