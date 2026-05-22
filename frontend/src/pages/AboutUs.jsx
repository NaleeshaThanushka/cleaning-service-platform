import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield, Award, Users, Clock, Leaf, Star,
  CheckCircle, ArrowRight, Sparkles, Heart,
  Zap, ThumbsUp, Phone
} from 'lucide-react';

const stats = [
  { number: "500+", label: "Happy Clients", icon: Users },
  { number: "5★", label: "Average Rating", icon: Star },
  { number: "8+", label: "Services Offered", icon: Sparkles },
  { number: "24/7", label: "Customer Support", icon: Clock },
];

const team = [
  {
    name: "Naleesha Thanushka",
    role: "Founder & CEO",
    avatar: "KP",
    color: "from-blue-500 to-blue-700",
    quote: "Cleanliness is not a luxury — it's a standard we set for every home."
  },
  {
    name: "Sanduni Fernando",
    role: "Head of Operations",
    avatar: "SF",
    color: "from-sky-400 to-blue-600",
    quote: "Our team's heart is in every sweep, scrub, and shine."
  },
  {
    name: "Nuwan Jayasinghe",
    role: "Lead Cleaning Specialist",
    avatar: "NJ",
    color: "from-blue-600 to-indigo-700",
    quote: "Attention to detail is what separates good from spotless."
  },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "All staff are background-verified and fully insured. Your home is in safe, trusted hands every visit."
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    desc: "We use only biodegradable, non-toxic cleaning products — safe for your family, pets, and the planet."
  },
  {
    icon: Award,
    title: "Quality First",
    desc: "Our 5-star quality guarantee means we don't leave until every corner meets our exacting standards."
  },
  {
    icon: Heart,
    title: "Customer Care",
    desc: "We treat every home like our own. Your satisfaction isn't just a goal — it's our promise."
  },
  {
    icon: Zap,
    title: "Efficiency",
    desc: "Trained professionals with proven systems deliver thorough results in the least amount of time."
  },
  {
    icon: ThumbsUp,
    title: "Reliability",
    desc: "On-time, every time. Consistent results you can count on, booking after booking."
  },
];

const milestones = [
  { year: "2018", title: "Founded in Colombo", desc: "CleanPro started with 3 staff and a vision to raise the standard of home cleaning in Sri Lanka." },
  { year: "2020", title: "Expanded to 8 Services", desc: "Added commercial, deep clean, and sofa express services to meet growing client demand." },
  { year: "2022", title: "500+ Happy Clients", desc: "Crossed the milestone of 500 satisfied customers across Colombo and surrounding districts." },
  { year: "2024", title: "Online Booking Launched", desc: "Launched our full digital platform, making it easier than ever to book, track, and manage cleanings." },
];

export default function AboutUs() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
            alt="About CleanPro"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent" />

        {/* Decorative orbs */}
        <div className="absolute top-16 right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-12 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium text-blue-200"
          >
            🧹 Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-3 leading-tight tracking-tight"
          >
            About
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-light mb-6 text-blue-300"
          >
            CleanPro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 max-w-xl leading-relaxed"
          >
            Sri Lanka's most trusted cleaning service — built on passion, precision, and people.
          </motion.p>
        </motion.div>
      </div>

      {/* ═══ STATS BAR ═══ */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-10 shadow-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <stat.icon size={24} className="text-blue-200 mb-2" />
              <div className="text-4xl font-black tracking-tight">{stat.number}</div>
              <div className="text-blue-200 text-sm mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ OUR STORY ═══ */}
      <div className="max-w-6xl mx-auto py-24 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Who We Are</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-6 leading-tight">
              Cleaning With <span className="text-blue-500">Purpose</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-5">
              CleanPro was born in 2018 from a simple belief: every Sri Lankan home and office deserves the highest standard of cleanliness — without compromise. What started as a small team in Colombo has grown into the island's most trusted cleaning service.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We combine trained professionals, eco-friendly products, and a culture of care to deliver results that go beyond the surface. Every booking is a promise — and we keep it, every time.
            </p>
            <div className="flex flex-col gap-3">
              {["Fully insured & background-checked staff", "100% satisfaction guarantee", "Eco-friendly, family-safe products", "Flexible scheduling — weekdays & weekends"].map((pt, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[420px]">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                alt="Our team at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Award size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-black text-gray-900 text-sm">Since 2018</div>
                  <div className="text-blue-500 text-xs font-medium">Trusted in Colombo</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-blue-500 rounded-2xl shadow-xl p-4 text-white"
            >
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="white" />)}
              </div>
              <div className="text-2xl font-black">4.9</div>
              <div className="text-xs text-blue-200">500+ Reviews</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ═══ OUR VALUES ═══ */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-5xl font-black text-white mt-2 mb-4">Our Core Values</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-blue-500/30 transition-colors">
                  <item.icon size={26} className="text-blue-400" />
                </div>
                <h3 className="text-white font-black text-lg mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TIMELINE ═══ */}
      <div className="max-w-4xl mx-auto py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Our Journey</span>
          <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">Milestones</h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl shadow-lg border border-blue-50 p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="text-blue-500 font-black text-sm mb-2">{m.year}</div>
                    <h3 className="text-gray-900 font-black text-lg mb-2">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex w-10 h-10 bg-blue-500 rounded-full border-4 border-white shadow-lg shadow-blue-200 items-center justify-center flex-shrink-0 z-10">
                  <Sparkles size={16} className="text-white" />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ MEET THE TEAM ═══ */}
      <div className="bg-gradient-to-br from-blue-50 to-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">The People Behind</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">Meet Our Team</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-lg border border-blue-50 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
              >
                <div className={`bg-gradient-to-br ${member.color} p-10 flex items-center justify-center`}>
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl">
                    {member.avatar}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-gray-900 font-black text-xl mb-1">{member.name}</h3>
                  <div className="text-blue-500 font-semibold text-sm mb-4">{member.role}</div>
                  <p className="text-gray-500 text-sm italic leading-relaxed">"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CTA ═══ */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} className="text-white" />
          </div>
          <h2 className="text-5xl font-black mb-4">Experience the CleanPro Difference</h2>
          <p className="text-blue-100 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ happy clients across Sri Lanka who trust CleanPro for a spotless, stress-free space.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/booking')}
              className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-full font-black text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <Sparkles size={20} />
              Book Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+94771234567"
              className="border-2 border-white/60 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
            >
              <Phone size={18} />
              Call Us Now
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-blue-100">
            {["No Hidden Fees", "Satisfaction Guaranteed", "Eco-Friendly Products", "Trained Professionals"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle size={16} className="text-blue-300" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
}