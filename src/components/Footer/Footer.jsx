import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone } from 'lucide-react';
import logo from '../../assets/logo.avif';
import waLogo from '../../assets/wa-logo.PNG';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

// Inline SVGs for brand icons
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const footerRef = useRef(null);
  const stampRef = useRef(null);
  const mapWrapRef = useRef(null);
  const elementsRef = useRef([]);

  const addRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      // 1. 3D Staggered Content Reveal
      gsap.set(elementsRef.current, { 
        y: 80, 
        opacity: 0, 
        rotateX: -40,
        transformOrigin: '50% 0%'
      });

      tl.to(elementsRef.current, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'back.out(1.2)'
      });

      // 2. Cinematic Foreground Logo Stamp
      gsap.set(stampRef.current, { 
        scale: 4, 
        opacity: 0, 
        rotateZ: -15, 
        filter: 'blur(8px)',
        y: -100
      });
      
      tl.to(stampRef.current, {
        scale: 1,
        opacity: 1,
        rotateZ: 0,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.7,
        ease: 'bounce.out', // Real stamp bounce impact
      }, "-=0.6");

      // 3. 3D Real Map Entrance & Subtle Float
      gsap.set(mapWrapRef.current, { rotateX: 20, scale: 0.9, opacity: 0 });
      tl.to(mapWrapRef.current, {
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }, "-=0.5");

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer__container">
        
        {/* LOGO STAMP ROW */}
        <div className="footer__logo-row" ref={addRef}>
          <div className="footer__stamp-container">
            <img ref={stampRef} src={logo} alt="Birmingham Industries Logo" className="footer__foreground-stamp" />
          </div>
          <p className="footer__tagline">Global Export Excellence & Manufacturing Success</p>
        </div>

        {/* CONTENT GRID */}
        <div className="footer__grid">
          
          {/* Col 1: Links & Enquiries */}
          <div className="footer__col" ref={addRef}>
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>

            <h3 className="footer__heading footer__heading--margin">Enquiries</h3>
            <ul className="footer__contact-info">
              <li>
                <Mail size={16} />
                <a href="mailto:sales@birmindus.com">sales@birmindus.com</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+4407833228893">+44 (0)783 3228 893</a>
              </li>
            </ul>
          </div>

          {/* Col 2: Global Offices */}
          <div className="footer__col footer__col--wide" ref={addRef}>
            <h3 className="footer__heading">Global Offices</h3>
            <div className="footer__offices-grid">
              
              <div className="footer__office">
                <h4>UK - Birmingham <span className="highlight">(Global HQ)</span></h4>
                <p>27 Middlepark Drive, Northfield,<br />Birmingham, United Kingdom<br />B31 2FL</p>
              </div>

              <div className="footer__office">
                <h4>India - Chennai <span className="highlight">(Administrative Office)</span></h4>
                <p>9, Fifth Cross Street, United India Colony, Kodambakkam, Chennai,<br />Tamil Nadu, India - 600024</p>
              </div>

              <div className="footer__office">
                <h4>India - Chennai <span className="highlight">(Branch Office)</span></h4>
                <p>10/11, Lynwood Avenue, Mahalingapuram, Nungambakkam, Chennai,<br />Tamil Nadu, India - 600034</p>
              </div>

              <div className="footer__office">
                <h4>Portugal - Porto <span className="highlight">(Administrative Office)</span></h4>
                <p>2 ESQFR ,784, Rua Sa Da Bandeira,<br />Santo Ildefonso, Porto - 4000029</p>
              </div>

            </div>
          </div>

          {/* Col 3: Real Google Map */}
          <div className="footer__col footer__col--map" ref={addRef}>
            <h3 className="footer__heading">Our HQ Location</h3>
            <div className="footer__real-map-wrap" ref={mapWrapRef}>
              <iframe 
                src="https://maps.google.com/maps?q=27%20Middlepark%20Drive,%20Northfield,%20Birmingham&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
              <a 
                href="https://maps.app.goo.gl/23pvw2ufFpSYwpBu7" 
                target="_blank" 
                rel="noreferrer"
                className="footer__map-overlay-link"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Social & Copyright */}
        <div className="footer__bottom" ref={addRef}>
          <div className="footer__socials">
            <a href="https://www.mvmmangadu.in/#" target="_blank" rel="noreferrer" className="footer__social-link facebook" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.mvmmangadu.in/#" target="_blank" rel="noreferrer" className="footer__social-link twitter" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://www.mvmmangadu.in/#" target="_blank" rel="noreferrer" className="footer__social-link linkedin" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="https://www.mvmmangadu.in/#" target="_blank" rel="noreferrer" className="footer__social-link website" aria-label="Website">
              <Globe size={20} />
            </a>
          </div>
          
          <div className="footer__copyright">
            &copy; {new Date().getFullYear()} Birmingham Industries. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
