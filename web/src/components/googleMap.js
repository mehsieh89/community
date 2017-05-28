import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import axios from 'axios';
import LocationInput from './LocationInput';

const Key = process.env.GOOGLE_API_KEY;
const GeoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const RevGeoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const style = {
  position: 'absolute',
  height: '100%',
  width: '100%',
};

class Gmap extends Component {
  constructor(props) {
    super(props);

    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
    this.handleReverseGeoCode = this.handleReverseGeoCode.bind(this);
  }

  handleMapLoad(map) {
    this._mapComponent = map;
  }

  handleMapClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const nextMarkers = [
      ...this.props.markers,
      {
        position: {lat: lat, lng: lng},
        defaultAnimation: 3,
        key: Date.now(),
      },
    ];
    this.props.setMarkers(nextMarkers);
    this.props.changeCenter({lat: lat, lng: lng});
    this.handleReverseGeoCode({lat: lat, lng: lng});
  }

  handleMarkerClick(targetMarker) {
    console.log('Great Success');
    const latlng = {
      lat: targetMarker.position.lat,
      lng: targetMarker.position.lng
    };
    // this.handleReverseGeoCode(latlng);
  }

  handleMarkerRightClick(targetMarker) {
    const nextMarkers = this.props.markers.filter(marker => marker !== targetMarker);
    this.props.setMarkers(nextMarkers);
  }

  handleReverseGeoCode(latlng) {
    axios.get(RevGeoCodeURL + latlng.lat + ',' + latlng.lng + Key)
    .then((res) => {
      console.log(res.data.results[0].formatted_address);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render () {
    const Map = withGoogleMap(props => (
      <GoogleMap
        ref={props.onMapLoad}
        zoom={16}
        center={this.props.googleMap}
        onClick={props.onMapClick}
        >
          {props.markers.map((marker) => (
            <Marker
            {...marker}
            onClick={() => props.onMarkerClick(marker)}
            onRightClick={() => props.onMarkerRightClick(marker)}
          />
        ))}
      </GoogleMap>
    ));

    return (
      <div style={style}>
        <LocationInput
          markers={this.props.markers}
          setMarkers={this.props.setMarkers}
          changeCenter={this.props.changeCenter}
          handleReverseGeoCode={this.handleReverseGeoCode}
          />
        <Map style={style}
          containerElement={ <div className='map-container' style={style}></div>}
          mapElement={ <div id='map' className='map-section' style={style}></div>}
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.props.markers}
          onMarkerRightClick={this.handleMarkerRightClick}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default Gmap;
