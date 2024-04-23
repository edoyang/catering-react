import React, { useEffect, useState, useRef } from 'react';

const Carousel = ({ url }) => {
  const [products, setProducts] = useState([]);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const sortedData = [...data].sort((a, b) => b.id - a.id);
        setProducts(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));

    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [url]);

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
    <div className="carousel">
      <div className="buttons">
        <img className='scroll-left' src="left" alt="left" onClick={scrollLeft} />
        <img className='scroll-right' src="right" alt="right" onClick={scrollRight} />
      </div>
      <div className="carousel-overflow" ref={carouselRef}>
        {products.map((product, index) => (
          <div className="item-container" key={index}>
            <div className='item'>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;