import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About3DScene from '../components/About/About3DScene';
import '../components/About/About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Create a master ScrollTrigger for the overall progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      // Animate each section's text content as it enters
      sectionsRef.current.forEach((section, i) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top center+=100",
            end: "bottom center-=100",
            toggleActions: "play reverse play reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="about-container" ref={containerRef}>
      {/* 3D Background */}
      <div className="about-canvas-container">
        <About3DScene scrollProgress={scrollProgress} />
      </div>

      {/* HTML Content Overlay */}
      <div className="about-content">
        
        {/* Section 1: Global Presence */}
        <section className="about-section" ref={addToRefs}>
          <div className="about-card">
            <h2>Global Presence</h2>
            <p>
              We are incorporated in the UK, India, and Europe, effectively serving as the export sales function for our investment holding's manufacturing portfolio. Our international reach ensures seamless delivery and unwavering support worldwide.
            </p>
          </div>
        </section>

        {/* Section 2: Production */}
        <section className="about-section" ref={addToRefs}>
          <div className="about-card">
            <h2>Massive Capacity</h2>
            <p>
              Our state-of-the-art South Indian facility is capable of producing <strong>8000 tons</strong> of premium industrial and native food-grade starches and starch derivatives. We combine scale with precision engineering to meet the demands of modern industry.
            </p>
          </div>
        </section>

        {/* Section 3: Supply Staples */}
        <section className="about-section" ref={addToRefs}>
          <div className="about-card">
            <h2>Essential Supplies</h2>
            <p>
              Beyond industrial derivatives, we supply staple items including high-quality rice and pulses. We proudly serve the education and hospitality sectors across South India, ensuring consistent, top-tier agricultural products.
            </p>
          </div>
        </section>

        {/* Section 4: Logistics */}
        <section className="about-section" ref={addToRefs}>
          <div className="about-card">
            <h2>Global Logistics</h2>
            <p>
              Our freight forwarding partner is extremely reliable and highly competent. Whether you need materials locally or shipped anywhere internationally, our robust supply chain guarantees timely and secure delivery.
            </p>
          </div>
        </section>

        {/* Section 5: Quality Assurance */}
        <section className="about-section" ref={addToRefs}>
          <div className="about-card">
            <h2>Uncompromising Quality</h2>
            <p>Our Quality Assurance department mandates strict compliance:</p>
            <ul>
              <li>QMS ISO 9001:2015 & OHSMS ISO 45001:2018</li>
              <li>Food Grade: ISO 22000:2018, FSSC 22000, BRCGS</li>
              <li>HALAL Certified</li>
              <li>Government of India Food & Drug Administration Certified</li>
            </ul>
            <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
              * Our auditors are certified for assessment and implementation across all aforementioned areas.
            </p>
          </div>
        </section>

        {/* Spacer at bottom to allow scrolling past the last element */}
        <div style={{ height: '20vh' }}></div>
      </div>
    </div>
  );
}
