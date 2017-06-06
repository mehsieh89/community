import axios from 'axios';
import { Card, Dialog, FlatButton, GridList, GridTile, IconButton, Subheader } from 'material-ui';
import GridTileComponent from './GridTile.js';
import Promise from 'bluebird';
import React, { Component } from 'react';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesData: [],
    };
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  handleTileClick(i) {
    this.props.setCurrentEvent(i);
    this.props.toggleEventDetails();
  }

  render() {
    return (
      <Card
        style={styles.container}
        containerStyle={styles.container}
      >
        <GridList cellHeight={180} cols={2} style={styles.gridList}>
          {this.props.events.map((tile, i) => (
            <GridTileComponent
              key={i}
              indexID={i}
              title={tile.event_name}
              titleBackground="white"
              style={styles.tile}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
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
    height: '100%'
  },
  theme: {
    fontFamily: 'Vibur',
    fontSize: '20px'
  },
  gridList: {
    height: 490,
    padding: 15,
    overflowY: 'auto'
  },
  tile: {
    margin: 10,
  }
};

export default FindEvents;
