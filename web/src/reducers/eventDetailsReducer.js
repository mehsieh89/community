const initialState = {
  showEventDetails: false,
  currentEventIndex: 0
};

export default function(state = initialState, action) {
  switch (action.type) {

  case 'TOGGLE_EVENT_DETAILS':
    return Object.assign({}, state, { showEventDetails: !state.showEventDetails });

  case 'SET_CURRENT_EVENT':
    return Object.assign({}, state, { currentEventIndex: action.payload });

  default:
    return state;
  }
}
