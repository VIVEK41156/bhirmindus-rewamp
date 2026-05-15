import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import ProjectsHub3DScene from '../components/Projects/ProjectsHub3DScene';
import { PROJECTS_HUB } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const pageRef = useRef(null);
  const tilesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.55,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      gsap.fromTo(
        '.projects-hero__eyebrow, .projects-hero__title, .projects-hero__lead',
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        }
      );

      tilesRef.current.forEach((tile) => {
        if (!tile) return;
        gsap.fromTo(
          tile,
          { opacity: 0, y: 56, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: tile,
              start: 'top 88%',
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
    <div className="projects-page" ref={pageRef}>
      <div className="projects-scrim" aria-hidden="true" />
      <div className="projects-canvas-wrap" aria-hidden="true">
        <ProjectsHub3DScene projects={PROJECTS_HUB} scrollProgress={scrollProgress} />
      </div>

      <header className="projects-hero">
        <p className="projects-hero__eyebrow">Our Portfolio</p>
        <h1 className="projects-hero__title">Projects & Ventures</h1>
        <p className="projects-hero__lead">
          Explore Birmingham Industries&apos; global partnerships — from commodities and manufacturing to
          hospitality, education, and financial markets.
        </p>
        <div className="projects-hero__progress" aria-hidden="true">
          <span
            className="projects-hero__progress-fill"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      <div className="projects-grid-wrap">
        <div className="projects-grid">
          {PROJECTS_HUB.map((project, index) => {
            const isExternal = Boolean(project.externalUrl);
            const TileTag = isExternal ? 'a' : Link;
            const tileProps = isExternal
              ? {
                  href: project.externalUrl,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  className: `project-tile project-tile--external`,
                }
              : {
                  to: `/projects/${project.slug}`,
                  className: 'project-tile',
                };

            return (
              <TileTag
                key={project.id}
                {...tileProps}
                ref={(el) => {
                  tilesRef.current[index] = el;
                }}
                style={{ '--tile-accent': project.accent }}
              >
                <span className="project-tile__accent" aria-hidden="true" />
                <div className="project-tile__visual">
                  <img src={project.image} alt="" loading="lazy" />
                </div>
                <div className="project-tile__body">
                  <span className="project-tile__index">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="project-tile__title">{project.title}</h2>
                  <p className="project-tile__tagline">{project.tagline}</p>
                  <span className="project-tile__cta">
                    {isExternal ? (
                      <>
                        Visit platform <ExternalLink size={14} />
                      </>
                    ) : (
                      <>
                        Explore <ArrowRight size={14} />
                      </>
                    )}
                  </span>
                </div>
              </TileTag>
            );
          })}
        </div>
      </div>
    </div>
  );
}
