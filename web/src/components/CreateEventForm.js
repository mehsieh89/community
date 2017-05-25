import React, { Component } from 'react';
import { RaisedButton, TextField, Card } from 'material-ui';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateForm(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Card className="createEventForm">
        <label> Event Name: </label>
        <TextField
          name="eventName"
          value={this.props.createEventForm.eventName}
          autoFocus
          onChange={this.handleChange}/>
        <br />
        <label> Time: </label>
        <TextField
          name="time"
          value={this.props.createEventForm.time}
          onChange={this.handleChange}/>
        <br />
        <label> Location: </label>
        <TextField
          name="location"
          value={this.props.createEventForm.location}
          onChange={this.handleChange}/>
        <br />
        <label> Description: </label>
        <TextField
          name="description"
          value={this.props.createEventForm.description}
          onChange={this.handleChange}/>
        <br />
        <label> Group Size: </label>
        <TextField
          name="groupSize"
          value={this.props.createEventForm.groupSize}
          onChange={this.handleChange} />
        <br />
        <RaisedButton label="Create Event" secondary={true} onTouchTap={this.handleSubmit} />
      </Card>
    );
  }
}

export default CreateEventForm;
