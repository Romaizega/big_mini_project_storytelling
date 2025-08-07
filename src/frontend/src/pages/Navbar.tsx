import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { type RootState } from '../app/store';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!isAuthenticated) return null; 

  return (
    <nav className="bg-base-200 p-4 flex justify-between">
      <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">Dashboard</Link>
      <button onClick={handleLogout} className="btn btn-error">Logout</button>
    </nav>
  );
};

export default Navbar;
