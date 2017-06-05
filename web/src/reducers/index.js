import { combineReducers } from 'redux';
import headerReducer from './headerReducer';
import createEventFormReducer from './createEventFormReducer';
import eventsReducer from './eventsReducer';
import googleMapReducer from './googleMapReducer';
import eventDetailsReducer from './eventDetailsReducer';

const allReducers = combineReducers({
  header: headerReducer,
  createEventForm: createEventFormReducer,
  googleMap: googleMapReducer,
  events: eventsReducer,
  eventDetails: eventDetailsReducer,
});

export default allReducers;
