export default function(state='Community', action) {
	//return {header: 'Community'}
	switch (action.type) {
	  case 'CHANGE_HEADER':
	    return action.payload;
	  default:
		  return state;
	}
}