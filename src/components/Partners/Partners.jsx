import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Partners.css';

// Import logos
import logo1 from '../../assets/LOGO-1.avif';
import logo2 from '../../assets/LOGO-2.avif';
import logo3 from '../../assets/LOGO-3.avif';
import logo4 from '../../assets/LOGO-4.avif';
import logo5 from '../../assets/LOGO-5.avif';

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  { id: 1, src: logo1, alt: 'Partner 1' },
  { id: 2, src: logo2, alt: 'Partner 2' },
  { id: 3, src: logo3, alt: 'Partner 3' },
  { id: 4, src: logo4, alt: 'Partner 4' },
  { id: 5, src: logo5, alt: 'Partner 5' },
];

// Duplicate for infinite scrolling effect
const CAROUSEL_LOGOS = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

export default function Partners() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Endless horizontal scroll animation
      const track = trackRef.current;
      if (track) {
        // Calculate distance based on content width (we have 4 sets of 5 logos)
        // We animate it moving left by exactly 50% of its total width, then reset, creating an infinite loop.
        gsap.to(track, {
          xPercent: -50,
          ease: "none",
          duration: 30, // Adjust speed
          repeat: -1,
        });
      }

      // 2. 3D ScrollTrigger Entrance
      const cards = cardsRef.current.filter(Boolean);
      
      // Initial state: deep in 3D space, tilted away, transparent
      gsap.set(cards, {
        opacity: 0,
        z: -500,
        rotateY: 45,
        rotateX: 20,
        scale: 0.8,
      });

      // Fly-in sequence
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter() {
          gsap.to(cards, {
            opacity: 1,
            z: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.05, // Cascading fly-in
            ease: 'back.out(1.2)',
          });
        }
      });

      // 3. Scroll Parallax on the whole container
      gsap.fromTo(
        '.partners__carousel-wrapper',
        { rotateX: 10, y: 50 },
        {
          rotateX: -5,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // 4. Hover effect on cards
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { scale: 1.05, y: -5, duration: 0.3, ease: 'power2.out' });
          gsap.to(card.querySelector('img'), { filter: 'grayscale(0%) brightness(1)', duration: 0.3 });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to(card.querySelector('img'), { filter: 'grayscale(100%) brightness(1.5)', duration: 0.4 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="partners" className="partners" aria-label="Global Partners">
      
      {/* Background ambient lighting */}
      <div className="partners__bg-glow" aria-hidden="true" />
      
      <div className="partners__inner">
        <div className="partners__heading">
          <span className="partners__eyebrow">Trusted Worldwide</span>
          <h2 className="partners__title">Global Supply Network</h2>
        </div>

        {/* 3D Wrapper */}
        <div className="partners__carousel-wrapper">
          <div className="partners__carousel-track" ref={trackRef}>
            {CAROUSEL_LOGOS.map((logo, i) => (
              <div 
                key={`${logo.id}-${i}`} 
                className="partners__card"
                ref={el => (cardsRef.current[i] = el)}
              >
                <div className="partners__card-inner">
                  <img src={logo.src} alt={logo.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Edge fades to seamlessly blend the infinite scroll */}
          <div className="partners__fade partners__fade--left" />
          <div className="partners__fade partners__fade--right" />
        </div>
      </div>
    </section>
  );
}
