import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import '../styles/TravelMoods.css';

// ── Data ──────────────────────────────────────────────────────────────
const travelMoods = [
  {
    id: 1,
    title: 'Beach Escapes',
    description: 'Sun, sand, and endless horizons.',
    tag: 'Coastal',
    image: '/mood-beach.png',
    slug: 'beach',
  },
  {
    id: 2,
    title: 'Romantic Getaways',
    description: 'Beautiful places. Unforgettable moments.',
    tag: 'Romance',
    image: '/mood-romantic.png',
    slug: 'romantic',
  },
  {
    id: 3,
    title: 'Mountain Adventures',
    description: 'Go higher. Breathe deeper. Feel alive.',
    tag: 'Adventure',
    image: '/mood-mountain.png',
    slug: 'mountains',
  },
  {
    id: 4,
    title: 'Family Holidays',
    description: 'Memories are better when shared.',
    tag: 'Family',
    image: '/mood-family.png',
    slug: 'family',
  },
  {
    id: 5,
    title: 'International Adventures',
    description: 'New cultures. New stories. New perspectives.',
    tag: 'Global',
    image: '/mood-international.png',
    slug: 'international',
  },
  {
    id: 6,
    title: 'Luxury Experiences',
    description: 'Travel without compromise.',
    tag: 'Exclusive',
    image: null,           // uses CSS gradient fallback
    slug: 'luxury',
  },
];

// ── Reusable MoodCard ─────────────────────────────────────────────────
function MoodCard({ mood, index }) {
  return (
    <motion.a
      href={`#${mood.slug}`}
      className={`mood-card${!mood.image ? ' mood-card--luxury' : ''}`}
      id={`mood-card-${mood.slug}`}
      aria-label={`Explore ${mood.title}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {/* Background image */}
      {mood.image && (
        <img
          src={mood.image}
          alt={mood.title}
          className="mood-card__image"
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Overlay gradient */}
      <div className="mood-card__overlay" aria-hidden="true" />

      {/* Text content */}
      <div className="mood-card__content">
        <span className="mood-card__tag">{mood.tag}</span>
        <h3 className="mood-card__title">{mood.title}</h3>
        <p className="mood-card__desc">{mood.description}</p>
        <div className="mood-card__action" aria-hidden="true">
          <span className="mood-card__action-line" />
          Explore
        </div>
      </div>
    </motion.a>
  );
}

// ── Section ───────────────────────────────────────────────────────────
export default function TravelMoods() {
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const lineUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="moods" id="destinations" aria-labelledby="moods-heading">
      <div className="container">
        {/* ── Section Header ── */}
        <motion.div
          className="moods__header"
          ref={headerRef}
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div className="moods__eyebrow" variants={lineUp}>
            <span className="moods__eyebrow-dot" aria-hidden="true" />
            Find Your Perfect Escape
            <span className="moods__eyebrow-dot" aria-hidden="true" />
          </motion.div>

          <motion.h2
            id="moods-heading"
            className="moods__heading"
            variants={lineUp}
          >
            Where Does Your Heart{' '}
            <em>Want to Go?</em>
          </motion.h2>

          <motion.p className="moods__subtext" variants={lineUp}>
            Every journey tells a different story. Whether you're chasing adventure,
            celebrating love, or simply escaping the everyday, there's a trip waiting for you.
          </motion.p>
        </motion.div>

        {/* ── Editorial Mood Grid ── */}
        <div className="moods__grid" role="list" aria-label="Travel mood categories">
          {travelMoods.map((mood, index) => (
            <MoodCard key={mood.id} mood={mood} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="moods__cta-row"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <p className="moods__cta-text">
            Not sure where to start? Let our experts craft your perfect journey.
          </p>
          <button className="moods__cta-btn" id="moods-explore-all-btn">
            View All Experiences
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
