import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Projects3DScene from '../components/Projects/Projects3DScene';
import ProjectChapter from '../components/Projects/ProjectChapter';
import { PROJECTS_SCROLL } from '../components/Projects/projectsScrollData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

function activeIndexFromProgress(progress, count) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.round(progress * (count - 1)));
}

export default function Projects() {
  const pageRef = useRef(null);
  const sectionRefs = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const activeIndex = useMemo(
    () => activeIndexFromProgress(scrollProgress, PROJECTS_SCROLL.length),
    [scrollProgress]
  );

  const scrollToProject = useCallback((index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.65,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      gsap.from('.proj-hero__label', {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: 'power4.out',
        delay: 0.2,
      });
      gsap.from('.proj-hero__hint', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.45,
      });

      sectionRefs.current.forEach((section) => {
        const card = section?.querySelector('.proj-chapter__card');
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="proj-page" ref={pageRef}>
      <div className="proj-scrim" aria-hidden="true" />
      <div className="proj-canvas" aria-hidden="true">
        <Projects3DScene scrollProgress={scrollProgress} activeIndex={activeIndex} />
      </div>

      <nav className="proj-rail" aria-label="Project chapters">
        {PROJECTS_SCROLL.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={`proj-rail__btn${i === activeIndex ? ' proj-rail__btn--active' : ''}`}
            style={{ '--rail-accent': p.accent }}
            onClick={() => scrollToProject(i)}
            aria-current={i === activeIndex ? 'true' : undefined}
            aria-label={`Go to ${p.title}`}
          >
            <span className="proj-rail__name">{p.title}</span>
            <span className="proj-rail__dot" />
          </button>
        ))}
      </nav>

      <header className="proj-hero">
        <h1 className="proj-hero__label">Our Projects</h1>
        <p className="proj-hero__hint">
          Scroll through our ventures — each chapter opens with a cinematic view. Explore commodities,
          manufacturing, farming, hospitality, education, and global markets.
        </p>
        <div className="proj-hero__bar" aria-hidden="true">
          <span className="proj-hero__bar-fill" style={{ transform: `scaleX(${scrollProgress})` }} />
        </div>
      </header>

      <div className="proj-stream">
        {PROJECTS_SCROLL.map((project, index) => (
          <section
            key={project.id}
            id={project.id}
            className={`proj-section proj-section--${project.align}`}
            data-active={index === activeIndex}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            <ProjectChapter project={project} index={index} />
          </section>
        ))}
        <div className="proj-end" aria-hidden="true" />
      </div>
    </div>
  );
}
