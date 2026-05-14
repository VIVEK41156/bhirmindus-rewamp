import { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Partners from '../components/Partners/Partners';

export default function Home() {
  // Ensure the page scrolls to top when navigating to it
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      <Partners />
    </>
  );
}
