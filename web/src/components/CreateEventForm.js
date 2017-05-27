import React, { Component } from 'react';
import { RaisedButton, TextField, Card, SelectField, MenuItem } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import axios from 'axios';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      date: new Date(),
      time: '',
      location: '',
      description: '',
      category: 'Select...',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  handleDatePicker(x, e) {
    console.log('x', x);
    console.log('e', e);
  }

  handleSelect(e) {
    this.setState({ category: e.target.innerHTML });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateForm(this.state);
  }

  render() {
    return (
      <Card className="createEventForm">
        <label> Event Name: </label>
        <TextField
          name="eventName"
          autoFocus
          value={this.state.eventName}
          onChange={this.handleChange}/>
        <br />
        <label> Date: </label>
        <DatePicker
          name="date"
          container="inline"
          autoOk={true}
          hintText="Portrait Dialog"/>
        <br />
        <label> Time: </label>
        <TextField
          name="time"
          value={this.state.time}
          onChange={this.handleChange}/>
        <br />
        <label> Location: </label>
        <TextField
          name="location"
          value={this.state.location}
          onChange={this.handleChange}/>
        <br />
        <label> Description: </label>
        <TextField
          name="description"
          value={this.state.description}
          onChange={this.handleChange}/>
        <br />
        <label> Category: </label>
        <SelectField placeholder="Category" hintText={this.state.category} >
          <MenuItem value="food" primaryText="Food" onTouchTap={this.handleSelect} />
          <MenuItem value="sports" primaryText="Sports" onTouchTap={this.handleSelect} />
          <MenuItem value="outdoors" primaryText="Outdoors" onTouchTap={this.handleSelect} />
          <MenuItem value="nightlife" primaryText="Nightlife" onTouchTap={this.handleSelect} />
          <MenuItem value="games" primaryText="Games" onTouchTap={this.handleSelect} />
          <MenuItem value="other" primaryText="Other" onTouchTap={this.handleSelect} />
        </SelectField>
        <RaisedButton label="Create Event" secondary={true} onTouchTap={this.handleSubmit} />
      </Card>
    );
  }
}

export default CreateEventForm;
