import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import UserList from './components/UserList';
import BookmarkedUsers from './components/BookmarkedUsers';
import { ToastContainer } from 'react-toastify';

const App = () => {

  const [activeTab, setActiveTab] = useState('users');
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
   
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-semibold mb-4">GitHub Users</h1>
            
           
            <div className="flex border-b">
              <button
                className={`py-2 px-4 text-lg font-semibold ${activeTab === 'users' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleTabChange('users')}
              >
                Users
              </button>
              <button
                className={`py-2 px-4 text-lg font-semibold ${activeTab === 'bookmarked' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                onClick={() => handleTabChange('bookmarked')}
              >
                Bookmarked Users
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === 'users' && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">Users List</h2>
                <UserList />
              </div>
            )}

            {activeTab === 'bookmarked' && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-800">Bookmarked Users</h2>
                <BookmarkedUsers />
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;
