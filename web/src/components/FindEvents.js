import React, { Component } from 'react';
import Promise from 'bluebird';
import { Card, GridList, GridTile, Subheader, IconButton } from 'material-ui';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import axios from 'axios';

class FindEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesData: []
    };
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

  render() {
    return (
      <Card style={styles.container}>
        <GridList cellHeight={180} cols={2} style={styles.gridList}>
          {this.state.tilesData.map((tile, i) => (
            <GridTile
              key={i}
              title={tile.event_name}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              // subtitle={<span>by <b>{tile.host_name}</b></span>}
              style={styles.tile}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
              <img src={tile.image} />
            </GridTile>
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
