import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Pins from './Pins';

const Home = () => {
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  useEffect(() => {
    client.fetch(`*[_type == "user" && _id == '${userInfo?._id}']`).then((data) => {
      setUser(data[0]);
    });
  }, []);

  setTimeout(()=> console.log(user), 0);
  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md flex-row">
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
        <Link to="/">
          AllReviews
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          {user?.name}
          <img src={user?.picture} alt="logo" className="w-9 h-9 rounded-full"></img>
        </Link>
      </div>
    </div>
  )
}

export default Home