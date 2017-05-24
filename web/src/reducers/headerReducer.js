export default function(state = 'Community', action) {
  switch (action.type) {
  case 'CHANGE_HEADER':
    return action.payload;
  default:
    return state;
  }
}
