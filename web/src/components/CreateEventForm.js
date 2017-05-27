import React, { Component } from 'react';
import { RaisedButton, TextField, Card, SelectField, MenuItem } from 'material-ui';
import axios from 'axios';


class CreateEventForm extends Component {
  constructor(props) {
    super(props);
    this.state = { category: 'Category' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(e) {
    this.props.updateForm(e.target.name, e.target.value);
  }

  handleSelect(e) {
    this.setState({ category: e.target.innerHTML });
    this.props.updateForm('category', e.target.innerHTML);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/createEvent', this.props.createEventForm)
    .then((res) => {
      console.log(res.data);
    })
    .catch(() => {
      console.log('error when creating event');
    });
  }

  render() {
    return (
      <Card className="createEventForm">
        <label> Event Name: </label>
        <TextField
          name="eventName"
          autoFocus
          onChange={this.handleChange}/>
        <br />
        <label> Time: </label>
        <TextField
          name="time"
          onChange={this.handleChange}/>
        <br />
        <label> Location: </label>
        <TextField
          name="location"
          onChange={this.handleChange}/>
        <br />
        <label> Description: </label>
        <TextField
          name="description"
          onChange={this.handleChange}/>
        <br />
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
