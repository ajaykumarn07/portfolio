import { useState } from 'react';

const projects = [
  {
    number: '01',
    title: 'Food delivery, end to end.',
    description:
      'A full-stack ordering experience with customer, admin, and server applications working together.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/ajaykumarn07/mern-food-delivery',
    live: 'https://mern-food-delivery-frontend.onrender.com',
    theme: 'food',
    visual: (
      <div className="food-art" aria-hidden="true">
        <span className="food-orbit food-orbit-one" />
        <span className="food-orbit food-orbit-two" />
        <span className="food-sun" />
        <span className="food-word">FRESH<br />& FAST</span>
        <span className="food-stamp">ORDER<br />UP ↗</span>
      </div>
    ),
  },
  {
    number: '02',
    title: 'AI, made approachable.',
    description:
      'A clean article summarization experience that turns long-form links into concise takeaways.',
    stack: ['React', 'Vite', 'Redux', 'AI'],
    repo: 'https://github.com/ajaykumarn07/ai-summarizer',
    live: 'https://akn-openai-articlesummarizer.netlify.app/',
    theme: 'summarizer',
    visual: (
      <div className="summary-art" aria-hidden="true">
        <div className="summary-window">
          <div className="summary-window-top"><span /><span /><span /><i>your article, simplified</i></div>
          <div className="summary-copy"><b>THE BIG IDEA</b><span /><span /><span className="short-line" /></div>
          <div className="summary-highlight">less noise.<br /><em>more signal.</em></div>
          <div className="summary-pills"><span>key points</span><span>2 min read</span></div>
        </div>
        <span className="summary-spark">✳</span>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Movie discovery, reimagined.',
    description:
      'An API-powered movie experience built to make browsing titles feel quick and intuitive.',
    stack: ['React', 'Vite', 'JavaScript', 'API'],
    repo: 'https://github.com/ajaykumarn07/moviex',
    live: 'https://akn-moviex.vercel.app/',
    theme: 'movie',
    visual: (
      <div className="movie-art" aria-hidden="true">
        <div className="movie-poster poster-one"><span>AFTER<br />HOURS</span><i>01 / 24</i></div>
        <div className="movie-poster poster-two"><span>THE<br />UNKNOWN</span><i>02 / 24</i></div>
        <div className="movie-poster poster-three"><span>BLUE<br />PLANET</span><i>03 / 24</i></div>
        <div className="movie-caption">FIND YOUR<br />NEXT FAVORITE <b>↗</b></div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Weather at a glance.',
    description:
      'A focused weather application that brings live conditions and essential forecast details together.',
    stack: ['React', 'Vite', 'JavaScript', 'API'],
    repo: 'https://github.com/ajaykumarn07/react-weather-app',
    live: 'https://akn-weather-app.vercel.app/',
    theme: 'weather',
    visual: (
      <div className="weather-art" aria-hidden="true">
        <div className="weather-sun" />
        <div className="weather-cloud weather-cloud-one" />
        <div className="weather-cloud weather-cloud-two" />
        <div className="weather-reading"><b>27°</b><span>MONSOON, IN</span><i>PARTLY CLOUDY</i></div>
        <span className="weather-cross cross-one">+</span><span className="weather-cross cross-two">+</span>
      </div>
    ),
  },
];

const skills = [
  { category: '01 / INTERFACES', title: 'Frontend', tools: 'React · JavaScript · HTML · CSS · Vite' },
  { category: '02 / APPLICATIONS', title: 'Microsoft stack', tools: 'C# · ASP.NET Core MVC · Web API' },
  { category: '03 / SERVER SIDE', title: 'Backend', tools: 'Node.js · Express · REST APIs' },
  { category: '04 / DATA', title: 'Databases', tools: 'SQL Server 2014 · MongoDB' },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Ajay Kumar home" onClick={closeMenu}>AK<span>.</span></a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '−' : '+'}</span>
      </button>
      <nav id="primary-navigation" className={menuOpen ? 'primary-nav nav-open' : 'primary-nav'} aria-label="Primary navigation">
        <a href="#work" onClick={closeMenu}>Selected work</a>
        <a href="#experience" onClick={closeMenu}>Experience</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s talk <ArrowIcon /></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <p className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPER <span className="eyebrow-divider">/</span> INDIA</p>
        <h1>I make software<br />that <span>moves things</span><i>.</i></h1>
        <div className="hero-bottom">
          <p>From reliable .NET applications to considered React interfaces — I turn complex requirements into products people can actually use.</p>
          <div className="hero-links">
            <a className="button button-dark" href="#work">Explore my work <span>↓</span></a>
            <a className="text-link" href="mailto:ajaykumarn0704@gmail.com">Have a project? <ArrowIcon /></a>
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

function ProjectCard({ project }) {
  return (
    <article className={`project-card ${project.theme}`}>
      <a className="project-visual" href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live`}>
        {project.visual}
        <span className="visual-index">{project.number} — PROJECT</span>
        <span className="visual-arrow"><ArrowIcon /></span>
      </a>
      <div className="project-info">
        <div className="project-heading"><span className="project-number">{project.number}</span><h3>{project.title}</h3></div>
        <p>{project.description}</p>
        <div className="project-footer">
          <div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="project-links">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">SOURCE <ArrowIcon /></a>
            <a href={project.live} target="_blank" rel="noopener noreferrer">LIVE <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="work section-wrap" id="work">
      <div className="section-topline"><span>01 / SELECTED WORK</span><span>PERSONAL PROJECTS · 2023—26</span></div>
      <div className="section-intro">
        <h2>A few things<br />I’ve <span>put into the world.</span></h2>
        <p>Curious by nature. Practical by design. Here’s a selection of projects exploring full-stack products, useful AI, and thoughtful interfaces.</p>
      </div>
      <div className="project-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
      <a className="all-projects" href="https://github.com/ajaykumarn07" target="_blank" rel="noopener noreferrer">MORE EXPERIMENTS ON GITHUB <ArrowIcon /></a>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="section-wrap experience-inner">
        <div className="section-topline"><span>02 / PROFESSIONAL EXPERIENCE</span><span>PRIVATE WORK, PUBLIC IMPACT</span></div>
        <div className="experience-heading">
          <h2>Serious systems.<br /><span>Real-world stakes.</span></h2>
          <p>Two substantial applications built around the kind of work that keeps businesses moving. Client and organization details are kept confidential.</p>
        </div>
        <div className="case-list">
          <article className="case-study">
            <span className="case-number">01</span>
            <div className="case-main"><p className="case-type">LICENSE MANAGEMENT · CONFIDENTIAL</p><h3>From license chaos<br />to a clear system.</h3></div>
            <div className="case-details"><p>Built a centralized application for software license generation, renewals, approvals, distribution, and tracking — bringing visibility and structure to a complex operational workflow.</p><div className="tag-list"><span>ASP.NET Core MVC</span><span>C#</span><span>Web API</span><span>SQL Server</span></div></div>
          </article>
          <article className="case-study">
            <span className="case-number">02</span>
            <div className="case-main"><p className="case-type">SERVICE DESK · CONFIDENTIAL</p><h3>Every request,<br />moving forward.</h3></div>
            <div className="case-details"><p>Developed a service desk application connecting customer requests to approvals, resolutions, reporting, and material requests — supporting each step through to completion.</p><div className="tag-list"><span>ASP.NET Core MVC</span><span>C#</span><span>Web API</span><span>SQL Server</span></div></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <section className="capabilities section-wrap">
        <div className="section-topline"><span>03 / HOW I BUILD</span><span>THE RIGHT TOOL FOR THE JOB</span></div>
        <div className="capabilities-heading"><h2>Good work needs<br />the <span>right toolkit.</span></h2><p>Comfortable moving between the browser, the backend, and the data that connects them.</p></div>
        <div className="skill-grid">
          {skills.map((skill) => <article className="skill-card" key={skill.category}><span>{skill.category}</span><h3>{skill.title}</h3><p>{skill.tools}</p><i>↗</i></article>)}
        </div>
      </section>
      <section className="about section-wrap" id="about">
        <div className="section-topline"><span>04 / A LITTLE ABOUT ME</span><span>BUILDER · PROBLEM SOLVER</span></div>
        <div className="about-layout">
          <div className="about-visual"><div className="about-monogram">A<span>K</span></div><span className="about-visual-note">MAKE IT USEFUL.<br />MAKE IT LAST.</span><span className="about-visual-index">AJAY KUMAR N / 2026</span></div>
          <div className="about-copy"><p className="eyebrow">A PRACTICAL KIND OF CREATIVE</p><h2>Thoughtful in the details.<br /><span>Grounded in the real world.</span></h2><p>I’m a software developer who enjoys making complex systems feel simple. My work spans professional .NET applications built for real business workflows and independent React projects made to learn, explore, and ship.</p><p>I care about what happens after the demo: clear workflows, dependable APIs, and interfaces that make sense to the people using them.</p><div className="about-stats"><div><b>15+</b><span>PUBLIC REPOSITORIES</span></div><div><b>02</b><span>MAJOR APPLICATIONS</span></div><div><b>FULL</b><span>STACK PERSPECTIVE</span></div></div></div>
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <section className="contact section-wrap" id="contact">
      <div className="section-topline"><span>05 / YOUR TURN</span><span>OPEN TO GOOD CONVERSATIONS</span></div>
      <div className="contact-main"><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let’s make<br />something <span>matter.</span></h2><div className="contact-aside"><p>A project, an opportunity, or just a good conversation about software — my inbox is open.</p><a className="button button-lime" href="mailto:ajaykumarn0704@gmail.com">Say hello <ArrowIcon /></a></div></div>
      <div className="contact-socials"><a href="mailto:ajaykumarn0704@gmail.com">EMAIL <ArrowIcon /></a><a href="https://www.linkedin.com/in/ajaykumarn/" target="_blank" rel="noopener noreferrer">LINKEDIN <ArrowIcon /></a><a href="https://github.com/ajaykumarn07" target="_blank" rel="noopener noreferrer">GITHUB <ArrowIcon /></a></div>
    </section>
  );
}

function App() {
  return (
    <>
      <Header />
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
      <footer className="site-footer"><a className="footer-mark" href="#top">AK<span>.</span></a><span>DESIGNED & BUILT WITH INTENTION</span><span>© 2026 AJAY KUMAR N</span><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  );
}

export default App;
