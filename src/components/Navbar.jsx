import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, X } from 'lucide-react';
import '../styles/Navbar.css';

const navLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Holidays', href: '#holidays' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'About Us', href: '#about' },
];

const mobileMenuVariants = {
  hidden: { opacity: 0, y: '-100%' },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: '-100%',
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, duration: 0.4, ease: 'easeOut' },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="navbar__inner">
            {/* Logo */}
            <a href="#home" className="navbar__logo" aria-label="LemonTripp Tourism home">
              <span className="navbar__logo-main">
                LEMON<span>TRIPP</span>
              </span>
              <span className="navbar__logo-sub">Tourism</span>
            </a>

            {/* Center Nav */}
            <ul className="navbar__nav" role="list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={link.active ? 'active' : ''}
                    aria-current={link.active ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="navbar__actions">
              <button
                className="navbar__search-btn"
                aria-label="Search destinations"
                id="navbar-search-btn"
              >
                <Search size={16} />
              </button>
              <button className="navbar__cta" id="navbar-contact-btn">
                Contact Us
              </button>

              {/* Hamburger */}
              <button
                className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                id="navbar-hamburger-btn"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Mobile navigation menu"
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50%', width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.7)', cursor: 'pointer',
              }}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

            {/* Logo in mobile menu */}
            <div className="navbar__logo" style={{ marginBottom: '1rem' }}>
              <span className="navbar__logo-main" style={{ fontSize: '1.1rem' }}>
                LEMON<span>TRIPP</span>
              </span>
              <span className="navbar__logo-sub">Tourism</span>
            </div>

            <div className="navbar__mobile-divider" />

            <ul className="navbar__mobile-nav">
              {navLinks.map((link, i) => (
                <motion.li key={link.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                  <a href={link.href} onClick={closeMenu}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="navbar__mobile-divider" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.4 } }}
              style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
            >
              <button className="navbar__mobile-cta" onClick={closeMenu} id="mobile-contact-btn">
                <Phone size={14} style={{ marginRight: '0.4rem', display: 'inline' }} />
                Contact Us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
