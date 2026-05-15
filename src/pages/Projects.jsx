import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectsFlow from '../components/Projects/ProjectsFlow';
import ProjectsFlow3DScene from '../components/Projects/ProjectsFlow3DScene';
import { PROJECTS } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const pageRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleProgress = useCallback((p) => setScrollProgress(p), []);
  const handleActive = useCallback((i) => setActiveIndex(i), []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.proj-cine-hero__title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        delay: 0.15,
      });
      gsap.from('.proj-cine-hero__lead', {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.35,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="proj-cine-page" ref={pageRef}>
      <div className="proj-cine-page__scrim" aria-hidden="true" />

      <div className="proj-cine-page__canvas" aria-hidden="true">
        <ProjectsFlow3DScene
          projects={PROJECTS}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
        />
      </div>

      <header className="proj-cine-hero">
        <h1 className="proj-cine-hero__title">Our Projects</h1>
        <p className="proj-cine-hero__lead">
          Scroll through the cinematic flow — each venture appears in depth, then fades as you move on.
          Scroll back to watch them return one by one.
        </p>
        <div className="proj-cine-hero__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${scrollProgress})` }} />
        </div>
        <div className="proj-cine-hero__dots" aria-hidden="true">
          {PROJECTS.map((p, i) => (
            <span
              key={p.id}
              className={i <= activeIndex ? 'proj-cine-hero__dot proj-cine-hero__dot--on' : 'proj-cine-hero__dot'}
              style={i <= activeIndex ? { background: p.accent } : undefined}
            />
          ))}
        </div>
      </header>

      <ProjectsFlow
        projects={PROJECTS}
        onProgress={handleProgress}
        onActiveIndex={handleActive}
      />
    </div>
  );
}
