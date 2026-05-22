import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, ArrowRight, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', valid: password.length >= 8 },
    { label: 'Uppercase letter (A-Z)', valid: /[A-Z]/.test(password) },
    { label: 'Lowercase letter (a-z)', valid: /[a-z]/.test(password) },
    { label: 'Number (0-9)', valid: /[0-9]/.test(password) },
    { label: 'Special character (!@#$...)', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  const strength = checks.filter(c => c.valid).length;

  const strengthConfig = {
    0: { label: '', color: 'bg-gray-700', width: 'w-0' },
    1: { label: 'Very Weak', color: 'bg-red-500', width: 'w-1/5' },
    2: { label: 'Weak', color: 'bg-orange-500', width: 'w-2/5' },
    3: { label: 'Fair', color: 'bg-yellow-500', width: 'w-3/5' },
    4: { label: 'Strong', color: 'bg-blue-500', width: 'w-4/5' },
    5: { label: 'Very Strong', color: 'bg-green-500', width: 'w-full' },
  };

  const config = strengthConfig[strength];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 space-y-3"
    >
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-400 font-medium">Password Strength</span>
          <span className={`text-xs font-bold ${
            strength <= 1 ? 'text-red-400' :
            strength === 2 ? 'text-orange-400' :
            strength === 3 ? 'text-yellow-400' :
            strength === 4 ? 'text-blue-400' : 'text-green-400'
          }`}>{config.label}</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: undefined }}
            className={`h-full rounded-full transition-all duration-500 ${config.color} ${config.width}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5">
        {checks.map((check, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${
              check.valid ? 'text-green-400' : 'text-gray-500'
            }`}
          >
            {check.valid
              ? <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
              : <XCircle size={13} className="text-gray-600 flex-shrink-0" />
            }
            {check.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const getPasswordStrength = (password) => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return checks.filter(Boolean).length;
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    else if (getPasswordStrength(form.password) < 3) newErrors.password = 'Password is too weak. Please make it stronger.';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setLoading(true);
    try {
      const res = await API.post('/auth/register', {
        name: form.name, email: form.email, password: form.password
      });
      login(res.data);
      navigate('/');
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const strength = getPasswordStrength(form.password);
  const passwordBorderColor = !form.password ? 'border-white/10' :
    errors.password ? 'border-red-500/50' :
    strength <= 2 ? 'border-red-500/70' :
    strength === 3 ? 'border-yellow-500/70' :
    strength === 4 ? 'border-blue-500/70' :
    'border-green-500/70';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-blue-950 flex items-center justify-center px-4 py-8">
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-blue-400/10 rounded-full blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-blue-500/40">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Join CleanPro today</p>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-2xl text-sm mb-6 text-center"
            >
              ⚠ {errors.general}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={form.name}
                  onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                  placeholder="Your full name"
                  className={`w-full bg-white/5 border-2 ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500'} rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all`}
                />
              </div>
              {errors.name && <p className="text-red-400 text-xs mt-1">⚠ {errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                  placeholder="your@email.com"
                  className={`w-full bg-white/5 border-2 ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500'} rounded-2xl pl-11 pr-4 py-3.5 text-white placeholder-gray-600 outline-none transition-all`}
                />
              </div>
              {errors.email && <p className="text-red-400 text-xs mt-1">⚠ {errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setErrors({ ...errors, password: '' }); }}
                  placeholder="Create a strong password"
                  className={`w-full bg-white/5 border-2 ${passwordBorderColor} focus:border-blue-500 rounded-2xl pl-11 pr-12 py-3.5 text-white placeholder-gray-600 outline-none transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-xs mt-1">⚠ {errors.password}</p>}

              <PasswordStrength password={form.password} />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={e => { setForm({ ...form, confirmPassword: e.target.value }); setErrors({ ...errors, confirmPassword: '' }); }}
                  placeholder="Repeat your password"
                  className={`w-full bg-white/5 border-2 ${
                    !form.confirmPassword ? 'border-white/10' :
                    errors.confirmPassword ? 'border-red-500/50' :
                    form.password === form.confirmPassword ? 'border-green-500/70' : 'border-red-500/50'
                  } rounded-2xl pl-11 pr-12 py-3.5 text-white placeholder-gray-600 outline-none transition-all duration-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">⚠ {errors.confirmPassword}</p>}
              {form.confirmPassword && form.password === form.confirmPassword && !errors.confirmPassword && (
                <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                  <CheckCircle size={12} /> Passwords match!
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-2xl font-black text-lg transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}