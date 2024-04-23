// Home.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import { Promo, Carousel } from '../components';

const Home = () => {
  const { userId } = useParams();
  const url = userId 
    ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    : 'https://jsonplaceholder.typicode.com/posts';

    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/users/details')
        .then(response => response.json())
        .then(setUsers) 
        .catch(console.error);
    }, []);

  return (
    <div className='home'>
      <h2>Results for {userId ? `User ID: ${userId}` : "all users"}</h2>
      <Carousel url={url} />

      <Promo users={users} />

      <div className="most-ordered">
        {/* Logic for most-ordered posts can go here */}
      </div>                
    </div>
  );
};

export default Home;
