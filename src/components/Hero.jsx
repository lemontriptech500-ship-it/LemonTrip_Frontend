import { motion } from 'framer-motion';
import { Users, MapPin, Heart, Headphones } from 'lucide-react';
import '../styles/Hero.css';

const trustItems = [
  { icon: <Users size={16} />, value: '10,000+', label: 'Happy Travellers' },
  { icon: <MapPin size={16} />, value: '50+', label: 'Destinations' },
  { icon: <Heart size={16} />, value: '100%', label: 'Personalized Trips' },
  { icon: <Headphones size={16} />, value: '24/7', label: 'Travel Support' },
];

// Framer Motion variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.4, 0, 0.2, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const trustVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.9 },
  },
};

const trustItemVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section className="hero" id="home" aria-label="Hero section">
      {/* Background */}
      <div className="hero__bg">
        <motion.img
          src="/hero-bg.png"
          alt="Breathtaking tropical beach at golden hour"
          className="hero__bg-image"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        />
        <div className="hero__overlay" />
      </div>

      {/* Main Content */}
      <div className="hero__content-wrapper">
        <div className="container">
          <motion.div
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow */}
            <motion.div className="hero__eyebrow" variants={fadeUp}>
              <span className="hero__eyebrow-line" />
              Premium Travel Experiences
            </motion.div>

            {/* Headline */}
            <motion.h1 className="hero__headline" variants={fadeUp}>
              Your Next Story Begins{' '}
              <em>Somewhere Beautiful.</em>
            </motion.h1>

            {/* Subtext */}
            <motion.p className="hero__subtext" variants={fadeUp}>
              From breathtaking escapes to unforgettable adventures, LemonTripp creates
              journeys you'll remember long after you return home.
            </motion.p>

            {/* CTAs */}
            <motion.div className="hero__cta-group" variants={fadeUp}>
              <button className="btn-primary-hero" id="hero-explore-btn">
                Explore Destinations
              </button>
              <button className="btn-secondary-hero" id="hero-plan-btn">
                Plan My Trip
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="hero__trust">
        <div className="container">
          <motion.div
            className="hero__trust-inner"
            variants={trustVariants}
            initial="hidden"
            animate="visible"
          >
            {trustItems.map((item) => (
              <motion.div
                key={item.label}
                className="hero__trust-item"
                variants={trustItemVariant}
              >
                <span className="hero__trust-icon">{item.icon}</span>
                <span className="hero__trust-text">
                  <span className="hero__trust-value">{item.value}</span>
                  <span className="hero__trust-label">{item.label}</span>
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
