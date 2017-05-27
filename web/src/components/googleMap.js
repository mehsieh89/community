import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const style = {
  position: 'absolute',
  height: '900px',
  width: '900px',
};

const Map = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={props.initialPosition}
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

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [{
        position: {
          lat: props.initialPosition.lat,
          lng: props.initialPosition.lng,
        },
        key: 'San Francisco',
        defaultAnimation: 2,
      }],
    };
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    // handleMarkerClick = this.handleMarkerClick.bind(this);
  }


  handleMapLoad(map) {
    this._mapComponent = map;
    // if (map) {
    //   console.log(map.getZooom());
    // }
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
  }

  // handleMarkerClick(targetMarker) {
  // }

  handleMarkerRightClick(targetMarker) {
    console.log(targetMarker.latlng);
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  render () {
    return (
      <div style={style}>
        <Map style={style}
          initialPosition={{ lat: 37.774929, lng: -122.419416 }}
          containerElement={
            <div className='map-container' style={{height: '100%'}} />
          }
          mapElement={
            <div className='map-section' style={{height: '100%'}} />
          }
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
