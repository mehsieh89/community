import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeHeader, updateForm } from '../actions';
import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';

class Homepage extends Component {

  render() {
    return (
			<div>
        <Header changeHeader={this.props.changeHeader} header={this.props.header}/>
        <CreateEventForm
          createEventForm={this.props.createEventForm}
          updateForm={this.props.updateForm}
        />
			</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.header,
    createEventForm: state.createEventForm
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeHeader: changeHeader,
    updateForm: updateForm
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
