import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Star, Shield, Clock, Award, ChevronRight, Play, CheckCircle, Phone, Mail, MapPin, ArrowRight, Sparkles, Users, ThumbsUp, Zap } from 'lucide-react';
import API from '../api/axios';

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600",
    title: "Spotless Homes,",
    subtitle: "Stress-Free Life",
    tag: "🏠 Residential Cleaning"
  },
  {
    image: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=1600",
    title: "Professional",
    subtitle: "Cleaning Services",
    tag: "✨ Deep Cleaning"
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600",
    title: "Fresh & Clean",
    subtitle: "Every Time",
    tag: "🏢 Commercial Spaces"
  }
];

const testimonials = [
  { name: "Saman Perera", role: "Homeowner", text: "Absolutely incredible service! My home has never looked this clean.", rating: 5, avatar: "SP" },
  { name: "Nimali Silva", role: "Office Manager", text: "Our office looks spotless every single day. Highly recommend!", rating: 5, avatar: "NS" },
  { name: "Kamal Fernando", role: "Villa Owner", text: "Best cleaning service in Colombo. Worth every rupee!", rating: 5, avatar: "KF" }
];

const whyUs = [
  { icon: Shield, title: "Fully Insured", desc: "All our staff are background-checked and fully insured for your peace of mind." },
  { icon: Clock, title: "On-Time Always", desc: "We respect your time. Our team always arrives on schedule, guaranteed." },
  { icon: Award, title: "5-Star Quality", desc: "Consistent 5-star results with premium eco-friendly cleaning products." },
  { icon: Zap, title: "Quick Booking", desc: "Book in under 2 minutes online. Instant confirmation via email." }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
  "https://images.unsplash.com/photo-1527515545081-5db817172677?w=600",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
  "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600",
];

