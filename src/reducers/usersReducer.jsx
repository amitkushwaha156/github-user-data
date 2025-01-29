const initialState = {
  users: [],
  loading: false,

};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_USERS':
      return { ...state, loading: true };

    case 'SET_USERS':
      return {
        ...state,
        users: action.payload.users,
        loading: false,        
      };

    default:
      return state;
  }
};





export default usersReducer;
