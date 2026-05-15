import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import ProjectDetail3DScene from '../components/Projects/ProjectDetail3DScene';
import ProjectContent from '../components/Projects/ProjectContent';
import { getProjectBySlug } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

gsap.registerPlugin(ScrollTrigger);

function activeFromProgress(progress, count) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.round(progress * (count - 1)));
}

function cardState(index, active) {
  if (index === active) return 'active';
  if (index < active) return 'past';
  return 'upcoming';
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const pageRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = project?.detailSections ?? [];
  const activeIndex = useMemo(
    () => activeFromProgress(scrollProgress, sections.length),
    [scrollProgress, sections.length]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    sectionsRef.current = [];
    if (!project) return undefined;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pageRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => setScrollProgress(self.progress),
      });

      gsap.from('.proj-detail-hero__inner', {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.1,
      });

      sectionsRef.current.forEach((el) => {
        const card = el?.querySelector('.proj-detail-card');
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, [project, slug]);

  if (!project) {
    return (
      <div className="proj-not-found">
        <h1>Project not found</h1>
        <Link to="/projects">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div
      className="proj-detail-page"
      ref={pageRef}
      style={{ '--project-accent': project.accent }}
    >
      <div className="proj-detail-scrim" aria-hidden="true" />
      <div className="proj-detail-canvas" aria-hidden="true">
        <ProjectDetail3DScene
          sections={sections}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          heroImage={project.image}
          accent={project.accent}
        />
      </div>

      <header className="proj-detail-hero">
        <div className="proj-detail-hero__inner">
          <Link to="/projects" className="proj-detail-back">
            <ArrowLeft size={14} />
            All Projects
          </Link>
          <div className="proj-detail-hero__grid">
            <div className="proj-detail-hero__copy">
              <p className="proj-detail-hero__eyebrow">{project.eyebrow}</p>
              <h1>{project.title}</h1>
              {project.subtitle && <p className="proj-detail-hero__sub">{project.subtitle}</p>}
              <p className="proj-detail-hero__teaser">{project.teaser}</p>
              {project.type === 'external' && (
                <a
                  className="proj-detail-hero__btn"
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.externalLabel}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
            <div className="proj-detail-hero__image-wrap">
              <img src={project.image} alt="" />
            </div>
          </div>
          <div className="proj-detail-hero__bar" aria-hidden="true">
            <span style={{ transform: `scaleX(${scrollProgress})` }} />
          </div>
        </div>
      </header>

      <div className="proj-detail-stream">
        {sections.map((section, index) => (
          <section
            key={section.id}
            className={`proj-detail-section ${index % 2 === 1 ? 'proj-detail-section--right' : ''}`}
            ref={(el) => {
              sectionsRef.current[index] = el;
            }}
            data-active={index === activeIndex}
          >
            <div className={`proj-detail-card proj-detail-card--${cardState(index, activeIndex)}`}>
              <span className="proj-detail-card__num">{String(index + 1).padStart(2, '0')}</span>
              <ProjectContent section={section} />
            </div>
          </section>
        ))}
        <div className="proj-detail-end" aria-hidden="true" />
      </div>
    </div>
  );
}
