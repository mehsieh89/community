import axios from 'axios';
import DatePicker from 'material-ui/DatePicker';
import Promise from 'bluebird';
import { MenuItem, RaisedButton, FlatButton, SelectField, TextField, Dialog, GridList } from 'material-ui';
import React, { Component } from 'react';
import TimePicker from 'material-ui/TimePicker';
import AWS from 'aws-sdk';

var imageBucketName = 'hr-community-images';
var bucketRegion = 'us-east-1';
var IdentityPoolId = 'us-east-1:b77a737f-1b1c-4801-9339-98bc072f2fbc';

AWS.config.setPromisesDependency(Promise);

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: imageBucketName}
});

class CreateEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventName: '',
      date: null,
      time: null,
      location: '',
      description: '',
      category: 'Select Category...',
      imageUrl: null,
      dateTime: null,
      eventNameError: null,
      dateError: null,
      timeError: null,
      locationError: null,
      categoryError: null,
      choseImage: false,
      hasImage: false,
      fileName: 'No file chosen'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDatePicker = this.handleDatePicker.bind(this);
    this.handleTimePicker = this.handleTimePicker.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.showAddImageButton = this.showAddImageButton.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    newState[e.target.name + 'Error'] = null;
    this.setState(newState);
  }

  handleDatePicker(x, v) {
    this.setState({date: v, dateError: null});
  }

  handleTimePicker(x, v) {
    this.setState({time: v, timeError: null});
  }

  handleSelect(e) {
    this.setState({ category: e.target.innerHTML, categoryError: null });
  }

  clearForm() {
    this.setState({
      eventName: '',
      date: null,
      time: null,
      location: '',
      description: '',
      category: 'Select Category...',
      imageUrl: null,
      dateTime: null,
      eventNameError: null,
      dateError: null,
      timeError: null,
      locationError: null,
      categoryError: null,
      choseImage: false,
      hasImage: false,
      fileName: 'No file chosen'
    });

    document.getElementById('imageupload').value = '';
  }

  showAddImageButton() {
    const files = document.getElementById('imageupload').files;
    if (!files.length) { return alert('Please choose an image for your event.'); }
    const fileName = files[0].name;
    this.setState({
      choseImage: true,
      fileName: fileName
    });
  }

  addImage() {
    const context = this;

    const files = document.getElementById('imageupload').files;
    if (!files.length) {
      return alert('Please choose an image for your event.');
    }

    const file = files[0];
    console.log(file);
    const fileName = file.name;

    const params = {
      Key: fileName,
      Body: file,
      ACL: 'public-read'
    };

    const s3uploadPromise = s3.upload(params).promise();

    s3uploadPromise
      .then((data) => {
        console.log('Image upload to S3 successful', data);
        context.setState({
          imageUrl: data.Location,
          hasImage: true
        });
      })
      .catch((err) => {
        console.log('Error occurred while uploading image to S3:', err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const errorCreator = (name, message) => {
      let e = new Error(message);
      e.name = name;
      return e;
    };

    return new Promise((resolve, reject) => {
      let date = this.state.date;
      let time = this.state.time;
      if (!this.state.eventName) { throw errorCreator('eventNameError', 'Event name cannnot be empty'); }
      if (!date) { throw errorCreator('dateError', 'Please select valid date'); }
      if (!time) { throw errorCreator('timeError', 'Please select valid time'); }
      if (!this.state.location) { throw errorCreator('locationError', 'Location cannnot be empty'); }
      if (this.state.category === 'select...') { throw errorCreator('categoryError', 'Please select category'); }
      let dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds());
      resolve(this.setState({ dateTime: dateTime }));
    })
    .then(() => {
      return axios.post('/api/createEvent', this.state)
      .catch(err => { throw err.response.data; });
    })
    .then((data) => {
      this.props.updateForm(this.state);
      this.props.changeCenter({lat: Number(data.data.lat), lng: Number(data.data.lng)});
    })
    .then(() => {
      axios.get('/api/retrieveEvents')
      .then((data) => {
        this.props.addEvents(data.data);
        this.clearForm();
        alert('New event created!');
      });
    })
    .catch(err => {
      let newState = {};
      newState[err.name] = err.message;
      this.setState(newState);
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        labelStyle={styles.buttonLabel}
        labelColor='#5E35B1'
        onTouchTap={() => { this.clearForm(); this.props.toggleCreateEvent(); }}
      />,
      <FlatButton
        label="Submit"
        labelStyle={styles.buttonLabel}
        labelColor='#5E35B1'
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <Dialog
        title="Create Event"
        actions={actions}
        modal={false}
        open={this.props.createEventForm.creatingEvent}
        onRequestClose={this.toggleCreateEvent}
        autoScrollBodyContent={true} >
        <GridList cellHeight={140} >
          <div>
            <TextField
              autoFocus
              floatingLabelText="Event Name"
              inputStyle={styles.text}
              name="eventName"
              onChange={this.handleChange}
              style={styles.textField}
              value={this.state.eventName}
              errorText={this.state.eventNameError}
            />
            <TextField
              floatingLabelText="Location"
              inputStyle={styles.text}
              name="location"
              onChange={this.handleChange}
              value={this.state.location}
              errorText={this.state.locationError}
            />
          </div>
          <div>
            <DatePicker
              minDate={new Date()}
              autoOk={true}
              floatingLabelText="Date"
              inputStyle={styles.text}
              name="date"
              value={this.state.date}
              onChange={this.handleDatePicker}
              errorText={this.state.dateError}
            />
            <TimePicker
              autoOk={true}
              defaultTime={null}
              floatingLabelText="Time"
              inputStyle={styles.text}
              name="time"
              value={this.state.time}
              onChange={this.handleTimePicker}
              errorText={this.state.timeError}
            />
          </div>
          <div>
            <TextField
              floatingLabelText="Description"
              name="description"
              inputStyle={styles.text}
              onChange={this.handleChange}
              value={this.state.description}
              style={{width: 620}}
            />
            <SelectField floatingLabelText={this.state.category} errorText={this.state.categoryError}>
              <MenuItem value="food" primaryText="Food" onTouchTap={this.handleSelect} />
              <MenuItem value="sports" primaryText="Sports" onTouchTap={this.handleSelect} />
              <MenuItem value="outdoors" primaryText="Outdoors" onTouchTap={this.handleSelect} />
              <MenuItem value="nightlife" primaryText="Nightlife" onTouchTap={this.handleSelect} />
              <MenuItem value="games" primaryText="Games" onTouchTap={this.handleSelect} />
              <MenuItem value="other" primaryText="Other" onTouchTap={this.handleSelect} />
            </SelectField>
          </div>
          <br />
        </GridList>
        <div>
          <br />
          <RaisedButton label="Choose an Image" labelPosition="before" containerElement="label" onTouchTap={this.chooseImage}>
            <input type="file" id="imageupload" accept="image/*" style={styles.exampleImageInput} onChange={this.showAddImageButton}/>
          </RaisedButton>
          <span style={{marginLeft: 15}}>{this.state.fileName}</span>
          {this.state.choseImage ?
            <RaisedButton label="Add Event Image" onTouchTap={this.addImage} style={{position: 'relative', left: 15}} /> : null}
            <br />
            {this.state.hasImage ?
              <img id="eventimage" style={styles.image} src={this.state.imageUrl} /> : null
            }
          </div>
      </Dialog>
    );
  }
}

const styles = {
  button: {
    border: '1px solid #3EB1E0',
    borderRadius: '10px',
    backgroundColor: 'white',
    marginTop: '20px'
  },
  buttonLabel: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    color: '#3EB1E0',
    textTransform: 'capitalize',
  },
  container: {
    paddingTop: 0,
    paddingLeft: 30,
    paddingBottom: 30,
    height: '100%',
    // backgroundColor: '#f6f5f0'
  },
  textField: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: '18px',
  },
  image: {
    width: 'auto',
    height: 'auto',
    'maxWidth': 400,
    'maxHeight': 400
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
};

export default CreateEventForm;
