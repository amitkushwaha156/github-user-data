const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'LOADING_USERS':
      return { ...state };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.users,
           
      };

    default:
      return state;
  }
};


export default usersReducer;
