import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';


function ProtectedBooking({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/booking-guest" />;
  return children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function BookingGuest() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-blue-950 flex items-center justify-center px-4">
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-blue-400/10 rounded-full blur-2xl" />
      <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
        <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔐</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-3">Login Required</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          You need to be signed in to book a cleaning service. Please login or create a free account to continue.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
          >
            🔑 Sign In to Book
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full border-2 border-white/20 hover:border-blue-400 text-white hover:text-blue-300 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            ✨ Create Free Account
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors mt-2"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<><Navbar /><Register /></>} />

        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
        <Route path="/booking-guest" element={<Layout><BookingGuest /></Layout>} />
        <Route path="/booking" element={<Layout><ProtectedBooking><Booking /></ProtectedBooking></Layout>} />
        {/*Admin*/}
        <Route path="/admin" element={<AdminRoute><Layout><Admin /></Layout></AdminRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}