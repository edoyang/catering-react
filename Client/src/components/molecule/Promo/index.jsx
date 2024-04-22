import './style.scss';

const Promo = ({ recentPost }) => {
  return (
    <div className="promotional">
      <h1>RECENT POSTS</h1>
      <div className="promo">
        {recentPost.slice(0, 3).map((post) => (
          <div className='promo-item' key={post.id}>
            <h3 className='promo-title'>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
