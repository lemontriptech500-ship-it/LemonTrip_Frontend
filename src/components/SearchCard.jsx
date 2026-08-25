import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarDays, Users, Compass, ArrowRight } from 'lucide-react';
import '../styles/SearchCard.css';

const travelStyles = ['Adventure', 'Honeymoon', 'Family', 'Luxury', 'Beach', 'Cultural', 'Wildlife'];

const popularTags = ['Maldives', 'Bali', 'Switzerland', 'Santorini', 'Rajasthan'];

export default function SearchCard() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travellers, setTravellers] = useState('');
  const [travelStyle, setTravelStyle] = useState('');

  const handleTagClick = (tag) => {
    setDestination(tag);
  };

  return (
    <section className="search-card-wrapper" aria-label="Trip search">
      <div className="container">
        <motion.div
          className="search-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className="search-card__header">
            <h2 className="search-card__title">Plan Your Perfect Journey</h2>
            <p className="search-card__subtitle">Tell us where you want to go and we'll craft a bespoke experience</p>
          </div>

          {/* Fields */}
          <div className="search-card__fields" role="search" aria-label="Trip search fields">
            {/* Destination */}
            <div className="search-field" id="search-destination-field">
              <span className="search-field__icon" aria-hidden="true">
                <MapPin size={20} strokeWidth={1.5} />
              </span>
              <div className="search-field__content">
                <label className="search-field__label" htmlFor="destination-input">Where to go?</label>
                <input
                  id="destination-input"
                  className="search-field__input"
                  type="text"
                  placeholder="Choose your dream destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  aria-label="Destination"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="search-field" id="search-dates-field">
              <span className="search-field__icon" aria-hidden="true">
                <CalendarDays size={20} strokeWidth={1.5} />
              </span>
              <div className="search-field__content">
                <label className="search-field__label" htmlFor="dates-input">When travelling?</label>
                <input
                  id="dates-input"
                  className="search-field__input"
                  type="text"
                  placeholder="Select dates"
                  value={dates}
                  onFocus={(e) => {
                    e.target.type = 'date';
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = 'text';
                  }}
                  onChange={(e) => setDates(e.target.value)}
                  aria-label="Travel dates"
                />
              </div>
            </div>

            {/* Travellers */}
            <div className="search-field" id="search-travellers-field">
              <span className="search-field__icon" aria-hidden="true">
                <Users size={20} strokeWidth={1.5} />
              </span>
              <div className="search-field__content">
                <label className="search-field__label" htmlFor="travellers-input">Travellers</label>
                <input
                  id="travellers-input"
                  className="search-field__input"
                  type="text"
                  placeholder="2 Adults"
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  aria-label="Number of travellers"
                />
              </div>
            </div>

            {/* Travel Style */}
            <div className="search-field" id="search-style-field">
              <span className="search-field__icon" aria-hidden="true">
                <Compass size={20} strokeWidth={1.5} />
              </span>
              <div className="search-field__content">
                <label className="search-field__label" htmlFor="style-select">Travel Style</label>
                <select
                  id="style-select"
                  className="search-field__select"
                  value={travelStyle}
                  onChange={(e) => setTravelStyle(e.target.value)}
                  aria-label="Travel style preference"
                >
                  <option value="" disabled>Select style</option>
                  {travelStyles.map((style) => (
                    <option key={style} value={style.toLowerCase()}>
                      {style}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit */}
            <button
              className="search-card__submit"
              id="search-submit-btn"
              aria-label="Find my perfect trip"
            >
              Find My Perfect Trip
              <ArrowRight size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Popular tags */}
          <div className="search-card__tags">
            <span className="search-card__tags-label">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="search-tag"
                onClick={() => handleTagClick(tag)}
                id={`search-tag-${tag.toLowerCase()}`}
                aria-label={`Search for ${tag}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
