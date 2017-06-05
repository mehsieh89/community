import React, { Component } from 'react';
import { Dialog, FlatButton } from 'material-ui';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.toggleEventDetails();
  }

  render() {
    console.log('**********', this.props.currentEventIndex);
    let currentEvent = this.props.events[this.props.currentEventIndex];

    const actions = [
      <FlatButton
       label="Cancel"
       primary={true}
       onTouchTap={this.handleClose}
      />,
    ];

    if (currentEvent) {
      return (
        <Dialog
          title="Event Details"
          actions={actions}
          modal={false}
          open={this.props.showEventDetails}
          onRequestClose={this.handleClose}
          >
            Event Name: {currentEvent.event_name}
            <br />
            Time: {currentEvent.time}
            <br />
            Location: {currentEvent.location}
            <br />
            Description: {currentEvent.description}
            <br />
            Category: {currentEvent.category}
        </Dialog>
      );
    } else { return null; }
  }
}

export default EventDetails;
