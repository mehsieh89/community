import { addEvents, addGeolocation, setCurrentEvent,
  changeCenter, updateForm, toggleEventDetails, setCurrentEventParticipants }
  from '../src/actions';

describe('actions', () => {
  it('should create an action to add events', () => {
    const arr = [];
    const expectedAction = {
      type: 'ADD_EVENTS',
      payload: arr
    };
    expect(addEvents(arr)).toEqual(expectedAction);
  });

  it('should create an action to add geolocation', () => {
    const coords = {};
    const expectedAction = {
      type: 'ADD_GEOLOCATION',
      payload: coords
    };
    expect(addGeolocation(coords)).toEqual(expectedAction);
  });

  it('should create an action to set current event', () => {
    const index = 0;
    const expectedAction = {
      type: 'SET_CURRENT_EVENT',
      payload: index
    };
    expect(setCurrentEvent(index)).toEqual(expectedAction);
  });

  it('should create an action to change the center of the map', () => {
    const coords = {};
    const expectedAction = {
      type: 'CHANGE_CENTER',
      payload: coords
    };
    expect(changeCenter(coords)).toEqual(expectedAction);
  });

  it('should create an action to update form for create event submission', () => {
    const eventObj = {};
    const expectedAction = {
      type: 'UPDATE_FORM',
      payload: eventObj
    };
    expect(updateForm(eventObj)).toEqual(expectedAction);
  });

  it('should create an action to toggle event details', () => {
    const boolean = true;
    const expectedAction = {
      type: 'TOGGLE_EVENT_DETAILS',
      payload: boolean
    };
    expect(toggleEventDetails(boolean)).toEqual(expectedAction);
  });

  it('should create an action to set current event participants', () => {
    const data = [];
    const expectedAction = {
      type: 'SET_CURRENT_EVENT_PARTICIPANTS',
      payload: data
    };
    expect(setCurrentEventParticipants(data)).toEqual(expectedAction);
  });

});
