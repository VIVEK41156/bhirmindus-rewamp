import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import heroBg from '../../assets/herobg.mp4';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────
const BADGES = [
  { label: 'UK',     flag: '🇬🇧' },
  { label: 'India',  flag: '🇮🇳' },
  { label: 'Europe', flag: '🇪🇺' },
];

const CERTS = ['ISO 9001:2015', 'ISO 45001', 'ISO 22000', 'FSSC 22000', 'BRCGS', 'HALAL'];

// Two headline lines split into individual words for 3D flip animation
const LINE_ONE = ['SOURCING',     'EXCELLENCE'];
const LINE_TWO = ['MANUFACTURING','SUCCESS'];

// ─── Hero Component ───────────────────────────────────────────────────
export default function Hero() {
  const sectionRef   = useRef(null);
  const videoRef     = useRef(null);
  const overlayRef   = useRef(null);
  const contentRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── 1. Set initial hidden states ── */
      gsap.set('.hero__word-inner',       { rotateX: -88, opacity: 0, transformOrigin: '50% 100%' });
      gsap.set('.hero__eyebrow',          { opacity: 0, x: -24 });
      gsap.set('.hero__tagline',          { opacity: 0, clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.hero__cta',              { opacity: 0, y: 22 });
      gsap.set('.hero__badge',            { opacity: 0, y: -12, scale: 0.85 });
      gsap.set('.hero__scroll-indicator', { opacity: 0, y: 10 });
      gsap.set('.hero__cert-strip',       { opacity: 0, y: 16 });

      /* ── 2. Entrance timeline ── */
      const tl = gsap.timeline({ delay: 0.6, defaults: { ease: 'power4.out' } });

      tl
        // Eyebrow label
        .to('.hero__eyebrow', { opacity: 1, x: 0, duration: 0.7 })

        // 3D word flip — stagger each word
        .to('.hero__word-inner', {
          rotateX: 0,
          opacity: 1,
          duration: 1.0,
          stagger: {
            amount: 0.55,
            ease: 'power2.inOut',
          },
        }, '-=0.3')

        // Tagline wipe-in from left
        .to('.hero__tagline', {
          opacity: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.85,
          ease: 'power3.out',
        }, '-=0.55')

        // CTA buttons
        .to('.hero__cta', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.55')

        // Region badges cascade
        .to('.hero__badge', {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.10,
          ease: 'back.out(1.8)',
        }, '-=0.5')

        // Scroll indicator
        .to('.hero__scroll-indicator', {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, '-=0.2')

        // Cert strip
        .to('.hero__cert-strip', {
          opacity: 1,
          y: 0,
          duration: 0.55,
        }, '-=0.35');

      /* ── 3. Scroll parallax (scrub) ── */
      const video   = videoRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start:   'top top',
        end:     'bottom top',
        scrub:   true,
        onUpdate(self) {
          const p = self.progress;
          // Video very slowly scales
          gsap.set(video,   { scale: 1 + p * 0.06 });
          // Content drifts up and fades
          gsap.set(content, { y: p * -80, opacity: 1 - p * 1.6 });
          // Overlay darkens
          gsap.set(overlay, { opacity: 0.52 + p * 0.38 });
        },
      });

      /* ── 4. Mouse depth parallax ── */
      const section = sectionRef.current;
      const onMouseMove = (e) => {
        const xPct = (e.clientX / window.innerWidth  - 0.5);
        const yPct = (e.clientY / window.innerHeight - 0.5);

        // Content shifts subtly toward cursor
        gsap.to(content, {
          x:        xPct * 14,
          y:        yPct * 8,
          duration: 1.4,
          ease:     'power2.out',
          overwrite: 'auto',
        });

        // Video shifts opposite direction (depth illusion)
        gsap.to(video, {
          x:        xPct * -18,
          y:        yPct * -10,
          duration: 1.8,
          ease:     'power2.out',
          overwrite: 'auto',
        });

        // Badges tilt slightly
        gsap.to('.hero__badge', {
          x:        xPct * 8,
          y:        yPct * 4,
          duration: 1.2,
          ease:     'power2.out',
          overwrite: 'auto',
        });
      };

      section?.addEventListener('mousemove', onMouseMove);
      return () => section?.removeEventListener('mousemove', onMouseMove);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero">

      {/* ── Background Video ── */}
      <div className="hero__video-wrap">
        <video
          ref={videoRef}
          className="hero__bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroBg} type="video/mp4" />
        </video>
      </div>

      {/* ── Overlay layers ── */}
      <div ref={overlayRef} className="hero__overlay" aria-hidden="true" />
      <div className="hero__overlay-gradient"                aria-hidden="true" />
      <div className="hero__noise"                           aria-hidden="true" />

      {/* ── Region badges ── */}
      <div className="hero__badges" aria-label="Global presence">
        {BADGES.map(b => (
          <div key={b.label} className="hero__badge">
            <span aria-hidden="true">{b.flag}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div ref={contentRef} className="hero__content">

        {/* Eyebrow */}
        <p className="hero__eyebrow" aria-label="Company name">Birmingham Industries</p>

        {/* ── 3D Headline ── */}
        <div className="hero__title" role="heading" aria-level="1"
             aria-label="Sourcing Excellence, Manufacturing Success">

          {/* Line 1: SOURCING + EXCELLENCE */}
          <div className="hero__line hero__line--one">
            {LINE_ONE.map((word, i) => (
              <div key={word} className="hero__word" data-index={i}>
                <span className="hero__word-inner">{word}</span>
              </div>
            ))}
          </div>

          {/* Line 2: MANUFACTURING + SUCCESS */}
          <div className="hero__line hero__line--two">
            {LINE_TWO.map((word, i) => (
              <div key={word} className="hero__word" data-index={i + 2}>
                <span className="hero__word-inner">{word}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Tagline */}
        <p className="hero__tagline">
          Global Export Sales &nbsp;·&nbsp; ISO Certified &nbsp;·&nbsp; HALAL Approved
        </p>

        {/* CTA */}
        <div className="hero__cta">
          <a href="#products" className="hero__btn hero__btn--primary" id="hero-products-btn">
            Explore Products
            <ArrowDown size={15} />
          </a>
          <a href="#contact" className="hero__btn hero__btn--outline" id="hero-contact-btn">
            Get in Touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* ── Certification strip ── */}
      <div className="hero__cert-strip" aria-label="Certifications">
        {CERTS.map(cert => (
          <span key={cert} className="hero__cert-tag">{cert}</span>
        ))}
      </div>

    </section>
  );
}
