import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🧹 CleanPro</Link>
      <div className="flex gap-6">
        <Link to="/" className="hover:text-blue-200">Home</Link>
        <Link to="/booking" className="hover:text-blue-200">Book Now</Link>
        <Link to="/admin" className="hover:text-blue-200">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;