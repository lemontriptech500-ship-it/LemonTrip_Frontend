import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchCard from './components/SearchCard';
import TravelMoods from './components/TravelMoods';
import FeaturedDestinations from './components/FeaturedDestinations';

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Search card floats over hero → moods transition */}
      <div
        style={{
          background: 'linear-gradient(to bottom, #0a0c10 0%, #f5f1eb 55%)',
          paddingBottom: '0',
        }}
      >
        <SearchCard />
      </div>

      <TravelMoods />
      <FeaturedDestinations />

      {/* Placeholder spacer — more sections coming */}
      <section
        style={{
          background: '#f5f1eb',
          padding: '5rem 0 4rem',
          textAlign: 'center',
          color: 'rgba(90,75,55,0.28)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          borderTop: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        — More Sections Coming Soon —
      </section>
    </main>
  );
}
