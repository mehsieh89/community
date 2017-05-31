import React, { Component } from 'react';
import Promise from 'bluebird';
import { Card, GridList, GridTile, Subheader, IconButton, Dialog, FlatButton } from 'material-ui';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import axios from 'axios';
import GridTileComponent from './GridTile.js';

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesData: [],
      open: false,
      eventInfo: {
        event_name: '',
        category: '',
        description: '',
        location: '',
        time: '',
      }
    };
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.retrieveEvents();
  }

  // TODO: filter incoming data by user location
  retrieveEvents(location) {
    axios.get('/api/retrieveEvents')
    .then((res) => {
      this.setState({ tilesData: res.data });
    });
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleTileClick(i) {
    this.handleOpen();
    console.log(this.state.tilesData[i]);
    this.setState({
      eventInfo: {
        event_name: this.state.tilesData[i].event_name,
        category: this.state.tilesData[i].category,
        description: this.state.tilesData[i].description,
        location: this.state.tilesData[i].location,
        time: this.state.tilesData[i].time,
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
       label="Cancel"
       primary={true}
       onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <Card style={styles.container}>
        <GridList cellHeight={180} cols={2} style={styles.gridList}>
          {this.state.tilesData.map((tile, i) => (
            <GridTileComponent
              key={i}
              indexID={i}
              title={tile.event_name}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              // subtitle={<span>by <b>{tile.host_name}</b></span>}
              style={styles.tile}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              imageSRC={tile.image}
              data={this.state.tilesData}
              onClick={this.handleTileClick}
              dialog={this.state.open}
            >
            </GridTileComponent>
          ))}
          <Dialog
           title="Event Details"
           actions={actions}
           modal={false}
           open={this.state.open}
           onRequestClose={this.handleClose}
           >
             Event Name: {this.state.eventInfo.event_name}
             <br />
             Time: {this.state.eventInfo.time}
             <br />
             Location: {this.state.eventInfo.location}
             <br />
             Description: {this.state.eventInfo.description}
             <br />
             Category: {this.state.eventInfo.category}
           </Dialog>
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
  },
  gridList: {
    height: 490,
    padding: 15,
    overflowY: 'auto',
  },
  tile: {
    margin: 10
  }
};

export default FindEvents;
//
