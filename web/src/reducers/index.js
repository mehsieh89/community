import {combineReducers} from 'redux';
import headerReducer from './headerReducer';
import createEventFormReducer from './createEventFormReducer';
import googleMapReducer from './googleMapReducer';
import eventsReducer from './eventsReducer';

const allReducers = combineReducers({
  header: headerReducer,
  createEventForm: createEventFormReducer,
  googleMap: googleMapReducer,
  events: eventsReducer
});

export default allReducers;
