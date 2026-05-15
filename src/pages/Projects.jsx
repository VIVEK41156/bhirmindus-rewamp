import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectsFlow from '../components/Projects/ProjectsFlow';
import { PROJECTS } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const pageRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.proj-flow-hero__title', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power4.out',
        delay: 0.1,
      });
      gsap.from('.proj-flow-hero__lead', {
        opacity: 0,
        y: 24,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.3,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="proj-flow-page" ref={pageRef}>
      <div className="proj-flow-page__bg" aria-hidden="true">
        <span className="proj-flow-page__orb proj-flow-page__orb--1" />
        <span className="proj-flow-page__orb proj-flow-page__orb--2" />
      </div>

      <header className="proj-flow-hero">
        <h1 className="proj-flow-hero__title">Our Projects</h1>
        <p className="proj-flow-hero__lead">
          Follow the flow — each venture connects to the next. Scroll to reveal our portfolio, then
          open any project for the full cinematic story.
        </p>
      </header>

      <div className="proj-flow-track" ref={trackRef}>
        <ProjectsFlow projects={PROJECTS} trackRef={trackRef} />
      </div>
    </div>
  );
}
