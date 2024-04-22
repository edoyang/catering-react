import { Link } from "react-router-dom";

const Item = ({ image, label }) => {
    return (
    <Link to={`/${label}`} className="item">
    {/* <Link to={`/${label.charAt(0).toLowerCase() + label.slice(1)}`} className="item"> */}
        <img src={image} alt={label} />
        <p>{label}</p>
      </Link>
    );
  };
  
export default Item;  