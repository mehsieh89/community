import axios from 'axios';
import { Card, Dialog, FlatButton, GridList, GridTile, IconButton, Subheader } from 'material-ui';
import GridTileComponent from './GridTile.js';
import Promise from 'bluebird';
import React, { Component } from 'react';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class ProfileGrid extends Component {
  constructor(props) {
    super(props);
    this.onGridClick = this.onGridClick.bind(this);
  }

  onGridClick(i) {
    this.props.setCurrentEventParticipants([]);
    this.props.setCurrentEvent(this.props.events[i]);
    this.props.toggleEventDetails();

    axios.post('/api/connectEventToProfile', { eventId: this.props.events[i].id })
    .then(res => {
      this.props.updateButton({
        isAttendingEvent: !!res.data.is_attending,
        hasLikedEvent: !!res.data.liked
      });
    })
    .catch(err => { console.log(err); });

    axios.post('/api/retrieveParticipants', { eventId: this.props.events[i].id })
    .then(res => {
      this.props.setCurrentEventParticipants(res.data);
    })
    .catch(err => { console.log(err); });

    axios.post('/api/countLikes', { eventId: this.props.events[i].id })
    .then(res => { this.props.setCurrentEventLikes(res.data.like_count); })
    .catch(err => { console.log(err); });
  }

  render() {
    return (
      <GridList style={styles.gridList}>
        {this.props.events.map((tile, i) => (
          <GridTileComponent
            key={i}
            indexID={i}
            title={tile.event_name}
            style={styles.tile}
            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            imageSRC={tile.image}
            data={this.props.events}
            onClick={() => this.onGridClick(i)}
          >
          </GridTileComponent>
        ))}
      </GridList>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  theme: {
    fontFamily: 'Roboto',
    fontSize: '20px'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: window.innerWidth * .92,
    height: 200,
    overflowX: 'auto',
    padding: 10,
    marginLeft: 30,
  },
  tile: {
    margin: 10,
    width: 280,
    height: 180,
    cursor: 'pointer'
  },
};

export default ProfileGrid;
