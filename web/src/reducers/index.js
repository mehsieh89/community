import {combineReducers} from 'redux';
import headerReducer from './headerReducer';

const allreducers = combineReducers({
	header: headerReducer
});

export default allreducers;