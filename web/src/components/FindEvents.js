import axios from 'axios';
import { Card, Dialog, FlatButton, GridList, GridTile, IconButton, Subheader, SelectField, MenuItem, Popover, RaisedButton, Menu } from 'material-ui';
import GridTileComponent from './GridTile.js';
import Promise from 'bluebird';
import React, { Component } from 'react';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Select Category...',
      category: 'All',
      open: false,
    };
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleGeolocationSort = this.handleGeolocationSort.bind(this);
    this.handlePopularitySort = this.handlePopularitySort.bind(this);
  }

  handleTileClick(i) {
    const lat = this.props.events[i].lat;
    const lng = this.props.events[i].lng;
    this.props.changeCenter({lat: Number(lat), lng: Number(lng)});

    this.props.setCurrentEventParticipants([]);
    this.props.setCurrentEvent(this.props.events[i]);
    this.props.toggleEventDetails();

    axios.post('/api/connectEventToProfile', { eventId: this.props.events[i].id })
    .then(res => {
      this.props.disableButton({
        attendDisabled: !!res.data.is_attending,
        likeDisabled: !!res.data.liked
      });
    })
    .catch(err => { console.log(err); });

    axios.post('/api/retrieveParticipants', { eventId: this.props.events[i].id })
    .then(res => { this.props.setCurrentEventParticipants(res.data); })
    .catch(err => { console.log(err); });

    axios.post('/api/countLikes', { eventId: this.props.events[i].id })
    .then(res => { this.props.setCurrentEventLikes(res.data.like_count); })
    .catch(err => { console.log(err); });
  }

  handleChange(e) {
    this.setState({ category: e.target.innerHTML });
    axios.get('/api/retrieveCategoryEvents?query=' + e.target.innerHTML)
    .then((data) => {
      this.props.addEvents(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleChange(e) {
    axios.get('/api/retrieveCategoryEvents?query=' + e.target.innerHTML)
    .then((data) => {
      this.props.addEvents(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleGeolocationSort() {
    console.log(this.props.geolocation[0].position);
    axios.post('/api/retrieveEventsByLocation', this.props.geolocation[0].position)
    .then((res) => {
      this.props.addEvents(res.data);
      this.handleRequestClose();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePopularitySort() {
    axios.get('/api/retrieveEventsByPopularity')
    .then((res) => {
      this.props.addEvents(res.data);
      this.handleRequestClose();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <Card
        style={styles.container}
        containerStyle={styles.container}
      >
        <div>
          <RaisedButton
            label="Sort By..."
            onTouchTap={this.handleTouchTap}
            style={{position: 'relative', left: '-45', bottom: '20'}}
          />
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
              >
                <Menu>
                  <MenuItem primaryText="location" onTouchTap={this.handleGeolocationSort}/>
                  <MenuItem primaryText="popularity" onTouchTap={this.handlePopularitySort}/>
                </Menu>
              </Popover>
          <SelectField
            floatingLabelText={this.state.value}
            value={this.state.category}
            onChange={this.handleChange}
            style={styles.dropdown}
            >
            <MenuItem value="All" primaryText="All" />
            <MenuItem value="Food" primaryText="Food" />
            <MenuItem value="Sports" primaryText="Sports" />
            <MenuItem value="Outdoors" primaryText="Outdoors" />
            <MenuItem value="Nightlife" primaryText="Nightlife" />
            <MenuItem value="Games" primaryText="Games" />
            <MenuItem value="Other" primaryText="Other" />
          </SelectField>
          <br />
        </div>
        <GridList cellHeight={220} cols={2} style={styles.gridList}>
          {this.props.events.map((tile, i) => (
            <GridTileComponent
              key={i}
              indexID={i}
              title={tile.event_name}
              // titleBackground="linear-gradient(to top, rgba(94,53,177,0.7) 0%,rgba(94,53,177,0.3) 70%,rgba(94,53,177,0) 100%)"
              style={styles.tile}
              actionIcon={<IconButton><StarBorder color="f6f5f0" /></IconButton>}
              imageSRC={tile.image}
              data={this.props.events}
              onClick={() => this.handleTileClick(i)}
            >
            </GridTileComponent>
          ))}
        </GridList>
      </Card>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%',
    // backgroundColor: '#f6f5f0'
  },
  theme: {
    fontFamily: 'Roboto',
    fontSize: '20px'
  },
  gridList: {
    height: 490,
    padding: 15,
    overflowY: 'auto'
  },
  tile: {
    margin: 10,
    width: 270,
    cursor: 'pointer',
  },
  dropdown: {
    width: 250,
    position: 'relative',
    left: '120'
  }
};

export default FindEvents;
