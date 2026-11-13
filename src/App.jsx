import { useState, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Scroll-reveal hook
// ---------------------------------------------------------------------------
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: 0.12, ...options },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// ---------------------------------------------------------------------------
// Project visual components (extracted from data for clean separation)
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

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const projects = [
  {
    number: '01',
    title: 'Food delivery, end to end.',
    description:
      'Built a complete ordering flow spanning customer experience, admin workflows, and backend services to make the process feel seamless and operationally clear.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/ajaykumarn07/mern-food-delivery',
    live: 'https://namma-eats-food-delivery.vercel.app/',
    theme: 'food',
    Visual: FoodArt,
  },
  {
    number: '02',
    title: 'AI, made approachable.',
    description:
      'Designed a focused AI summarization experience that transforms dense source material into concise, readable takeaways with a clean interface.',
    stack: ['React', 'Vite', 'Redux', 'AI'],
    repo: 'https://github.com/ajaykumarn07/ai-summarizer',
    live: 'https://akn-openai-articlesummarizer.netlify.app/',
    theme: 'summarizer',
    Visual: SummaryArt,
  },
  {
    number: '03',
    title: 'Movie discovery, reimagined.',
    description:
      'Created a fast, intuitive movie browsing experience powered by API data so discovery feels frictionless and engaging from the first click.',
    stack: ['React', 'Vite', 'JavaScript', 'API'],
    repo: 'https://github.com/ajaykumarn07/moviex',
    live: 'https://akn-moviex.vercel.app/',
    theme: 'movie',
    Visual: MovieArt,
  },
  {
    number: '04',
    title: 'Weather at a glance.',
    description:
      'Built a clean weather dashboard that brings live conditions and key forecast details together in a focused, usable interface.',
    stack: ['React', 'Vite', 'JavaScript', 'API'],
    repo: 'https://github.com/ajaykumarn07/react-weather-app',
    live: 'https://akn-weather-app.vercel.app/',
    theme: 'weather',
    Visual: WeatherArt,
  },
];

const servicePillars = [
  { title: 'Business workflows', text: 'I design systems that remove friction from real operations, approvals, and day-to-day execution.' },
  { title: '.NET & APIs', text: 'I build dependable backend logic, data layers, and service APIs that hold up under real operational use.' },
  { title: 'React & UX', text: 'I translate business requirements into interfaces that feel clear, useful, and easy to navigate.' },
];

