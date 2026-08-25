import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/FeaturedDestinations.css';

// ── Destination Data ──────────────────────────────────────────────────
// Using Unsplash Source CDN — free, high-quality, no auth needed
const destinations = [
  {
    name: 'Maldives',
    region: 'Indian Ocean',
    description: 'Crystal waters & private island escapes',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200&q=85&fit=crop',
    badge: 'Best for Honeymoon',
    slug: 'maldives',
  },
  {
    name: 'Bali',
    region: 'Indonesia',
    description: 'Temples, terraced rice fields & culture',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=85&fit=crop',
    badge: 'Trending',
    slug: 'bali',
  },
  {
    name: 'Kashmir',
    region: 'India',
    description: 'Paradise nestled in the Himalayas',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85&fit=crop',
    badge: null,
    slug: 'kashmir',
  },
  {
    name: 'Dubai',
    region: 'UAE',
    description: 'Where luxury meets the desert sky',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=85&fit=crop',
    badge: null,
    slug: 'dubai',
  },
  {
    name: 'Thailand',
    region: 'Southeast Asia',
    description: 'Tropical adventure & ancient wonder',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=900&q=85&fit=crop',
    badge: 'Most Loved',
    slug: 'thailand',
  },
  {
    name: 'Europe',
    region: 'Multi-country',
    description: 'A journey through timeless beauty and culture',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&q=85&fit=crop',
    badge: null,
    slug: 'europe',
    wide: true,
  },
];

// Split europe (wide card) from the main grid cards
const gridDestinations = destinations.filter((d) => !d.wide);
const europeCard = destinations.find((d) => d.wide);

// ── Section Header ────────────────────────────────────────────────────
function SectionHeader({ isInView }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <div className="destinations__header">
      <div className="destinations__header-left">
        <motion.div
          className="destinations__eyebrow"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className="destinations__eyebrow-line" aria-hidden="true" />
          Explore the World
        </motion.div>

        <motion.h2
          className="destinations__heading"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          Places You'll{' '}
          <em>Never Forget.</em>
        </motion.h2>

        <motion.p
          className="destinations__subtext"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          From breathtaking beaches and majestic mountains to vibrant cities and
          hidden gems, discover destinations that turn ordinary holidays into
          unforgettable stories.
        </motion.p>

        {/* Mobile-only CTA */}
        <motion.button
          className="destinations__view-all destinations__view-all-mobile"
          id="dest-view-all-mobile-btn"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          View All Destinations <ArrowRight size={13} />
        </motion.button>
      </div>

      {/* Desktop CTA */}
      <motion.button
        className="destinations__view-all"
        id="dest-view-all-btn"
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        View All Destinations <ArrowRight size={13} />
      </motion.button>
    </div>
  );
}

// ── Destination Card ──────────────────────────────────────────────────
function DestinationCard({ dest, index, wide = false }) {
  return (
    <motion.a
      href={`#${dest.slug}`}
      id={`dest-card-${dest.slug}`}
      className={`dest-card${wide ? ' dest-card--wide' : ''}`}
      aria-label={`Explore ${dest.name}, ${dest.region}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.09,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Background image */}
      <img
        src={dest.image}
        alt={`${dest.name} — ${dest.region}`}
        className="dest-card__img"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlay */}
      <div className="dest-card__overlay" aria-hidden="true" />

      {/* Badge (optional) */}
      {dest.badge && (
        <span className="dest-card__badge">{dest.badge}</span>
      )}

      {/* Content */}
      <div className="dest-card__content">
        <span className="dest-card__region">{dest.region}</span>
        <h3 className="dest-card__name">{dest.name}</h3>
        <p className="dest-card__desc">{dest.description}</p>
        <div className="dest-card__action" aria-hidden="true">
          <span className="dest-card__action-arrow" />
          Explore
        </div>
      </div>
    </motion.a>
  );
}

// ── Featured Destinations Section ─────────────────────────────────────
export default function FeaturedDestinations() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section className="destinations" id="destinations-section" aria-labelledby="destinations-heading">
      <div className="container">
        {/* Section Header */}
        <div ref={headerRef}>
          <SectionHeader isInView={isInView} />
        </div>

        {/* ── Desktop Grid ── */}
        <div className="destinations__grid" aria-label="Featured destinations">
          {gridDestinations.map((dest, index) => (
            <DestinationCard key={dest.slug} dest={dest} index={index} />
          ))}
        </div>

        {/* ── Europe — Full-width horizontal card ── */}
        <div className="destinations__europe-row">
          <DestinationCard dest={europeCard} index={5} wide />
        </div>

        {/* ── Mobile: Horizontal Scroll ── */}
        <div
          className="destinations__mobile-scroll"
          role="list"
          aria-label="Destinations — scroll to explore"
        >
          {destinations.map((dest, index) => (
            <DestinationCard key={dest.slug} dest={dest} index={index} wide={dest.wide} />
          ))}
        </div>

        {/* Mobile scroll indicator dots */}
        <div className="destinations__scroll-hint" aria-hidden="true">
          {destinations.map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
