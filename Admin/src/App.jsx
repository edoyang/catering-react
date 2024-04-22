import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import AddProducts from './pages/AddProducts'
import { useAuth } from './utils/Authcontext';
import Products from './pages/Products'

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
    <header>
      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/">Dashboard</Link>
          <Link to="/account">Account</Link>
          <Link to="/products">Products</Link>
          <Link to="/add-products">Add Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/' element={<Dashboard />} />
      <Route path='/account' element={<Account />} />
      <Route path='/products' element={<Products />} />
      <Route path='/add-products' element={<AddProducts />} />
    </Routes>
    </>
  )
}

export default App