const skills = [
  { category: '01 / INTERFACES', title: 'Frontend', tools: 'React · JavaScript · HTML · CSS · Vite' },
  { category: '02 / APPLICATIONS', title: 'Microsoft stack', tools: 'C# · ASP.NET Core MVC · Web API' },
  { category: '03 / SERVER SIDE', title: 'Backend', tools: 'Node.js · Express · REST APIs' },
  { category: '04 / DATA', title: 'Databases', tools: 'SQL Server 2014 · MongoDB' },
];

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------
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
// Theme hook
// ---------------------------------------------------------------------------
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) {
        meta.setAttribute('content', next === 'dark' ? '#11120f' : '#f4f3ed');
      }
    } catch (e) {}
  };

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (!localStorage.getItem('theme')) {
        const osTheme = e.matches ? 'dark' : 'light';
        setTheme(osTheme);
        document.documentElement.setAttribute('data-theme', osTheme);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) {
          meta.setAttribute('content', osTheme === 'dark' ? '#11120f' : '#f4f3ed');
        }
      }
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

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <a className="wordmark" href="#top" aria-label="Ajay Kumar home" onClick={closeMenu}>AK<span>.</span></a>
      <div className="header-right">
        <nav id="primary-navigation" className={menuOpen ? 'primary-nav nav-open' : 'primary-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Selected work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowIcon /></a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '−' : '+'}</span>
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
        <p className="eyebrow"><span className="status-dot" /> FULL-STACK SOFTWARE DEVELOPER <span className="eyebrow-divider">/</span> INDIA</p>
        <h1>I build dependable<br />software that <span>removes friction</span><i>.</i></h1>
        <div className="hero-bottom">
          <p>From enterprise .NET systems to polished React experiences, I create software that helps teams work faster, clearer, and with less operational drag.</p>
          <div className="hero-links">
            <a className="button button-dark" href="#work">Explore my work <span>↓</span></a>
            <a className="text-link" href="mailto:ajaykumarn0704@gmail.com">Have a project? <ArrowIcon /></a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Key project statistics and strengths">
          <div className="proof-stat">
            <strong>02</strong>
            <span>Major business apps</span>
          </div>
          <div className="proof-stat">
            <strong>15+</strong>
            <span>Public repos</span>
          </div>
          <div className="proof-stat">
            <strong>FULL</strong>
            <span>Stack perspective</span>
          </div>
        </div>
      </div>
      <div className="hero-art" aria-label="Abstract illustration of software systems">
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
      <a className="scroll-cue" href="#work"><span /> SCROLL TO EXPLORE</a>
      <span className="hero-index">PORTFOLIO — 2026</span>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Project Card
// ---------------------------------------------------------------------------
function ProjectCard({ project }) {
  const [ref, inView] = useInView();
  const { Visual } = project;

  return (
    <article ref={ref} className={`project-card ${project.theme} reveal${inView ? ' in-view' : ''}`}>
      <a className="project-visual" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live`}>
        <Visual />
        <span className="visual-index">{project.number} — PROJECT</span>
        <span className="visual-arrow"><ArrowIcon /></span>
      </a>
      <div className="project-info">
        <div className="project-heading"><span className="project-number">{project.number}</span><h3>{project.title}</h3></div>
        <p>{project.description}</p>
        <div className="project-footer">
          <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="project-links">
            <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${project.title}`}>SOURCE <ArrowIcon /></a>
            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo`}>LIVE <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Work
// ---------------------------------------------------------------------------
function Work() {
  const [ref, inView] = useInView();

  return (
    <section className="work section-wrap" id="work">
      <div ref={ref} className={`section-topline reveal${inView ? ' in-view' : ''}`}><span>01 / SELECTED WORK</span><span>PERSONAL PROJECTS · 2023—26</span></div>
      <div className="section-intro reveal in-view">
        <h2>Practical product work<br />with a <span>clear engineering lens.</span></h2>
        <p>Selected projects focused on usable interfaces, business workflows, and the kind of software decisions that make the experience feel effortless for the people using it.</p>
      </div>
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
      <a className="all-projects" href="https://github.com/ajaykumarn07" target="_blank" rel="noopener noreferrer" aria-label="View more experiments on GitHub">MORE EXPERIMENTS ON GITHUB <ArrowIcon /></a>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------
function Experience() {
  const [ref, inView] = useInView();

  return (
    <section className="experience" id="experience">
      <div className="section-wrap experience-inner">
        <div ref={ref} className={`section-topline reveal${inView ? ' in-view' : ''}`}><span>02 / PROFESSIONAL EXPERIENCE</span><span>PRIVATE WORK, PUBLIC IMPACT</span></div>
        <div className="experience-heading">
          <h2>Business-critical systems.<br /><span>Designed for clarity and momentum.</span></h2>
          <p>Two substantial applications built around operational workflows that needed structure, visibility, and dependable execution — while keeping client and organizational details confidential.</p>
        </div>
        <div className="case-list">
          <CaseStudy
            number="01"
            type="LICENSE MANAGEMENT · CONFIDENTIAL"
            heading={<>From license chaos<br />to a clear system.</>}
            description="Built a centralized application for software license generation, renewals, approvals, distribution, and tracking — creating a clearer process for teams managing critical software assets."
            stack={['ASP.NET Core MVC', 'C#', 'Web API', 'SQL Server']}
          />
          <CaseStudy
            number="02"
            type="SERVICE DESK · CONFIDENTIAL"
            heading={<>Every request,<br />moving forward.</>}
            description="Developed a service desk application connecting customer requests to approvals, resolutions, reporting, and material flows — helping work progress consistently from intake to completion."
            stack={['ASP.NET Core MVC', 'C#', 'Web API', 'SQL Server']}
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudy({ number, type, heading, description, stack }) {
  const [ref, inView] = useInView();

  return (
    <article ref={ref} className={`case-study reveal${inView ? ' in-view' : ''}`}>
      <span className="case-number">{number}</span>
      <div className="case-main"><p className="case-type">{type}</p><h3>{heading}</h3></div>
      <div className="case-details"><p>{description}</p><div className="tag-list">{stack.map(t => <span key={t}>{t}</span>)}</div></div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
function About() {
  const [skillRef, skillInView] = useInView();
  const [aboutRef, aboutInView] = useInView();

  return (
    <>
      <section className="capabilities section-wrap">
        <div className="section-topline"><span>03 / HOW I BUILD</span><span>THE RIGHT TOOL FOR THE JOB</span></div>
        <div className="capabilities-heading"><h2>Good work needs<br />the <span>right toolkit.</span></h2><p>Comfortable moving between the browser, the backend, and the data that connects them.</p></div>
        <div className="service-grid">
          {servicePillars.map((pillar) => (
            <article key={pillar.title} className="service-card">
              <span className="service-index">0{servicePillars.indexOf(pillar) + 1}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
        <div ref={skillRef} className={`skill-grid reveal${skillInView ? ' in-view' : ''}`}>
          {skills.map((skill) => <article className="skill-card" key={skill.category}><span>{skill.category}</span><h3>{skill.title}</h3><p>{skill.tools}</p><i aria-hidden="true">↗</i></article>)}
        </div>
      </section>
      <section className="about section-wrap" id="about">
        <div className="section-topline"><span>04 / A LITTLE ABOUT ME</span><span>BUILDER · PROBLEM SOLVER</span></div>
        <div ref={aboutRef} className={`about-layout reveal${aboutInView ? ' in-view' : ''}`}>
          <div className="about-visual"><div className="about-monogram">A<span>K</span></div><span className="about-visual-note">MAKE IT USEFUL.<br />MAKE IT LAST.</span><span className="about-visual-index">AJAY KUMAR N / 2026</span></div>
          <div className="about-copy"><p className="eyebrow">A PRACTICAL KIND OF CREATIVE</p><h2>Thoughtful in the details.<br /><span>Grounded in real-world work.</span></h2><p>I’m a software developer who enjoys turning complexity into clear, dependable systems. My work spans enterprise-grade .NET applications built for business workflows and independent React projects focused on useful user experiences.</p><p>I care about what happens after the demo: clear logic, dependable APIs, good data flow, and interfaces that make sense to the people using them every day.</p><div className="about-stats"><div><b>15+</b><span>PUBLIC REPOSITORIES</span></div><div><b>02</b><span>MAJOR APPLICATIONS</span></div><div><b>FULL</b><span>STACK PERSPECTIVE</span></div></div></div>
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

  return (
    <section className="contact section-wrap" id="contact">
      <div className="section-topline"><span>05 / YOUR TURN</span><span>OPEN TO GOOD CONVERSATIONS</span></div>
      <div ref={ref} className={`contact-main reveal${inView ? ' in-view' : ''}`}><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let’s build<br />something <span>that actually helps.</span></h2><div className="contact-aside"><p>Whether it’s a product idea, a workflow issue, or a full-stack build opportunity, I’m open to thoughtful conversations and practical software work.</p><a className="button button-lime" href="mailto:ajaykumarn0704@gmail.com">Say hello <ArrowIcon /></a></div></div>
      <div className="contact-socials"><a href="mailto:ajaykumarn0704@gmail.com" aria-label="Send me an email">EMAIL <ArrowIcon /></a><a href="https://www.linkedin.com/in/ajaykumarn07/" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">LINKEDIN <ArrowIcon /></a><a href="https://github.com/ajaykumarn07" target="_blank" rel="noopener noreferrer" aria-label="View my GitHub profile">GITHUB <ArrowIcon /></a></div>
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
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <div className="marquee" aria-label="Technologies: C sharp, ASP.NET Core, React, JavaScript, Node.js, SQL Server">
          <div className="marquee-track" aria-hidden="true">{Array.from({ length: 2 }, (_, index) => <span className="marquee-group" key={index}>C# <i>✳</i> ASP.NET CORE <i>✳</i> REACT <i>✳</i> JAVASCRIPT <i>✳</i> NODE.JS <i>✳</i> SQL SERVER <i>✳</i> MONGODB <i>✳</i>&nbsp;</span>)}</div>
        </div>
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
      <footer className="site-footer"><a className="footer-mark" href="#top">AK<span>.</span></a><span>DESIGNED &amp; BUILT WITH INTENTION</span><span>© 2026 AJAY KUMAR N</span><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  );
}

export default App;
