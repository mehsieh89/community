import {combineReducers} from 'redux';
import headerReducer from './headerReducer';
import createEventFormReducer from './createEventFormReducer';

const allReducers = combineReducers({
  header: headerReducer,
  createEventForm: createEventFormReducer
});

export default allReducers;
