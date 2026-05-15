import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, NavLink } from 'react-router-dom';
import logoSrc from '../../assets/logo.avif';
import {
  ChevronDown,
  ArrowRight,
  X,
  Droplets,
  Wheat,
  Star,
  FlaskConical,
  Send
} from 'lucide-react';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Menu Configuration ───────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'about',
    label: 'About Us',
    href: '/about',
  },
  { id: 'projects', label: 'Projects', href: '/projects' },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    submenu: [
      {
        id: 'coconut-sugar',
        label: 'Coconut Sugar',
        desc: 'Natural low-GI sweetener, HALAL certified',
        icon: Droplets,
        href: '/products',
      },
      {
        id: 'dal',
        label: 'Dal / Pulses',
        desc: 'Premium staple legumes for food sectors',
        icon: Wheat,
        href: '/products',
      },
      {
        id: 'food-starch',
        label: 'A-Grade Food Starch',
        desc: 'ISO 22000 & FSSC 22000 certified',
        icon: Star,
        href: '/products',
      },
      {
        id: 'modified-starch',
        label: 'Modified Starch',
        desc: '8,000-ton capacity industrial derivatives',
        icon: FlaskConical,
        href: '/products',
      },
    ],
  },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

// ─── Mega Menu Panel ──────────────────────────────────────────────────
function MegaMenu({ item, isOpen, onClose }) {
  const backdropRef  = useRef(null);
  const panelRef     = useRef(null);
  const cardsRef     = useRef([]);
  const tlRef        = useRef(null);

  useEffect(() => {
    if (!item?.submenu) return;

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

      tlRef.current
        .to(backdropRef.current, { opacity: 1, duration: 0.3 })
        .to(panelRef.current,    { y: '0%',   duration: 0.55, ease: 'power4.out' }, '<0.05')
        .to(cardsRef.current,    {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: 'power3.out',
        }, '-=0.25');
    });

    return () => ctx.revert();
  }, [item]);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  if (!item?.submenu) return null;

  return (
    <div
      className={`mega-menu ${isOpen ? 'mega-menu--open' : ''}`}
      role="dialog"
      aria-label={`${item.label} submenu`}
    >
      <div
        className="mega-menu__backdrop"
        ref={backdropRef}
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="mega-menu__panel" ref={panelRef}>
        <div className="mega-menu__content">
          <div className="mega-menu__header">
            <p className="mega-menu__category">Explore</p>
            <h2 className="mega-menu__title">{item.label}</h2>
          </div>
          <div className="mega-menu__grid">
            {item.submenu.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <Link
                  key={sub.id}
                  to={sub.href}
                  className="mega-card"
                  ref={el => (cardsRef.current[i] = el)}
                  onClick={onClose}
                  aria-label={sub.label}
                >
                  <div className="mega-card__icon">
                    <Icon />
                  </div>
                  <div className="mega-card__body">
                    <p className="mega-card__name">{sub.label}</p>
                    <p className="mega-card__desc">{sub.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Submenu Accordion ─────────────────────────────────────────
function MobileSubmenu({ submenu, isOpen }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    if (isOpen) {
      gsap.to(el, {
        height: el.scrollHeight,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      gsap.to(el, {
        height: 0,
        duration: 0.3,
        ease: 'power3.in',
      });
    }
  }, [isOpen]);

  return (
    <div className="mobile-submenu" ref={ref} aria-hidden={!isOpen}>
      <div className="mobile-submenu__inner">
        {submenu.map(sub => {
          const Icon = sub.icon;
          return (
            <a
              key={sub.id}
              href={sub.href}
              className="mobile-submenu__item"
              aria-label={sub.label}
            >
              <Icon />
              {sub.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Mobile Menu Drawer ───────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }) {
  const [openSub, setOpenSub] = useState(null);
  const drawerRef   = useRef(null);
  const backdropRef = useRef(null);
  const itemsRef    = useRef([]);

  const toggleSub = useCallback(id => {
    setOpenSub(prev => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    if (!drawerRef.current) return;

    if (isOpen) {
      gsap.set(drawerRef.current, { x: '100%' });
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(drawerRef.current,   { x: '0%',  duration: 0.5,  ease: 'power4.out' });
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.to(drawerRef.current,   { x: '100%', duration: 0.4, ease: 'power4.in' });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in', delay: 0.1 });
    }
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    const handle = e => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [isOpen, onClose]);

  return (
    <div
      className={`mobile-menu ${isOpen ? 'mobile-menu--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div
        className="mobile-menu__backdrop"
        ref={backdropRef}
        onClick={onClose}
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div className="mobile-menu__drawer" ref={drawerRef}>
        {/* Top bar — logo + close */}
        <div className="mobile-menu__top">
          <Link to="/" onClick={onClose} className="mobile-menu__logo-wrap">
            <div className="mobile-menu__logo-pill">
              <img src={logoSrc} alt="Birmingham Industries" />
            </div>
          </Link>
          <button
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mobile-menu__nav">
          {NAV_ITEMS.map((item, i) => (
            <div
              key={item.id}
              className="mobile-nav-item"
              ref={el => (itemsRef.current[i] = el)}
            >
              {item.submenu ? (
                <>
                  <button
                    className={`mobile-nav-item__btn ${openSub === item.id ? 'mobile-nav-item__btn--active' : ''}`}
                    onClick={() => toggleSub(item.id)}
                    aria-expanded={openSub === item.id}
                  >
                    <span className="mobile-nav-item__left">
                      <span className="mobile-nav-item__dot" aria-hidden="true" />
                      {item.label}
                    </span>
                    <ChevronDown
                      className={`mobile-nav-item__chevron ${openSub === item.id ? 'mobile-nav-item__chevron--open' : ''}`}
                      size={14}
                    />
                  </button>
                  <MobileSubmenu
                    submenu={item.submenu}
                    isOpen={openSub === item.id}
                  />
                </>
              ) : (
                <Link
                  to={item.href}
                  className="mobile-nav-item__btn"
                  onClick={onClose}
                >
                  <span className="mobile-nav-item__left">
                    <span className="mobile-nav-item__dot" aria-hidden="true" />
                    {item.label}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="mobile-menu__footer">
          <button className="mobile-menu__cta" onClick={onClose} aria-label="Get in touch">
            <Send size={14} />
            Get in Touch
          </button>
          <div className="mobile-menu__regions">
            <span className="mobile-menu__region-tag">🇬🇧 UK</span>
            <span className="mobile-menu__region-tag">🇮🇳 India</span>
            <span className="mobile-menu__region-tag">🇪🇺 Europe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Navbar Component ────────────────────────────────────────────
export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [activeMega,   setActiveMega]   = useState(null);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const navbarRef = useRef(null);

  // ── Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.3 }
    );
  }, []);

  // ── Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeAll = useCallback(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, []);

  const handleNavClick = useCallback((itemId) => {
    setActiveMega(prev => (prev === itemId ? null : itemId));
  }, []);

  const currentMegaItem = NAV_ITEMS.find(item => item.id === activeMega);

  return (
    <>
      <header
        ref={navbarRef}
        className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`}
        role="banner"
      >
        <div className="navbar__line" aria-hidden="true" />
        <div className="navbar__inner">

          {/* ── Logo */}
          <Link to="/" className="navbar__logo" aria-label="Birmingham Industries Home">
            <div className="navbar__logo-icon">
              <img src={logoSrc} alt="Birmingham Industries" />
            </div>
          </Link>

          {/* ── Desktop nav */}
          <nav className="navbar__nav" role="navigation" aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              <div
                key={item.id}
                className={`nav-item ${activeMega === item.id ? 'nav-item--open' : ''}`}
              >
                {item.submenu ? (
                  <button
                    className={`nav-item__link ${activeMega === item.id ? 'nav-item__link--active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    aria-expanded={activeMega === item.id}
                    aria-haspopup="true"
                    id={`nav-${item.id}`}
                  >
                    {item.label}
                    <ChevronDown className="nav-item__chevron" />
                  </button>
                ) : (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => `nav-item__link ${isActive ? 'nav-item__link--active' : ''}`}
                    onClick={closeAll}
                    id={`nav-${item.id}`}
                  >
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}
          </nav>

          {/* ── CTA */}
          <div className="navbar__cta">
            <Link to="/contact" className="btn-enquire" onClick={closeAll} id="nav-enquire-btn">
              <Send size={14} />
              Enquire Now
            </Link>

            {/* ── Hamburger */}
            <button
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              id="nav-hamburger-btn"
            >
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mega Menu */}
      <MegaMenu
        item={currentMegaItem}
        isOpen={!!activeMega}
        onClose={() => setActiveMega(null)}
      />

      {/* ── Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
