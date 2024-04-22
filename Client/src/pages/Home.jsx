import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './style.scss';
import { Promo } from '../components';

const Home = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [recentPost, setRecentPost] = useState([]);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const url = userId 
      ? `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      : 'https://jsonplaceholder.typicode.com/posts';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setRecentPost(sortedData);
      })
      .catch(error => console.error('Error fetching posts:', error));
  }, [userId]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scrollRight();
    }, 5000);
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      if (carouselRef.current.scrollLeft >= maxScrollLeft) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: carouselRef.current.offsetWidth * 0.8, behavior: 'smooth' });
      }
    }
    startAutoScroll();
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      if (carouselRef.current.scrollLeft <= 0) {
        const maxScrollLeft = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
        carouselRef.current.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: -carouselRef.current.offsetWidth * 0.8, behavior: 'smooth' });
      }
    }
    startAutoScroll();
  };

  return (
    <div className='home'>
      {userId ? (
        <h2>{posts.length} Results for User ID: {userId}</h2>
      ) : (
        <h2>{posts.length} Results</h2>
      )}
      <div className="carousel">
        <div className="buttons">
          <img className='scroll-left' src="left" alt="left" onClick={scrollLeft} />
          <img className='scroll-right' src="right" alt="right" onClick={scrollRight} />
        </div>
        <div className="carousel-overflow" ref={carouselRef}>
          {posts.map((post, index) => (
            <div className="item-container" key={index}>
              <div className='item'>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Promo recentPost={recentPost} />

      <div className="most-ordered">
          {/* Logic for most-ordered posts can go here */}
      </div>                
    </div>
  );
};

export default Home;
