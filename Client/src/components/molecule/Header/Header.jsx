import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Header = () => {
    const [userActive, setUserActive] = useState(false);
    const [cartActive, setCartActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [quantity, setQuantity] = useState(3); // Assume starting quantity is 3 for all orders

    const cartRef = useRef(null);
    const userRef = useRef(null);
    const menuRef = useRef(null);

    const toggleCartActive = () => {
        setCartActive(!cartActive);
        if (userActive) setUserActive(false);
    };

    const toggleUserActive = () => {
        setUserActive(!userActive);
        if (cartActive) setCartActive(false);
    };

    const toggleMenuActive = (event) => {
        event.stopPropagation();
        setMenuActive(!menuActive);
    };

    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setCartActive(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserActive(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuActive(false);
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="left">
                <div className="hamburger" onClick={toggleMenuActive}>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                </div>
                <Link className='logo' to="/">
                    <img src='logo.svg' alt="Logo"/>
                    LOGO
                </Link>
            </div>
            <div className={`menu ${menuActive ? 'active' : ''}`} ref={menuRef}>
                <Link to="/">Home</Link>
                <Link to="/List">Browse All Catering</Link>
                <Link to="/Contact-us">Contact us</Link>
                <Link to="/Sponsor">Sponsor us</Link>
            </div>
            <div className='user' ref={userRef}>
                <div className="search-input">
                    <img src='search.svg' alt="Search"/>
                    <input type="text" placeholder="Search for food, coffee, etc" />
                </div>

                <div className='cart' ref={cartRef}>
                    <div className='cart-icon' onClick={toggleCartActive}>
                        <img src='cart.svg' alt="Cart"/>
                        <p>0</p> {/* This should ideally be dynamic based on cart contents */}
                    </div>

                    <div className={`cart-overlay ${cartActive ? 'active' : ''}`}>
                        <div className='order'>
                            <div className='order-detail'>
                                <img src='food.jpg' alt="Food"/>
                                <div className='order-description'>
                                    <h2>Fried Rice</h2>
                                    <p>$22</p>
                                </div>
                            </div>

                            <div className='quantity-button'>
                                <div className='remove'>
                                    <p>Remove</p>
                                </div>
                                <div className='quantity'>
                                    <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}> - </button>
                                    <input type="number" value={quantity} onChange={handleQuantityChange} />
                                    <button onClick={() => setQuantity(quantity + 1)}> + </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='user-profile'>
                    <div className='user-image' onClick={toggleUserActive}>
                        <img src='user.svg' alt="User"/>
                    </div>
                    <div className={`user-overlay ${userActive ? 'active' : ''}`}>
                        <h1>Edo Yang</h1>
                        <div className='user-menu'>
                            <Link to="/history">Order History</Link>
                            <Link to="/setting">Settings</Link>
                            <Link to="/help">Help Center</Link>
                            <Link to="/logout">Log out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
