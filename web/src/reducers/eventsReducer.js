const initialState = {
  allEvents: [],
};

export default function(state = initialState, action) {
  switch (action.type) {

  case 'ADD_EVENTS' :
    let EventsState = Object.assign({}, state);
    EventsState.allEvents = action.payload;
    return EventsState;

  default:
    return state;
  }
}
