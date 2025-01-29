import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/rootReducer'; 

// Redux Persist Configuration
const persistData = {
  key: 'root',
  storage,
  whitelist: ['bookmarkedUsers'], // only persist the bookmarkedUsers state
};
// console.log(persistData)

const persistedReducer = persistReducer(persistData, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);


export { store, persistor };
