import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { Sidebar, UserProfile } from '../components';
import { client } from '../client';
import Pins from './Pins';

const Home = () => {
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const scrollRef = useRef(null);
  const [user, setUser] = useState(null);
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  
  useEffect(() => {
    client.fetch(`*[_type == "user" && _id == '${userInfo?.aud}']`).then((data) => {
      setUser(data[0]);
    })
  })
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])
  return (
    <div className="flex bg-gray-50 flex-row flex-col h-screen transaction-height duration-75 ease-out">
      <div className="hidden h-screen flex-initial">
        <Sidebar user={ user && user }/>
      </div>
      <div className="flex ">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)}/>
          <Link to="/">
            AllReviews
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            {user?.userName}
            <img src={user?.image} alt="logo" className="w-9 h-9 rounded-full"></img>
          </Link>
        </div>
        {ToggleSidebar && (
          <div className="fixed w-full bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
            </div>
            <Sidebar user={ user && user } closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:uderId" element={<UserProfile/>}/>
          <Route path="/*" element={<Pins user={user && user}/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Home;