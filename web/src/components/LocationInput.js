import React, { Component } from 'react';
import { RaisedButton, TextField, Card, AutoComplete } from 'material-ui';
import Promise from 'bluebird';
import axios from 'axios';
import config from '../../../config/development.json';

const KEY = config.GoogleKey;
const GeoCodeURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

export default class LocationInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      autoComplete: [{
        geometry: {
          location: {
            lat: null,
            lng: null,
          }
        }
      }],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleLocationInput = this.handleLocationInput.bind(this);
  }

  handleChange (value) {
    return new Promise ((resolve, reject) => {
      resolve(this.setState({
        location: value
      }));
    })
    .then(() => {
      this.handleLocationInput(this.state.location);
    });
  }

  handleLocationSearch() {
    const lat = this.state.autoComplete[0].geometry.location.lat;
    const lng = this.state.autoComplete[0].geometry.location.lng;
    const nextMarkers = [
      ...this.props.markers,
      {
        position: {
          lat: lat,
          lng: lng,
        },
        defaultAnimation: 3,
        key: Date.now(),
      },
    ];
    this.props.setMarkers(nextMarkers);
    this.props.changeCenter({lat: lat, lng: lng});
    this.props.handleReverseGeoCode({lat: lat, lng: lng});
  }

  handleLocationInput(location) {
    let string = location.split(' ').join('+');
    axios.get(GeoCodeURL + string + '&key=' + KEY)
    .then((res) => {
      let acArray = [];
      for (let i = 0; i < res.data.results.length; i++) {
        acArray.push(res.data.results[i]);
      }
      return acArray;
    })
    .then((array) => {
      this.setState({
        autoComplete: array
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render () {
    const dataSource = this.state.autoComplete.map((obj) => {
      return obj.formatted_address;
    });
    const filter = () => true;
    return (
      <Card className="searchLocation">
        <label> Location: </label>
        <AutoComplete dataSource={dataSource}
          name="address"
          value={this.state.location}
          autoFocus
          filter={filter}
          onUpdateInput={this.handleChange}/>
        <RaisedButton label="search" onTouchTap={this.handleLocationSearch}/>
      </Card>
    );
  }
}
