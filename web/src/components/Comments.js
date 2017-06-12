import axios from 'axios';
import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import react_time_ago from 'react-time-ago';
// import javascript_time_ago from 'javascript-time-ago';
// javascript_time_ago.locale(require('javascript-time-ago/locales/en'));
// import ReactTimeAgo from 'react-time-ago';
// require('javascript-time-ago/intl-messageformat-global');
// require('intl-messageformat/dist/locale-data/en');
import moment from 'moment';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      comments: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearText = this.clearText.bind(this);
  }

  componentDidMount() {
    axios.get('/api/retrieveComments?event_id=' + this.props.eventDetails.currentEvent.id)
    .then(comments => {
      // console.log('Comments === ', comments)
      const commentsArray = comments.data.map(comment => {
        return {
          username: comment.username,
          comment: comment.text,
          createdAt: comment.created_at
        };
      })
      .sort((latest, oldest) => {
        return new Date(oldest.createdAt) - new Date(latest.createdAt);
      });
      // .then(() =>)

      this.setState({comments: commentsArray})
      // console.log('state right now ??? === ', this.state )
      // console.log('ALL COMMENTS ? === ', commentsArray);
    });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  // handleRefresh() {
  //
  // }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/comments', {
      text: this.state.text,
      event_id: this.props.eventDetails.currentEvent.id,
      profile_id: null
    });
    this.clearText();
  }

  clearText() {
    this.setState({
      text: '',
    });
  }


  render() {
    // console.log('current state === ', this.state)
    return (
      <div>
        <form>
          <TextField
            type="text"
            name="name"
            onChange={this.handleChange}
            style={styles.inputField}
          />
          <RaisedButton
            label="Comment"
            labelColor={'#5E35B1'}
            onTouchTap={this.handleSubmit}
            style={styles.button}
          />
        </form>
        <div>
          {this.state.comments.map(comment => (
          <div style={styles.container}>
            <div class="colLeft">
              <strong>{comment.username}</strong> {moment(comment.createdAt).fromNow()}
            </div>
            <div class="comment">
              {comment.comment}
            </div>
        </div>
          //   <p style={styles.container}>
          //  <strong>{comment.username} </strong> {comment.comment} {' '}
          //   <ReactTimeAgo
          //    locale='en-GB'
          //    timeStyle='twitter'
          //  >{comment.createdAt}
          //  </ReactTimeAgo>
          // </p>
         ))}
        </div>
      </div>
    );
  }
}

// FIX COMMENT CHARACTERS IN THE DB TO A 100
// Dont allow users to hit submit on a comment if the comment is zero
// Format date and display

const styles = {
  container: {
    display: 'inline-block',
    lineHeight: '16px',
    borderColor: '#eee #ddd #bbb',
    borderRadius: '5',
    borderStyle: 'solid',
    borderWidth: '1',
    boxShadow: '0 1 3 rgba(0, 0, 0, 0.15)',
    margin: '5',
    padding: '20',
    width: '560',
  },
  button: {
    border: '1px solid #5E35B1',
    borderRadius: '10px',
    marginLeft: '18px',
    float: 'right',
    marginRight: '10',
    marginTop: '10'
  },
  inputField: {
    borderColor: '#5E35B1',
    width: '585',
    marginTop: '10',
    marginBottom: '10'
  },
  colLeft: {
    float: 'left',
    width: '33%'
  },
  colRright: {
    float: 'right',
    width: '33%',
  },
  comment: {
    display: 'inline-block',
    width: '33%',
    marginTop: '5',
  }
};

export default Comments;
