import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────
const STATS = [
  { id: 'est', value: 2020, countFrom: 2010, suffix: '', line1: 'Year',     line2: 'Established'   },
  { id: 'mfr', value: 3,    countFrom: 0,    suffix: '', line1: 'Contract', line2: 'Manufacturers' },
  { id: 'net', value: 5,    countFrom: 0,    suffix: '', line1: 'Nation',   line2: 'Network'       },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const barRef     = useRef(null);
  const numRefs    = useRef([]);
  // Maintain an array of objects to tween the numbers
  const countObjs  = useRef(STATS.map(s => ({ val: s.countFrom })));

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // 1. Initial 3D State: folded away and hidden
    gsap.set(bar, { 
      opacity: 0, 
      y: 100, 
      rotateX: -60, 
      scale: 0.85,
      transformOrigin: '50% 50%' 
    });

    // Reset text content immediately
    STATS.forEach((stat, i) => {
      if (numRefs.current[i]) {
        numRefs.current[i].textContent = stat.countFrom.toLocaleString();
      }
    });

    // 2. Main Timeline (Paused initially, controlled by ScrollTrigger)
    const tl = gsap.timeline({ paused: true });

    // Bar flies in and unfolds
    tl.to(bar, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      duration: 1.2,
      ease: 'back.out(1.4)', // Adds a 3D bouncy spring effect
    }, 0);

    // Counters animate up (overlapping the bar fly-in)
    STATS.forEach((stat, i) => {
      const el = numRefs.current[i];
      const obj = countObjs.current[i];
      if (!el) return;

      tl.to(obj, {
        val: stat.value,
        duration: stat.value > 100 ? 1.5 : 1.2,
        ease: 'power3.out',
        onUpdate() {
          el.textContent = Math.round(obj.val).toLocaleString();
        },
      }, 0.3 + (i * 0.15)); // Stagger slightly
    });

    // 3. ScrollTrigger configuration
    ScrollTrigger.create({
      trigger: sectionRef.current,
      // start: when the TOP of the stats section hits 85% down the viewport (right as you cross hero)
      start: 'top 85%',
      // end: when the BOTTOM of the stats section leaves the top 15% of the viewport
      end: 'bottom 15%',
      animation: tl,
      // play when entering, reverse (collapse away) when leaving, play again when scrolling back up, reverse when scrolling back to top
      toggleActions: 'play reverse play reverse',
    });

    // 4. Hover micro-lift
    const items = bar.querySelectorAll('.stats__item');
    const onEnter = (e) => gsap.to(e.currentTarget, { y: -5, scale: 1.05, duration: 0.3, ease: 'back.out(2)' });
    const onLeave = (e) => gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    
    items.forEach(item => {
      item.addEventListener('mouseenter', onEnter);
      item.addEventListener('mouseleave', onLeave);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.trigger === sectionRef.current && t.kill());
      tl.kill();
      items.forEach(item => {
        item.removeEventListener('mouseenter', onEnter);
        item.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <div ref={sectionRef} className="stats" id="stats">
      <div ref={barRef} className="stats__bar" style={{ perspective: '1000px' }}>

        <div className="stats__item">
          <span ref={el => (numRefs.current[0] = el)} className="stats__number">
            {STATS[0].countFrom}
          </span>
          <span className="stats__label">
            <span>{STATS[0].line1}</span>
            <span>{STATS[0].line2}</span>
          </span>
        </div>

        <div className="stats__divider" aria-hidden="true" />

        <div className="stats__item">
          <span ref={el => (numRefs.current[1] = el)} className="stats__number">
            {STATS[1].countFrom}
          </span>
          <span className="stats__label">
            <span>{STATS[1].line1}</span>
            <span>{STATS[1].line2}</span>
          </span>
        </div>

        <div className="stats__divider" aria-hidden="true" />

        <div className="stats__item">
          <span ref={el => (numRefs.current[2] = el)} className="stats__number">
            {STATS[2].countFrom}
          </span>
          <span className="stats__label">
            <span>{STATS[2].line1}</span>
            <span>{STATS[2].line2}</span>
          </span>
        </div>

      </div>
    </div>
  );
}
