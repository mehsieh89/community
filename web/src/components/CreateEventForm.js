import React, { Component } from 'react';

class CreateEventForm extends Component {
  state = {
    eventName: this.props.eventName || ''
  }

  handleChange(e) {
    this.setState({ eventName: e.target.value });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input name="eventName"
                 value={this.state.eventName}
                 onChange={this.handleChange.bind(this)}/>
          {/* <input name="time" value={this.state.time} />
          <input name="location" value={this.state.location} />
          <input name="description" value={this.state.description} />
          <input name="groupSize" value={this.state.groupSize} /> */}
          <button type="submit">Create Event</button>
        </form>
      </div>
    );
  }
}

export default CreateEventForm;
