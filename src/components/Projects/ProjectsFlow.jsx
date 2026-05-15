import { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const STEP_H = 520;
const ORIGIN_H = 200;

function buildRibbonPath(nodeCount) {
  const w = 200;
  const cx = w / 2;
  let y = 60;
  let d = `M ${cx} ${y}`;

  for (let i = 0; i < nodeCount; i++) {
    const nextY = y + STEP_H;
    const bendX = i % 2 === 0 ? cx - 62 : cx + 62;
    const midY = y + STEP_H * 0.48;
    d += ` C ${cx} ${midY - 30}, ${bendX} ${midY}, ${bendX} ${nextY - 70}`;
    d += ` S ${cx} ${nextY - 25}, ${cx} ${nextY}`;
    y = nextY;
  }

  return { d, height: y + 120, width: w };
}

export default function ProjectsFlow({ projects, trackRef }) {
  const pathRef = useRef(null);
  const glowRef = useRef(null);
  const stepsRef = useRef([]);

  const { d, height, width } = useMemo(
    () => buildRibbonPath(projects.length),
    [projects.length]
  );

  const gradientStops = useMemo(() => {
    const stops = [{ offset: '0%', color: '#3D3DB8' }];
    projects.forEach((p, i) => {
      stops.push({
        offset: `${((i + 1) / (projects.length + 1)) * 100}%`,
        color: p.accent,
      });
    });
    stops.push({ offset: '100%', color: '#C8A96E' });
    return stops;
  }, [projects]);

  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!path || !trackRef?.current) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    if (glow) gsap.set(glow, { strokeDasharray: len, strokeDashoffset: len });

    const ctx = gsap.context(() => {
      const drawTween = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 60%',
          end: 'bottom 75%',
          scrub: 0.85,
        },
      });

      if (glow) {
        gsap.to(glow, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 60%',
            end: 'bottom 75%',
            scrub: 0.85,
          },
        });
      }

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const card = step.querySelector('.proj-flow__card');
        const node = step.querySelector('.proj-flow__node:not(.proj-flow__node--origin)');
        const ribbonSeg = step.querySelector('.proj-flow__seg-glow');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: step,
            start: 'top 78%',
            toggleActions: 'play none none none',
            once: true,
          },
        });

        tl.fromTo(node, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)' })
          .fromTo(
            card,
            { opacity: 0, y: 48, rotateY: i % 2 === 0 ? -8 : 8 },
            { opacity: 1, y: 0, rotateY: 0, duration: 0.85, ease: 'power3.out' },
            '-=0.2'
          );

        if (ribbonSeg) {
          gsap.fromTo(
            ribbonSeg,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              scrollTrigger: { trigger: step, start: 'top 70%', toggleActions: 'play none none none', once: true },
            }
          );
        }
      });

      return () => drawTween.kill();
    }, trackRef);

    return () => ctx.revert();
  }, [projects, trackRef, d]);

  return (
    <div className="proj-flow__canvas" style={{ height: `${ORIGIN_H + projects.length * STEP_H + 180}px` }}>
      <svg
        className="proj-flow__svg"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMin meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="proj-flow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            {gradientStops.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <filter id="proj-flow-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={glowRef}
          className="proj-flow__path proj-flow__path--glow"
          d={d}
          fill="none"
        />
        <path ref={pathRef} className="proj-flow__path proj-flow__path--main" d={d} fill="none" />
      </svg>

      <div className="proj-flow__origin">
        <div className="proj-flow__card proj-flow__card--origin">
          <span className="proj-flow__origin-icon" aria-hidden="true">◆</span>
          <h2>Our Projects</h2>
          <p>Scroll the flow</p>
        </div>
        <span className="proj-flow__node proj-flow__node--origin" aria-hidden="true" />
      </div>

      {projects.map((project, index) => {
        const side = index % 2 === 0 ? 'left' : 'right';
        const detailPath = `/projects/${project.slug}`;

        return (
          <div
            key={project.id}
            className={`proj-flow__step proj-flow__step--${side}`}
            ref={(el) => {
              stepsRef.current[index] = el;
            }}
            style={{ '--flow-accent': project.accent, minHeight: `${STEP_H}px` }}
          >
            <span className="proj-flow__seg-glow" aria-hidden="true" />
            <span className="proj-flow__node" aria-hidden="true" />

            <Link
              to={detailPath}
              className="proj-flow__card"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${project.accent} 28%, #0b0c28) 0%, #0b0c28 55%)`,
              }}
            >
              <div className="proj-flow__card-thumb">
                <img src={project.image} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
              </div>
              <div className="proj-flow__card-body">
                <span className="proj-flow__card-num">{String(index + 1).padStart(2, '0')}</span>
                <p className="proj-flow__card-eyebrow">{project.eyebrow}</p>
                <h3>{project.title}</h3>
                {project.subtitle && <p className="proj-flow__card-sub">{project.subtitle}</p>}
                <p className="proj-flow__card-teaser">{project.teaser}</p>
                <span className="proj-flow__card-cta">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
