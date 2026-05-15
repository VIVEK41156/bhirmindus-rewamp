import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsFlow({ projects, onProgress, onActiveIndex }) {
  const trackRef = useRef(null);
  const stepsRef = useRef([]);
  const originRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          onProgress?.(self.progress);
          const idx = Math.min(
            projects.length - 1,
            Math.round(self.progress * Math.max(1, projects.length - 1))
          );
          onActiveIndex?.(idx);
        },
      });

      if (originRef.current) {
        gsap.fromTo(
          originRef.current,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: originRef.current,
              start: 'top 88%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const card = step.querySelector('.proj-cine__card');
        const node = step.querySelector('.proj-cine__node');
        const beam = step.querySelector('.proj-cine__beam');
        const isLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top top',
            end: '+=110%',
            pin: true,
            pinSpacing: true,
            scrub: 1.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          beam,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.35, ease: 'power2.out' },
          0
        )
          .fromTo(
            node,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.5)' },
            0.08
          )
          .fromTo(
            card,
            {
              opacity: 0,
              x: isLeft ? -120 : 120,
              z: -280,
              rotateY: isLeft ? 28 : -28,
              rotateX: 12,
              scale: 0.72,
              filter: 'blur(12px)',
            },
            {
              opacity: 1,
              x: 0,
              z: 0,
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.45,
              ease: 'power3.out',
            },
            0.12
          )
          .to(
            card,
            {
              opacity: 0,
              x: isLeft ? -80 : 80,
              z: -180,
              rotateY: isLeft ? -18 : 18,
              rotateX: -8,
              scale: 0.82,
              filter: 'blur(10px)',
              duration: 0.4,
              ease: 'power2.in',
            },
            0.55
          )
          .to(node, { scale: 0, opacity: 0, duration: 0.25 }, 0.7)
          .to(beam, { scaleY: 0, opacity: 0, duration: 0.25 }, 0.72);
      });
    }, track);

    return () => ctx.revert();
  }, [projects, onProgress, onActiveIndex]);

  return (
    <div className="proj-cine__track" ref={trackRef}>
      <div className="proj-cine__spine" aria-hidden="true">
        <span className="proj-cine__spine-glow" />
        <span className="proj-cine__spine-line" />
      </div>

      <div className="proj-cine__origin-wrap" ref={originRef}>
        <div className="proj-cine__origin-card">
          <span className="proj-cine__origin-mark">◆</span>
          <h2>Our Projects</h2>
          <p>Scroll to enter the flow</p>
        </div>
        <span className="proj-cine__node proj-cine__node--origin" />
      </div>

      {projects.map((project, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const detailPath = `/projects/${project.slug}`;

        return (
          <section
            key={project.id}
            className={`proj-cine__step proj-cine__step--${side}`}
            ref={(el) => {
              stepsRef.current[index] = el;
            }}
            style={{ '--cine-accent': project.accent }}
          >
            <span className="proj-cine__beam" aria-hidden="true" />
            <span className="proj-cine__node" aria-hidden="true" />

            <div className="proj-cine__step-inner">
              <Link to={detailPath} className="proj-cine__card">
                <div className="proj-cine__card-media">
                  <img src={project.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
                  <span className="proj-cine__card-shine" aria-hidden="true" />
                </div>
                <div className="proj-cine__card-content">
                  <span className="proj-cine__card-num">{String(index + 1).padStart(2, '0')}</span>
                  <p className="proj-cine__card-eyebrow">{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                  {project.subtitle && <p className="proj-cine__card-sub">{project.subtitle}</p>}
                  <p className="proj-cine__card-teaser">{project.teaser}</p>
                  <span className="proj-cine__card-cta">
                    Explore project <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        );
      })}
    </div>
  );
}
