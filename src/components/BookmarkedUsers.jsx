import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BookmarkCheck, BookmarkPlus, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';


const BookmarkedUsers = () => {
  const [searchItem, setSearchItem] = useState("");
  
  const bookmarks = useSelector(state => state.bookmarkedUsers);
  const dispatch = useDispatch();
  
  
  const removeBookmark = (user) => ({
   type: 'REMOVE_BOOKMARK',
   payload: user,
  });

  const handleRemoveBookmark = (user) => {

    toast(`${user.login} Remove From Bookmark!`);
    dispatch(removeBookmark(user));
  };

    const handleSearch = debounce((item) => {
      setSearchItem(item.toLowerCase());
    }, 300);
  
    const filteredUsers = bookmarks.filter((user) =>
      user.login.toLowerCase().includes(searchItem)
    );

  return (
    <div>
     <div className="relative w-full max-w-md mb-1 ">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search users..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
        { filteredUsers.length > 0 ?  filteredUsers.map((user) => (
          <div
          className="flex items-center justify-between p-4 bg-white rounded-lg my-4 shadow-md hover:shadow-lg transition-shadow"
          key={user.id}
        >
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-12 h-12 rounded-full"
            />
          <a
            href={user.html_url}
            target="_blank"
            
            className="text-lg font-medium text-gray-800 hover:text-blue-600"
          >
            {user.login}
          </a>
          </div>
            <button onClick={() => handleRemoveBookmark(user)}>
              {bookmarks.find((item) => item.id === user.id) ? (
                <BookmarkCheck className="w-6 h-6 text-blue-600" />
              ) : (
                <BookmarkPlus className="w-6 h-6 text-gray-400" />
              )}
            </button>
        </div>
    
        )): <h1 className='text-center bg-gray-300 mt-5 py-4'>No User Found</h1>}
    
    </div>
  ) 
};

export default BookmarkedUsers;
