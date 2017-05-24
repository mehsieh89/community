import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeHeader } from '../actions';
import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';

class Homepage extends Component {
  render () {
    return (
			<div>
        <Header changeHeader={this.props.changeHeader} header={this.props.header}/>
        <CreateEventForm />
			</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.header
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({ changeHeader: changeHeader}, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
