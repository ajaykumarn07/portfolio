import { Fragment, useState, useEffect, useRef } from 'react';
import {
  profile,
  stats,
  hero,
  projects,
  work,
  experience,
  toolkit,
  about,
  contact,
} from './content.js';

// ---------------------------------------------------------------------------
// Scroll-reveal hook: fires once when the element enters the viewport.
// Falls back to "visible" where IntersectionObserver is unavailable, so
// content is never stuck hidden.
// ---------------------------------------------------------------------------
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  // Without IntersectionObserver there is nothing to wait for: start visible.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

// Plain lines separated by <br />.
function Lines({ lines }) {
  return lines.map((line, i) => (
    <Fragment key={line}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

// Heading where every line but the last is solid and the last is the muted
// accent span.
function AccentHeading({ lines, id }) {
  const lead = lines.slice(0, -1);
  const accent = lines[lines.length - 1];
  return (
    <h2 id={id}>
      <Lines lines={lead} />
      <br />
      <span>{accent}</span>
    </h2>
  );
}

function Topline({ labels, reveal = false }) {
  const [ref, inView] = useInView();
  const className = reveal ? `section-topline reveal${inView ? ' in-view' : ''}` : 'section-topline';
  return (
    <div ref={reveal ? ref : undefined} className={className}>
      <span>{labels[0]}</span>
      <span>{labels[1]}</span>
    </div>
  );
}

// Dashed "fill this in" marker. Only exists in `npm run dev`; the production
// build renders nothing for unfilled fields.
function FillIn({ children }) {
  if (!import.meta.env.DEV) return null;
  return <p className="fill-in">TODO: {children}</p>;
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Project illustrations (decorative)
// ---------------------------------------------------------------------------
function FoodArt() {
  return (
    <div className="food-art" aria-hidden="true">
      <span className="food-orbit food-orbit-one" />
      <span className="food-orbit food-orbit-two" />
      <span className="food-sun" />
      <span className="food-word">FRESH<br />& FAST</span>
      <span className="food-stamp">ORDER<br />UP ↗</span>
    </div>
  );
}

function SummaryArt() {
  return (
    <div className="summary-art" aria-hidden="true">
      <div className="summary-window">
        <div className="summary-window-top"><span /><span /><span /><i>your article, simplified</i></div>
        <div className="summary-copy"><b>THE BIG IDEA</b><span /><span /><span className="short-line" /></div>
        <div className="summary-highlight">less noise.<br /><em>more signal.</em></div>
        <div className="summary-pills"><span>key points</span><span>2 min read</span></div>
      </div>
      <span className="summary-spark">✳</span>
    </div>
  );
}

function MovieArt() {
  return (
    <div className="movie-art" aria-hidden="true">
      <div className="movie-poster poster-one"><span>AFTER<br />HOURS</span><i>01 / 24</i></div>
      <div className="movie-poster poster-two"><span>THE<br />UNKNOWN</span><i>02 / 24</i></div>
      <div className="movie-poster poster-three"><span>BLUE<br />PLANET</span><i>03 / 24</i></div>
      <div className="movie-caption">FIND YOUR<br />NEXT FAVORITE <b>↗</b></div>
    </div>
  );
}

function WeatherArt() {
  return (
    <div className="weather-art" aria-hidden="true">
      <div className="weather-sun" />
      <div className="weather-cloud weather-cloud-one" />
      <div className="weather-cloud weather-cloud-two" />
      <div className="weather-reading"><b>27°</b><span>MONSOON, IN</span><i>PARTLY CLOUDY</i></div>
      <span className="weather-cross cross-one">+</span><span className="weather-cross cross-two">+</span>
    </div>
  );
}

const VISUALS = {
  food: FoodArt,
  summarizer: SummaryArt,
  movie: MovieArt,
  weather: WeatherArt,
};

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------
const THEME_COLOR = { dark: '#11120f', light: '#f4f3ed' };

function readStoredTheme() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
}

function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light',
  );

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  };

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (readStoredTheme()) return; // an explicit choice beats the OS setting
      const next = e.matches ? 'dark' : 'light';
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return [theme, toggleTheme];
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
function Header({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const themeLabel = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <a className="wordmark" href="#top" aria-label={`${profile.name}, home`} onClick={closeMenu}>AK<span>.</span></a>
      <div className="header-right">
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav nav-open' : 'primary-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowIcon /></a>
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={themeLabel} title={themeLabel}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '−' : '+'}</span>
        </button>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true" />
          {profile.role.toUpperCase()} <span className="eyebrow-divider" aria-hidden="true">/</span> {profile.location.toUpperCase()}
        </p>
        <h1>I build dependable<br />software that <span>removes friction</span><i>.</i></h1>
        <div className="hero-bottom">
          <p>{hero.lead}</p>
          <div className="hero-links">
            <a className="button button-dark" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
            <a className="text-link" href={`mailto:${profile.email}`}>Have a project? <ArrowIcon /></a>
            {profile.resumeUrl && (
              <a className="text-link" href={profile.resumeUrl} download>Résumé (PDF) <ArrowIcon /></a>
            )}
          </div>
        </div>
        <div className="hero-proof" role="group" aria-label="Key facts">
          {stats.map((stat) => (
            <div className="proof-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-art" role="img" aria-label="Abstract illustration of orbiting circles around the initials AK">
        <div className="hero-art-grid" />
        <div className="orbit orbit-outer" />
        <div className="orbit orbit-inner" />
        <div className="orbit orbit-core"><span>AK</span><i>ENGINEER<br />& BUILDER</i></div>
        <span className="hero-coordinate coordinate-one">12° 58'  N</span>
        <span className="hero-coordinate coordinate-two">77° 35'  E</span>
        <span className="orbit-label label-one">THOUGHTFUL BY DESIGN</span>
        <span className="orbit-label label-two">BUILT TO WORK</span>
        <span className="hero-plus plus-one">+</span>
        <span className="hero-plus plus-two">+</span>
      </div>
      <a className="scroll-cue" href="#work"><span aria-hidden="true" /> SCROLL TO EXPLORE</a>
      <span className="hero-index" aria-hidden="true">PORTFOLIO — 2026</span>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------
function ProjectCard({ project }) {
  const [ref, inView] = useInView();
  const Visual = VISUALS[project.theme];

  return (
    <article ref={ref} className={`project-card ${project.theme} reveal${inView ? ' in-view' : ''}`}>
      <a className="project-visual" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: open live demo`}>
        <Visual />
        <span className="visual-index" aria-hidden="true">{project.number} — PROJECT</span>
        <span className="visual-arrow" aria-hidden="true">↗</span>
      </a>
      <div className="project-info">
        <div className="project-heading"><span className="project-number">{project.number}</span><h3>{project.title}</h3></div>
        <p>{project.description}</p>
        <div className="project-footer">
          <ul className="tag-list" aria-label="Technologies used">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="project-links">
            <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: view source code`}>SOURCE <ArrowIcon /></a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: open live demo`}>LIVE <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work section-wrap" id="work" aria-labelledby="work-heading">
      <Topline labels={work.topline} reveal />
      <div className="section-intro reveal in-view">
        <AccentHeading id="work-heading" lines={work.heading} />
        <p>{work.intro}</p>
      </div>
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
      <a className="all-projects" href={profile.github} target="_blank" rel="noopener noreferrer">MORE ON GITHUB <ArrowIcon /></a>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
function CaseStudy({ item }) {
  const [ref, inView] = useInView();
  const meta = [item.role, item.responsibility].filter(Boolean).join(' · ');

  return (
    <article ref={ref} className={`case-study reveal${inView ? ' in-view' : ''}`}>
      <span className="case-number" aria-hidden="true">{item.number}</span>
      <div className="case-main">
        <p className="case-type">{item.type} · CONFIDENTIAL</p>
        <h3><Lines lines={item.heading} /></h3>
        {meta ? <p className="case-meta">{meta}</p> : <FillIn>role and period for “{item.type}” (src/content.js)</FillIn>}
      </div>
      <div className="case-details">
        <p>{item.description}</p>
        {item.outcome ? <p className="case-outcome">{item.outcome}</p> : <FillIn>one measurable outcome for “{item.type}”</FillIn>}
        <ul className="tag-list" aria-label="Technologies used">{item.stack.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
    </article>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-heading">
      <div className="section-wrap experience-inner">
        <Topline labels={experience.topline} reveal />
        <div className="experience-heading">
          <AccentHeading id="experience-heading" lines={experience.heading} />
          <p>{experience.intro}</p>
        </div>
        <div className="case-list">
          {experience.items.map((item) => <CaseStudy key={item.number} item={item} />)}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Toolkit and About
// ---------------------------------------------------------------------------
function About() {
  const [skillRef, skillInView] = useInView();
  const [aboutRef, aboutInView] = useInView();

  return (
    <>
      <section className="capabilities section-wrap" aria-labelledby="toolkit-heading">
        <Topline labels={toolkit.topline} />
        <div className="capabilities-heading">
          <AccentHeading id="toolkit-heading" lines={toolkit.heading} />
          <p>{toolkit.intro}</p>
        </div>
        <div className="service-grid">
          {toolkit.pillars.map((pillar, index) => (
            <article key={pillar.title} className="service-card">
              <span className="service-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
        <div ref={skillRef} className={`skill-grid reveal${skillInView ? ' in-view' : ''}`}>
          {toolkit.skills.map((skill) => (
            <article className="skill-card" key={skill.category}>
              <span>{skill.category}</span>
              <h3>{skill.title}</h3>
              <p>{skill.tools}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>
      <section className="about section-wrap" id="about" aria-labelledby="about-heading">
        <Topline labels={about.topline} />
        <div ref={aboutRef} className={`about-layout reveal${aboutInView ? ' in-view' : ''}`}>
          <div className="about-visual" aria-hidden="true">
            <div className="about-monogram">A<span>K</span></div>
            <span className="about-visual-note">MAKE IT USEFUL.<br />MAKE IT LAST.</span>
            <span className="about-visual-index">AJAY KUMAR N / 2026</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <AccentHeading id="about-heading" lines={about.heading} />
            {about.paragraphs.map((text) => <p key={text}>{text}</p>)}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
function Contact() {
  const [ref, inView] = useInView();
  const [lead, plain, accent] = contact.heading;

  return (
    <section className="contact section-wrap" id="contact" aria-labelledby="contact-heading">
      <Topline labels={contact.topline} />
      <div ref={ref} className={`contact-main reveal${inView ? ' in-view' : ''}`}>
        <p className="eyebrow">{contact.eyebrow}</p>
        <h2 id="contact-heading">{lead}<br />{plain} <span>{accent}</span></h2>
        <div className="contact-aside">
          <p>{contact.text}</p>
          <a className="button button-lime" href={`mailto:${profile.email}`}>Say hello <ArrowIcon /></a>
        </div>
      </div>
      <div className="contact-socials">
        <a href={`mailto:${profile.email}`} aria-label="Send me an email">EMAIL <ArrowIcon /></a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">LINKEDIN <ArrowIcon /></a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="View my GitHub profile">GITHUB <ArrowIcon /></a>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: 2 }, (_, index) => (
              <span className="marquee-group" key={index}>
                C# <i>✳</i> ASP.NET CORE <i>✳</i> REACT <i>✳</i> JAVASCRIPT <i>✳</i> NODE.JS <i>✳</i> SQL SERVER <i>✳</i> MONGODB <i>✳</i>&nbsp;
              </span>
            ))}
          </div>
        </div>
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="site-footer">
        <a className="footer-mark" href="#top" aria-label="Back to top">AK<span>.</span></a>
        <span>DESIGNED &amp; BUILT BY {profile.name.toUpperCase()}</span>
        <span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  );
}

export default App;
