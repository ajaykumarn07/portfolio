// ---------------------------------------------------------------------------
// All site copy lives here. App.jsx only decides how it is drawn.
//
// Any value set to `null` is a fact only you can supply. In production an
// unfilled field is simply not rendered (nothing placeholder-like can ship);
// in `npm run dev` it shows up as a dashed TODO box so you can see where it
// goes. Run `npm run check:content` to list everything still empty.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Ajay Kumar N',
  role: 'Full-stack software developer',
  location: 'India',
  email: 'ajaykumarn0704@gmail.com',
  github: 'https://github.com/ajaykumarn07',
  linkedin: 'https://www.linkedin.com/in/ajaykumarn07/',
  siteUrl: 'https://ajaykumarn-portfolio.vercel.app/',

  // TODO: put your CV in /public (for example public/Ajay-Kumar-N-Resume.pdf)
  // and set this to '/Ajay-Kumar-N-Resume.pdf'. A "Résumé" link then appears
  // in the hero.
  resumeUrl: null,

  // TODO: whole years of professional experience, for example 2. Adds a third
  // stat to the hero.
  yearsExperience:4,
};

// Hero stats. "Public repos" is your own claim: confirm it is still true.
export const stats = [
  { value: '02', label: 'Business apps built' },
  { value: '15+', label: 'Public repos' },
  profile.yearsExperience
    ? { value: `${profile.yearsExperience}+`, label: 'Years building software' }
    : null,
].filter(Boolean);

export const hero = {
  lead:
    'From enterprise .NET systems to polished React experiences, I create software that helps teams work faster, clearer, and with less operational drag.',
};

// `theme` picks the illustration in App.jsx. Descriptions state only what the
// code shows. The Namma Eats one was checked against the repository.
export const projects = [
  {
    number: '01',
    theme: 'food',
    title: 'Namma Eats: food delivery',
    description:
      'Customer storefront, admin panel and REST API for a food-ordering site. JWT login, prices calculated on the server, Stripe Checkout with payment verification, and admin-only menu management with validated image uploads.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    repo: 'https://github.com/ajaykumarn07/namma-eats-food-delivery',
    live: 'https://namma-eats-food-delivery.vercel.app/',
  },
  {
    number: '02',
    theme: 'summarizer',
    title: 'AI article summarizer',
    description:
      'React and Redux app that turns long articles into short summaries using an AI API.',
    stack: ['React', 'Vite', 'Redux', 'AI API'],
    repo: 'https://github.com/ajaykumarn07/ai-summarizer',
    live: 'https://akn-openai-articlesummarizer.netlify.app/',
  },
  {
    number: '03',
    theme: 'movie',
    title: 'MovieX: movie discovery',
    description: 'React app for browsing movies, built on a public movie API.',
    stack: ['React', 'Vite', 'JavaScript', 'REST API'],
    repo: 'https://github.com/ajaykumarn07/moviex',
    live: 'https://akn-moviex.vercel.app/',
  },
  {
    number: '04',
    theme: 'weather',
    title: 'Weather dashboard',
    description:
      'React dashboard showing live conditions and forecast details from a weather API.',
    stack: ['React', 'Vite', 'JavaScript', 'REST API'],
    repo: 'https://github.com/ajaykumarn07/react-weather-app',
    live: 'https://akn-weather-app.vercel.app/',
  },
];

export const work = {
  topline: ['01 / SELECTED WORK', 'PERSONAL PROJECTS · 2023—26'],
  heading: ['Projects I built', 'and put online.'],
  intro:
    'Four public projects. One is a full ordering system with a customer app, an admin panel and an API. The others are smaller React apps built on third-party APIs.',
};

// Employer and client names stay private. Fill in role, period and outcome so
// a reader can place the work: what you did, when, and what changed.
export const experience = {
  topline: ['02 / PROFESSIONAL EXPERIENCE', 'CLIENT DETAILS CONFIDENTIAL'],
  // Non-breaking space keeps "ASP.NET Core" together when the line wraps.
  heading: ['Two internal apps,', 'built with ASP.NET Core.'],
  intro:
    'Two business applications. Employer and client details are confidential, so they are described by what they do.',
  items: [
    {
      number: '01',
      type: 'LICENSE MANAGEMENT',
      heading: ['From license chaos', 'to a clear system.'],
      description:
        'Centralized application for software license generation, renewals, approvals, distribution and tracking.',
      stack: ['ASP.NET Core MVC', 'C#', 'Web API', 'SQL Server'],
      role: 'Software Developer',
      responsibility: 'Sole Developer & Project Owner', 
      outcome: 'Replaced manual license tracking and generation with an automated system featuring email-based approvals, centralized tracking, and a complete audit trail.”', 
    },
    {
      number: '02',
      type: 'SERVICE DESK',
      heading: ['Every request,', 'moving forward.'],
      description:
        'Service desk application that connects customer requests to approvals, resolutions, reporting and material flows, from intake to completion.',
      stack: ['ASP.NET Core MVC', 'C#', 'Web API', 'SQL Server'],
      role: 'Software Developer',
      responsibility: 'Project Lead, Team of 4',
      outcome: 'Replaced spreadsheet-based service tracking with a centralized application connecting service requests, approvals, resolutions, and material management.', 
    },
  ],
};

export const toolkit = {
  topline: ['03 / TOOLKIT', 'WHAT I WORK WITH'],
  heading: ['The tools', 'I work with.'],
  intro: 'Front end, back end and data.',
  pillars: [
    {
      title: 'Business workflows',
      text: 'Internal tools for approvals, tracking and reporting, such as a license manager and a service desk.',
    },
    {
      title: '.NET & APIs',
      text: 'ASP.NET Core MVC and Web API on SQL Server: data layers, business logic and service endpoints.',
    },
    {
      title: 'React & UX',
      text: 'React and Vite front ends that talk to REST APIs, from a food-ordering storefront to small data apps.',
    },
  ],
  skills: [
    { category: '01 / INTERFACES', title: 'Frontend', tools: 'React · JavaScript · HTML · CSS · Vite' },
    { category: '02 / APPLICATIONS', title: 'Microsoft stack', tools: 'C# · ASP.NET Core MVC · Web API' },
    { category: '03 / SERVER SIDE', title: 'Backend', tools: 'Node.js · Express · REST APIs' },
    { category: '04 / DATA', title: 'Databases', tools: 'SQL Server · MongoDB' },
  ],
};

export const about = {
  topline: ['04 / ABOUT', 'BUILDER · PROBLEM SOLVER'],
  eyebrow: 'A PRACTICAL KIND OF CREATIVE',
  heading: ['Thoughtful in the details.', 'Grounded in real-world work.'],
  paragraphs: [
    'My professional work is enterprise .NET applications for business workflows. My independent projects are React and Node.js apps.',
    'I care about what happens after the demo: clear logic, dependable APIs, good data flow, and interfaces that make sense to the people using them every day.',
  ],
};

export const contact = {
  topline: ['05 / CONTACT', 'OPEN TO GOOD CONVERSATIONS'],
  eyebrow: 'HAVE SOMETHING IN MIND?',
  heading: ['Let’s build', 'something', 'that actually helps.'],
  text: 'Have a project, a role or a question? Email is the quickest way to reach me.',
};
