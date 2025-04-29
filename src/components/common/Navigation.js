import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-start pl-8">
          <Link to="/" className="flex flex-col items-center justify-center mr-12">
            <i className={`fas fa-home text-xl ${isActive('/') ? 'text-purple-500' : 'text-gray-500'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/') ? 'text-purple-500' : 'text-gray-500'}`}>Home</span>
          </Link>
          
          <Link to="/notes" className="flex flex-col items-center justify-center mr-12">
            <i className={`fas fa-book text-xl ${isActive('/notes') ? 'text-purple-500' : 'text-gray-500'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/notes') ? 'text-purple-500' : 'text-gray-500'}`}>Notes</span>
          </Link>
          
          <Link to="/lectures" className="flex flex-col items-center justify-center">
            <i className={`fas fa-video text-xl ${isActive('/lectures') ? 'text-purple-500' : 'text-gray-500'}`}></i>
            <span className={`text-xs mt-1 ${isActive('/lectures') ? 'text-purple-500' : 'text-gray-500'}`}>Lectures</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;