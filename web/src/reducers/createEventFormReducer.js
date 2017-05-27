const initialState = {
  eventName: '',
  time: '',
  location: '',
  description: '',
  category: 'select...',
  groupSize: '6'
};

export default function(state = initialState, action) {
  switch (action.type) {

  case 'UPDATE_FORM':
    let stateCopy = Object.assign({}, state);
    stateCopy[action.payload.prop] = action.payload.value;
    console.log(stateCopy);
    return stateCopy;

  default:
    return state;
  }
}
