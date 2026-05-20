import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-white/10 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2 text-xl font-black">
        <Sparkles size={20} className="text-blue-400" />
        CleanPro
      </Link>
      <div className="flex items-center gap-6">
        {user?.role !== 'admin' && (
          <>
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</Link>
            <Link to="/booking" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105">
              Book Now
            </Link>
          </>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Dashboard</Link>
        )}
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
              <User size={14} />
            </div>
            <span className="text-sm font-medium text-gray-300 hidden md:block">{user?.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={16} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}