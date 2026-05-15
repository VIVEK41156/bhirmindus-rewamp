import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const pageRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.from('.proj-hub-hero__title', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out',
        delay: 0.15,
      });

      rowsRef.current.forEach((row) => {
        if (!row) return;
        const visual = row.querySelector('.proj-hub-row__visual');
        const content = row.querySelector('.proj-hub-row__content');
        gsap.fromTo(
          visual,
          { opacity: 0, x: row.classList.contains('proj-hub-row--right') ? 40 : -40, scale: 0.96 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none none', once: true },
          }
        );
        gsap.fromTo(
          content,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: row, start: 'top 78%', toggleActions: 'play none none none', once: true },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="proj-hub" ref={pageRef}>
      <header className="proj-hub-hero">
        <h1 className="proj-hub-hero__title">Our Projects</h1>
        <p className="proj-hub-hero__lead">
          Select a venture below to explore the full story — commodities, manufacturing, farming,
          hospitality, education, and global markets.
        </p>
      </header>

      <div className="proj-hub-list">
        {PROJECTS.map((project, index) => {
          const isRight = project.align === 'right';
          const detailPath = `/projects/${project.slug}`;

          return (
            <article
              key={project.id}
              className={`proj-hub-row ${isRight ? 'proj-hub-row--right' : 'proj-hub-row--left'}`}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
              style={{ '--row-accent': project.accent }}
            >
              <div className="proj-hub-row__visual">
                <img src={project.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
                <span className="proj-hub-row__visual-glow" aria-hidden="true" />
              </div>

              <div className="proj-hub-row__content">
                <span className="proj-hub-row__index">{String(index + 1).padStart(2, '0')}</span>
                <p className="proj-hub-row__eyebrow">{project.eyebrow}</p>

                <Link to={detailPath} className="proj-hub-row__title-link">
                  <h2 className="proj-hub-row__title">{project.title}</h2>
                </Link>

                {project.subtitle && (
                  <p className="proj-hub-row__subtitle">{project.subtitle}</p>
                )}

                <p className="proj-hub-row__teaser">{project.teaser}</p>

                <Link to={detailPath} className="proj-hub-row__cta">
                  View full project
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
