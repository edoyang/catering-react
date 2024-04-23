import React from 'react';
import './style.scss';

const Promo = ({ users }) => {
  return (
    <div className="promotional">
      <h1>RECENT POSTS</h1>
      <div className="promo">
        {users.slice(0, 3).map((user, index) => (
          <div className='promo-item' key={index}>
            <h3 className='promo-title'>{user.name}</h3>
            <div className="detail">
              <p>{user.review}</p>
            </div>
            <div className="pickup">
              {user.pickup.map((pick, idx) => (
                <p key={idx}>{pick}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
