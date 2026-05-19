import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, Trash2, Clock, Users, Calendar,
  Search, Filter, RefreshCw, Shield, Phone,
  Mail, MapPin, Sparkles, AlertCircle, X
} from 'lucide-react';
import API from '../api/axios';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await API.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const handleComplete = async (id) => {
    try {
      await API.put(`/bookings/${id}`, { status: 'Completed' });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'Completed' } : b));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setBookings(prev => prev.filter(b => b._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = bookings.filter(b => {
    const matchSearch =
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.service?.name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  return (
    <div className="min-h-screen bg-gray-950">

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Delete Booking?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The booking will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 border-2 border-gray-200 text-gray-600 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-bold transition-colors shadow-lg shadow-red-200"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 border-b border-white/10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield size={20} className="text-blue-400" />
              <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="text-3xl font-black text-white">Bookings Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage all your cleaning service bookings</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, icon: Calendar, color: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/30" },
            { label: "Pending", value: stats.pending, icon: Clock, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/30" },
            { label: "Completed", value: stats.completed, icon: CheckCircle, color: "from-green-500 to-emerald-500", shadow: "shadow-green-500/30" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} rounded-3xl p-6 text-white shadow-xl ${stat.shadow}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-5xl font-black">{stat.value}</p>
                </div>
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <stat.icon size={28} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-gray-900 border border-white/10 rounded-3xl p-5 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-gray-800 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            {['All', 'Pending', 'Completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  filter === f
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-3xl p-6 animate-pulse border border-white/5">
                <div className="flex justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-5 bg-gray-800 rounded w-1/4" />
                    <div className="h-4 bg-gray-800 rounded w-1/3" />
                    <div className="h-4 bg-gray-800 rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-24 bg-gray-800 rounded-2xl" />
                    <div className="h-10 w-10 bg-gray-800 rounded-2xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-gray-600" />
            </div>
            <h3 className="text-gray-400 font-bold text-xl mb-2">No Bookings Found</h3>
            <p className="text-gray-600 text-sm">
              {search ? 'Try a different search term' : 'No bookings yet. They will appear here once customers book.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900 border border-white/10 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

                    {/* Left Info */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-white font-black text-lg">{booking.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {booking.status === 'Completed' ? '✓ Completed' : '⏳ Pending'}
                        </span>
                        {booking.service && (
                          <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
                            {booking.service.name}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Mail size={13} className="text-blue-400 flex-shrink-0" />
                          <span className="truncate">{booking.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Phone size={13} className="text-blue-400 flex-shrink-0" />
                          <span>{booking.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={13} className="text-blue-400 flex-shrink-0" />
                          <span>{new Date(booking.date).toLocaleDateString('en-GB')} — {booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin size={13} className="text-blue-400 flex-shrink-0" />
                          <span className="truncate">{booking.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {booking.status !== 'Completed' && (
                        <button
                          onClick={() => handleComplete(booking._id)}
                          className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/30 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                        >
                          <CheckCircle size={15} />
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => setDeleteConfirm(booking._id)}
                        className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer Note */}
        {!loading && filtered.length > 0 && (
          <div className="text-center mt-8 text-gray-600 text-sm">
            Showing {filtered.length} of {bookings.length} bookings
          </div>
        )}
      </div>
    </div>
  );
}