import { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import ProjectDetail3DScene from '../components/Projects/ProjectDetail3DScene';
import ProjectSectionContent from '../components/Projects/ProjectSectionContent';
import { getProjectBySlug } from '../components/Projects/projectsData';
import '../components/Projects/Projects.css';

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

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const pageRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionCount = project?.sections?.length ?? 0;
  const activeIndex = useMemo(
    () => getActiveIndex(scrollProgress, sectionCount),
    [scrollProgress, sectionCount]
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

      sectionsRef.current.forEach((section) => {
        const card = section.querySelector('.project-card');
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
    }, pageRef);

    return () => ctx.revert();
  }, [project, slug]);

  if (!project) {
    return (
      <div className="project-not-found">
        <h1>Project not found</h1>
        <Link to="/projects">← Back to Projects</Link>
      </div>
    );
  }

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div
      className="project-detail-page"
      ref={pageRef}
      style={{ '--project-accent': project.accent }}
    >
      <div className="projects-detail-scrim" aria-hidden="true" />
      <div className="projects-detail-canvas" aria-hidden="true">
        <ProjectDetail3DScene
          sections={project.sections}
          scrollProgress={scrollProgress}
          activeIndex={activeIndex}
          heroImage={project.image}
          accent={project.accent}
        />
      </div>

      <header className="project-detail-hero">
        <Link to="/projects" className="project-detail-hero__back">
          <ArrowLeft size={14} />
          All Projects
        </Link>
        <p className="project-detail-hero__eyebrow">{project.eyebrow}</p>
        <h1 className="project-detail-hero__title">{project.title}</h1>
        {project.subtitle && (
          <p className="project-detail-hero__subtitle">{project.subtitle}</p>
        )}
        <div className="project-detail-hero__progress" aria-hidden="true">
          <span
            className="project-detail-hero__progress-fill"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      <div className="project-detail-content">
        {project.sections.map((section, index) => {
          const cardState = getCardState(index, activeIndex);
          return (
            <section
              key={section.id}
              className={`project-detail-section ${index % 2 === 1 ? 'project-detail-section--right' : ''}`}
              ref={addToRefs}
              data-active={index === activeIndex}
            >
              <div className={`project-card project-card--${cardState}`}>
                <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
                <ProjectSectionContent
                  section={section}
                  sectionIndex={index}
                  title={project.title}
                />
              </div>
            </section>
          );
        })}
        <div className="project-detail-end" aria-hidden="true" />
      </div>
    </div>
  );
}
