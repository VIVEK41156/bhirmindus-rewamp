import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About3DScene from '../components/About/About3DScene';
import { ABOUT_SECTIONS } from '../components/About/aboutSections';
import '../components/About/About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

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
          { opacity: 0, y: 48, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 72%',
              end: 'top 38%',
              toggleActions: 'play reverse play reverse',
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
      <div className="about-canvas-container" aria-hidden="true">
        <About3DScene scrollProgress={scrollProgress} />
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
      </header>

      <div className="about-content">
        {ABOUT_SECTIONS.map((section, index) => (
          <section
            key={section.id}
            className={`about-section ${index % 2 === 1 ? 'about-section--right' : ''}`}
            ref={addToRefs}
            data-section={section.id}
          >
            <div className="about-card">
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
        ))}
        <div className="about-scroll-end" aria-hidden="true" />
      </div>
    </div>
  );
}
