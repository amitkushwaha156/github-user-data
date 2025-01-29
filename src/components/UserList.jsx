import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';

import { debounce } from "lodash";
import { Search, BookmarkPlus, BookmarkCheck, SquareArrowOutUpRight } from "lucide-react";
import PullToRefresh from "react-pull-to-refresh";
import { TailSpin } from 'react-loader-spinner';  
import { toast } from "react-toastify";

const UserList = () => {
  const dispatch = useDispatch();

  const usersState = useSelector((state) => state.users);
  const bookmarks =  useSelector((state) => state.bookmarkedUsers);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);  
  const [pre_item, setPreItem] = useState(5)

    // console.log(usersState)
    //console.log(bookmarks)
  const fetchUsers = async (item) => {


    try {
      const response = await axios.get(`https://api.github.com/users?per_page=${item}&page=1`);
      console.log(`Fetched users from page: `, response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      return [];
    }
  };


  const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: { users },
  });
  
  const loadingUsers = () => ({
    type: 'LOADING_USERS',
  });



  const addBookmark = (user) => ({
    type: 'ADD_BOOKMARK',
    payload: user,
  });

  const removeBookmark = (user) => ({
    type: 'REMOVE_BOOKMARK',
    payload: user,
  });

  useEffect(() => {
    dispatch(loadingUsers());
    //fetch users
    fetchUsers(pre_item).then((users) => {
        dispatch(setUsers(users));  
      }).catch((error) => console.error(error));  

  }, [dispatch, pre_item]); 

  const handleBookmark = (user) => {
    if (bookmarks.find((item) => item.id === user.id)) {

      toast(`${user.login} Removed from Bookmark!`);
      dispatch(removeBookmark(user));

    } else {
      toast(`${user.login} Added to Bookmark!`);
      dispatch(addBookmark(user));
    }
  };

  const handleSearch = debounce((query) => {
    setSearchQuery(query.toLowerCase());
  }, 300);

  const filteredUsers = usersState.users.filter((user) =>
    user.login.toLowerCase().includes(searchQuery)
  );
  
const handleLoadMore=()=>{
  setLoading(true);
  toast(`Loading more users...`);

  setPreItem(pre_item+5)
  setLoading(false);
}

  const handleRefresh = () => {
   
    dispatch(loadingUsers());
    setPreItem(5)
    fetchUsers(pre_item)  
    toast(`Refreshing users...`);
     
  };

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-md mb-1">
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

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]"> 
          {loading && (
            <div className="flex justify-center items-center py-4">
              <TailSpin color="#007bff" height={30} width={30} />
            
            </div>
          )}
          {filteredUsers.length > 0 ? filteredUsers.map((user) => (
            <div
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow my-5"
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
                  rel="noopener noreferrer"
                  className="text-lg font-medium text-gray-800 hover:text-blue-600"
                >
                  {user.login} <SquareArrowOutUpRight color="#007bff" height={15} width={15} />
                </a>
              </div>
              <button onClick={() => handleBookmark(user)}>
                {bookmarks.find((b) => b.id === user.id) ? (
                  <BookmarkCheck className="w-6 h-6 text-blue-600" />
                ) : (
                  <BookmarkPlus className="w-6 h-6 text-gray-400" />
                )}
              </button>
            </div>
          )) : (
            <h1 className='text-center bg-gray-300 mt-5 py-4'>No Users Found</h1>
          )}
        </div>
      </PullToRefresh>
      <button
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs px-4 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center justify-between bg-gray-900 py-2.5"
        onClick={handleLoadMore}
      >
        Load More
      </button>

    </div>
  );
};

export default UserList;
