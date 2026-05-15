import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About3DScene from '../components/About/About3DScene';
import { ABOUT_SECTIONS } from '../components/About/aboutSections';
import '../components/About/About.css';

gsap.registerPlugin(ScrollTrigger);

function getActiveIndex(progress, count) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.round(progress * (count - 1)));
}

function getCardState(index, activeIndex) {
  if (index === activeIndex) return 'active';
  if (index < activeIndex) return 'past';
  return 'upcoming';
}

export default function About() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeIndex = useMemo(
    () => getActiveIndex(scrollProgress, ABOUT_SECTIONS.length),
    [scrollProgress]
  );

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      sectionsRef.current.forEach((section) => {
        const card = section.querySelector('.about-card');
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="about-page" ref={containerRef}>
      <div className="about-readability-scrim" aria-hidden="true" />
      <div className="about-canvas-container" aria-hidden="true">
        <About3DScene scrollProgress={scrollProgress} activeIndex={activeIndex} />
      </div>

      <header className="about-hero">
        <p className="about-hero__eyebrow">About Bhirmindus</p>
        <h1 className="about-hero__title">Built for global industry</h1>
        <p className="about-hero__lead">
          Scroll to journey through our presence, capacity, supply chain, and quality standards.
        </p>
        <div className="about-hero__progress" aria-hidden="true">
          <span
            className="about-hero__progress-fill"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
        <div className="about-hero__steps" aria-hidden="true">
          {ABOUT_SECTIONS.map((section, index) => (
            <span
              key={section.id}
              className={`about-hero__step${index <= activeIndex ? ' about-hero__step--lit' : ''}`}
            />
          ))}
        </div>
      </header>

      <div className="about-content">
        {ABOUT_SECTIONS.map((section, index) => {
          const cardState = getCardState(index, activeIndex);
          return (
            <section
              key={section.id}
              className={`about-section ${index % 2 === 1 ? 'about-section--right' : ''}`}
              ref={addToRefs}
              data-section={section.id}
              data-active={index === activeIndex}
            >
              <div className={`about-card about-card--${cardState}`}>
                <span className="about-card__index">{String(index + 1).padStart(2, '0')}</span>
                <h2>{section.title}</h2>
                {section.text && (
                  <p>
                    {section.highlight ? (
                      <>
                        {section.text.split(section.highlight)[0]}
                        <strong>{section.highlight}</strong>
                        {section.text.split(section.highlight)[1]}
                      </>
                    ) : (
                      section.text
                    )}
                  </p>
                )}
                {section.certifications && (
                  <>
                    <p>Our Quality Assurance department mandates strict compliance:</p>
                    <ul>
                      {section.certifications.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {section.footnote && (
                      <p className="about-card__footnote">{section.footnote}</p>
                    )}
                  </>
                )}
              </div>
            </section>
          );
        })}
        <div className="about-scroll-end" aria-hidden="true" />
      </div>
    </div>
  );
}