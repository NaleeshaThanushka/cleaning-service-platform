import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, Mail, CheckCircle, Sparkles, ArrowRight, Shield } from 'lucide-react';
import API from '../api/axios';

export default function Booking() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    service: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    API.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.service) newErrors.service = 'Please select a service';
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.date) newErrors.date = 'Please select a date';
    if (!form.time) newErrors.time = 'Please select a time';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      await API.post('/bookings', form);
      setSuccess(true);
      setForm({ service: '', name: '', email: '', phone: '', address: '', date: '', time: '' });
    } catch (err) {
      console.error(err);
      alert('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center border border-blue-100"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={48} className="text-green-500" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 mb-3">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your cleaning session has been booked successfully. We'll contact you shortly to confirm the details.
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-8 text-sm text-blue-700 font-medium">
            📧 A confirmation email will be sent to you soon.
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-200"
          >
            Book Another Service
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-16 px-4 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-800/30 rounded-full blur-2xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            ✨ Easy Online Booking
          </span>
          <h1 className="text-5xl font-black mt-3 mb-3">Book a Cleaning</h1>
          <p className="text-blue-100 text-lg max-w-md mx-auto">
            Schedule your professional cleaning service in just a few steps
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5">
                <h2 className="text-white font-black text-xl flex items-center gap-2">
                  <Sparkles size={20} />
                  Booking Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">

                {/* Service Select */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Select Service *
                  </label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`w-full border-2 ${errors.service ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl px-4 py-3.5 text-gray-700 outline-none transition-all bg-gray-50 focus:bg-white`}
                  >
                    <option value="">— Choose a cleaning service —</option>
                    {services.map(s => (
                      <option key={s._id} value={s._id}>{s.name} — Rs. {s.price}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1 flex items-center gap-1">⚠ {errors.service}</p>}
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full border-2 ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all bg-gray-50 focus:bg-white`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full border-2 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all bg-gray-50 focus:bg-white`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+94 77 123 4567"
                        className={`w-full border-2 ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all bg-gray-50 focus:bg-white`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">⚠ {errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Address *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Your full address"
                        className={`w-full border-2 ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all bg-gray-50 focus:bg-white`}
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-xs mt-1">⚠ {errors.address}</p>}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date *</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      min={today}
                      onChange={handleChange}
                      className={`w-full border-2 ${errors.date ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400'} rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all bg-gray-50 focus:bg-white`}
                    />
                  </div>
                  {errors.date && <p className="text-red-500 text-xs mt-1">⚠ {errors.date}</p>}
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    <Clock size={14} className="inline mr-1" />
                    Preferred Time *
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => { setForm({ ...form, time: slot }); if (errors.time) setErrors({ ...errors, time: '' }); }}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                          form.time === slot
                            ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-200'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {errors.time && <p className="text-red-500 text-xs mt-2">⚠ {errors.time}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Confirm Booking
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            {/* Trust Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                <Shield size={18} className="text-blue-500" />
                Our Guarantee
              </h3>
              <div className="space-y-3">
                {[
                  "100% Satisfaction Guaranteed",
                  "Background-checked staff",
                  "Eco-friendly products",
                  "On-time service",
                  "Free re-clean if unhappy"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-lg p-6 text-white">
              <h3 className="font-black mb-4">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                Have questions about our services? We're here to help 24/7.
              </p>
              <a href="tel:+94771234567" className="flex items-center gap-3 bg-white/20 hover:bg-white/30 rounded-2xl px-4 py-3 transition-colors">
                <Phone size={18} />
                <div>
                  <div className="text-xs text-blue-200">Call us</div>
                  <div className="font-bold text-sm">+94 77 123 4567</div>
                </div>
              </a>
            </div>

            {/* Steps Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6">
              <h3 className="font-black text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: "1", title: "Choose Service", desc: "Select your cleaning type" },
                  { step: "2", title: "Fill Details", desc: "Enter your contact info" },
                  { step: "3", title: "Pick Time", desc: "Choose date & time slot" },
                  { step: "4", title: "We Clean!", desc: "Sit back and relax" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                      <div className="text-gray-500 text-xs">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}