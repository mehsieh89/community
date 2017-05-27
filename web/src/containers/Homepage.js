import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeHeader, updateForm } from '../actions';
import Header from '../components/Header';
import CreateEventForm from '../components/CreateEventForm';
import Gmap from '../components/googleMap';

const style = {
  position: 'absolute',
  height: '900px',
  width: '900px',
};

class Homepage extends Component {

  render() {
    return (
			<div>
        <Header changeHeader={this.props.changeHeader} header={this.props.header}/>
        <CreateEventForm
          createEventForm={this.props.createEventForm}
          updateForm={this.props.updateForm}
        />
        <div style={style}>
          <Gmap style={style} initialPosition={{ lat: 37.774929, lng: -122.419416 }}
            markers={[]}
            containerElement={ <div className='map-container' style={style}></div>}
            mapElement={ <div id='map' className='map-section' style={style}></div>}
          />
        </div>
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
