const initialState = [];

const bookmarksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.payload];
    case 'REMOVE_BOOKMARK':
      return state.filter(user => user.id !== action.payload.id);
    default:
      return state;
  }
};

export default bookmarksReducer;