function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 25);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-9 bg-gray-200 rounded-xl w-1/4" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    API.get('/services')
      .then(res => { setServices(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(prev => (prev + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(prev => (prev + 1) % testimonials.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">

      {/* ═══ HERO SECTION ═══ */}
      <div ref={heroRef} className="relative h-[92vh] overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 scale-110">
          <AnimatePresence mode="wait">
            {heroSlides.map((slide, index) => index === currentSlide && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <img src={slide.image} alt="hero" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-transparent" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl animate-pulse" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mb-5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium text-blue-200"
            >
              {heroSlides[currentSlide].tag}
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="text-6xl md:text-8xl font-black mb-3 leading-tight tracking-tight"
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.h2
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-light mb-6 text-blue-300"
            >
              {heroSlides[currentSlide].subtitle}
            </motion.h2>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed"
          >
            Sri Lanka's most trusted cleaning service — bringing perfection to every corner of your space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/booking')}
              className="group relative bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 flex items-center gap-2"
            >
              <Sparkles size={20} />
              Book Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group border-2 border-white/60 text-white hover:bg-white hover:text-blue-700 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm hover:scale-105">
              <Play size={18} />
              Our Services
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-8 top-1/3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white hidden md:block"
          >
            <div className="flex items-center gap-2 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="gold" color="gold" />)}
            </div>
            <div className="text-2xl font-black">4.9</div>
            <div className="text-xs text-gray-300">500+ Reviews</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute left-8 top-1/3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white hidden md:block"
          >
            <Shield size={24} className="text-blue-400 mb-1" />
            <div className="text-sm font-bold">Fully Insured</div>
            <div className="text-xs text-gray-300">100% Guaranteed</div>
          </motion.div>

          <div className="absolute bottom-8 flex gap-3">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-400 w-10' : 'bg-white/40 w-3 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══ STATS BAR ═══ */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-10 shadow-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-4">
          {[
            { number: 500, suffix: "+", label: "Happy Clients", icon: Users },
            { number: 8, suffix: "+", label: "Services", icon: Sparkles },
            { number: 5, suffix: "★", label: "Star Rating", icon: Star },
            { number: 24, suffix: "/7", label: "Support", icon: Clock }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <stat.icon size={24} className="text-blue-200 mb-2" />
              <div className="text-4xl font-black tracking-tight">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-blue-200 text-sm mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══ SERVICES SECTION ═══ */}
      <div className="max-w-7xl mx-auto py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">Our Services</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Choose from our wide range of professional cleaning services.</p>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? [...Array(8)].map((_, i) => <ServiceSkeleton key={i} />)
            : services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100"
              >
                <div className="overflow-hidden h-48 relative">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold shadow">
                    {service.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Starting from</span>
                      <div className="text-blue-600 font-black text-xl">Rs. {service.price}</div>
                    </div>
                    <button
                      onClick={() => navigate('/booking')}
                      className="group/btn bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1 hover:shadow-lg hover:shadow-blue-200"
                    >
                      Book
                      <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          }
        </div>
      </div>

      {/* ═══ ABOUT US SECTION ═══ */}
      <div className="py-24 px-4 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                  alt="About Us"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-3xl p-6 shadow-2xl shadow-blue-500/40"
              >
                <div className="text-4xl font-black">5+</div>
                <div className="text-blue-200 text-sm font-medium">Years Experience</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -top-6 -left-6 bg-white rounded-3xl p-5 shadow-2xl border border-gray-100"
              >
                <div className="text-3xl font-black text-blue-600">500+</div>
                <div className="text-gray-500 text-sm font-medium">Happy Clients</div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">About CleanPro</span>
              <h2 className="text-5xl font-black text-gray-900 leading-tight">
                We Clean with <span className="text-blue-500">Passion</span> & Precision
              </h2>
              <p className="text-gray-500 leading-relaxed text-lg">
                CleanPro has been Sri Lanka's most trusted cleaning service since 2019. Our team of trained professionals uses eco-friendly products and advanced techniques to deliver spotless results every time.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We believe a clean space leads to a clear mind. Whether it's your home, office, or commercial property, we treat every space as if it were our own.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: "🌿", title: "Eco-Friendly", desc: "Safe for kids & pets" },
                  { icon: "🔒", title: "Fully Insured", desc: "100% protected" },
                  { icon: "⭐", title: "5-Star Rated", desc: "500+ happy clients" },
                  { icon: "⚡", title: "Fast Service", desc: "Same-day available" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-blue-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-black text-gray-800 text-sm">{item.title}</div>
                    <div className="text-gray-500 text-xs mt-1">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => navigate('/booking')}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 shadow-xl shadow-blue-200"
              >
                <Sparkles size={20} />
                Book a Clean Today
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ WHY CHOOSE US ═══ */}
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-widest">Our Promise</span>
            <h2 className="text-5xl font-black text-white mt-2 mb-4">Why Choose CleanPro?</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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

      {/* ═══ GALLERY SECTION ═══ */}
      <div className="py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Our Work</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">Cleaning Gallery</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Real results from our professional cleaning team</p>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl shadow-lg group ${index === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${index === 0 ? 'h-72' : 'h-48'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ✨ CleanPro Work
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TESTIMONIALS ═══ */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">What Our Clients Say</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-3xl p-10 text-center shadow-xl"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={22} fill="#3b82f6" color="#3b82f6" />
                ))}
              </div>
              <p className="text-xl text-gray-700 italic leading-relaxed mb-8">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div className="text-left">
                  <div className="font-black text-gray-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-blue-500 text-sm font-medium">{testimonials[activeTestimonial].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-blue-500 w-10' : 'bg-gray-300 w-3'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ═══ CTA SECTION ═══ */}
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
          <h2 className="text-5xl font-black mb-4">Ready for a Spotless Home?</h2>
          <p className="text-blue-100 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Book your cleaning session today and experience the CleanPro difference. First booking gets 10% off!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/booking')}
              className="group bg-white text-blue-600 hover:bg-blue-50 px-10 py-4 rounded-full font-black text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-2"
            >
              <Sparkles size={20} />
              Book Now — Get 10% Off
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="tel:+94771234567" className="border-2 border-white/60 text-white hover:bg-white/10 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
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

      {/* ═══ CONTACT SECTION ═══ */}
      <div className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
            <h2 className="text-5xl font-black text-gray-900 mt-2 mb-4">Contact Us</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: "📍", title: "Our Location", value: "123 Galle Road, Colombo 03, Sri Lanka", color: "bg-blue-50 border-blue-100" },
                { icon: "📞", title: "Phone Number", value: "+94 77 123 4567", color: "bg-green-50 border-green-100" },
                { icon: "✉️", title: "Email Address", value: "info@cleanpro.lk", color: "bg-purple-50 border-purple-100" },
                { icon: "🕐", title: "Working Hours", value: "Mon - Sat: 8:00 AM - 6:00 PM", color: "bg-orange-50 border-orange-100" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${item.color} hover:shadow-md transition-all`}
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <div className="font-bold text-gray-700 text-sm">{item.title}</div>
                    <div className="text-gray-900 font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              ))}

              <motion.a
                href="https://wa.me/94771234567?text=Hi%20CleanPro!%20I%20need%20a%20cleaning%20service."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-2xl font-black text-lg transition-all shadow-xl shadow-green-500/30 w-full"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-100 h-[500px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798468177342!2d79.84731731477385!3d6.921837694975915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1625000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CleanPro Location"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ PREMIUM FOOTER ═══ */}
      <footer className="bg-gray-950 text-white pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black mb-3">🧹 CleanPro</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Sri Lanka's most trusted professional cleaning service. Bringing perfection to every space since 2019.
              </p>
              
                <a href="https://wa.me/94771234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500/20 hover:bg-green-500 border border-green-500/30 text-green-400 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              />
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              
            </div>

            <div>
              <h4 className="font-black mb-5 text-white">Quick Links</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                {[
                  { label: "Home", path: "/" },
                  { label: "Our Services", path: "/" },
                  { label: "Book Now", path: "/booking" },
                  { label: "Admin Panel", path: "/admin" }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.path} className="hover:text-blue-400 cursor-pointer transition-colors flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-5 text-white">Contact Us</h4>
              <div className="space-y-4 text-gray-400 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-lg">📍</span>
                  <span>123 Galle Road,<br />Colombo 03, Sri Lanka</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">📞</span>
                  <a href="tel:+94771234567" className="hover:text-blue-400 transition-colors">+94 77 123 4567</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <a href="mailto:info@cleanpro.lk" className="hover:text-blue-400 transition-colors">info@cleanpro.lk</a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
            <span>© 2024 CleanPro. All rights reserved.</span>
            <div className="flex gap-6">
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}