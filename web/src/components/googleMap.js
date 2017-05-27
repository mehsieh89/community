import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import LocationInput from './LocationInput';

const style = {
  position: 'absolute',
  height: '900px',
  width: '900px',
};

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: props.center.lat,
          lng: props.center.lng,
        },
        key: 'San Francisco',
        defaultAnimation: 2,
      }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    // this.handleLocationInput = this.handleLocationInput.bind(this);
    // this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }


  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
        defaultAnimation: 2,
        key: Date.now(),
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
    this.props.changeCenter({lat: event.latLng.lat(), lng: event.latLng.lng()});
  }

  // handleMarkerClick(targetMarker) {
  //   console.log('meow!');
  // }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
    // console.log(this.state.center);
  }

  // handleLocationInput() {
  //
  // }

  render () {
    const Map = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        defaultZoom={9}
        center={this.props.googleMap}
        onClick={props.onMapClick}
        >
          {props.markers.map((marker) => (
            <Marker
            {...marker}
            onRightClick={() => props.onMarkerRightClick(marker)}
          />
        ))}
      </GoogleMap>
    ));

    return (
      <div style={style}>
        <LocationInput />
        <Map style={style}
          containerElement={ <div className='map-container' style={style}></div>}
          mapElement={ <div id='map' className='map-section' style={style}></div>}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          // onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default Gmap;
