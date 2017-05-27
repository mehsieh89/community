export const changeHeader = (text) => {
  return {
    type: 'CHANGE_HEADER',
    payload: text
  };
};

export const updateForm = (state) => {
  return {
    type: 'UPDATE_FORM',
    payload: state
  };
};

export const changeCenter = (prop) => {
  return {
    type: 'CHANGE_CENTER',
    payload: prop
  };
};

export const setMarkers = (prop) => {
  return {
    type: 'SET_MARKERS',
    payload: prop
  };
};
