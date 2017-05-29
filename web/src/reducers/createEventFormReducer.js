import axios from 'axios';

const initialState = {
  eventName: '',
  time: '',
  location: '',
  description: '',
  category: 'Category',
  isfetching: null
};

export default function(state = initialState, action) {
  switch (action.type) {

  case 'UPDATE_FORM':
    axios.post('/api/createEvent', action.payload)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => { console.log('error when creating event', err); });
    // return Object.assign({}, action.payload, {isFetching: true});
    return action.payload;

  default:
    return state;
  }
}
