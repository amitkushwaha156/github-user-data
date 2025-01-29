import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import bookmarksReducer from './bookmarksReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  bookmarkedUsers: bookmarksReducer,
});

export default rootReducer;
