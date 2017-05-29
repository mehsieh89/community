import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeHeader, updateForm, changeCenter, setMarkers } from '../actions';
import axios from 'axios';
import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';
import { GridList, Tabs, Tab } from 'material-ui';
import Gmap from '../components/googleMap';

const style = {
  position: 'absolute',
  display: 'inline',
  height: '500px',
  width: '610px',
};

class Homepage extends Component {
  render() {
    return (
      <div>
        <Header changeHeader={this.props.changeHeader} header={this.props.header}/>
        <GridList cellHeight="auto">
          <Tabs>
            <Tab label="Find Events"> Event Grid </Tab>
            <Tab label="Create Event" >
              <CreateEventForm
                className="createEventForm"
                createEventForm={this.props.createEventForm}
                updateForm={this.props.updateForm}
              />
            </Tab>
          </Tabs>
          <div style={style}>
            <Gmap
              center={this.props.googleMap.center}
              markers={this.props.googleMap.markers}
              changeCenter={this.props.changeCenter}
              googleMap={this.props.googleMap.center}
              setMarkers={this.props.setMarkers}
            />
          </div>
        </GridList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.header,
    createEventForm: state.createEventForm,
    googleMap: state.googleMap
  };
};

const matchDispatchToProps = (dispatch) => {
  return bindActionCreators({
    changeHeader: changeHeader,
    updateForm: updateForm,
    changeCenter: changeCenter,
    setMarkers: setMarkers,
  }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(Homepage);
