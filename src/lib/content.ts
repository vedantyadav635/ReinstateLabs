/**
 * Single source of truth for site copy. Pages compose from here so that the
 * homepage summary and the What We Do deep-dive never drift apart.
 */

export type ServiceId =
  | "software"
  | "ai"
  | "data"
  | "cloud"
  | "automation"
  | "marketing";

export interface Service {
  id: ServiceId;
  index: number;
  title: string;
  short: string;
  description: string;
  /** Id of the matching block on the What We Do page. */
  anchor: string;
  deliverables: readonly string[];
  /** Abstract visual keyed per service — rendered by ServiceVisual. */
  visual: "lattice" | "stack" | "viewport" | "topology" | "flow" | "warehouse" | "loop";
}

export const services: readonly Service[] = [
  {
    id: "software",
    anchor: "software-engineering",
    index: 1,
    title: "Software/Web Development",
    short: "Custom business software, APIs, and databases.",
    description:
      "We build custom business software, admin tools, and secure APIs engineered to scale reliably and stay easy for your team to use.",
    deliverables: [
      "Custom Business Software",
      "API & System Integrations",
      "Database Design & Storage",
      "Admin & Staff Dashboards",
      "Automated Bug Testing",
    ],
    visual: "stack",
  },
  {
    id: "ai",
    anchor: "ai-ml",
    index: 2,
    title: "AI & Machine Learning",
    short: "Smart AI chatbots and data prediction tools.",
    description:
      "We build practical AI features — custom chatbots, automated document scanning, sales predictions, and image recognition tools.",
    deliverables: [
      "Custom AI Chatbots",
      "Sales & Trend Forecasting",
      "Document & Text Extraction",
      "Image & Video AI Tools",
      "AI Accuracy Monitoring",
    ],
    visual: "lattice",
  },
  {
    id: "data",
    anchor: "data-analytics",
    index: 3,
    title: "Data & Analytics",
    short: "Live dashboards and unified business data.",
    description:
      "We connect your software tools into one central place and build simple, live dashboards so your team can make fast decisions.",
    deliverables: [
      "Automatic Data Collection",
      "Central Data Warehouse",
      "Live Performance Reports",
      "Team Metrics & KPI Tracking",
      "Data Error Alerts",
    ],
    visual: "warehouse",
  },
  {
    id: "cloud",
    anchor: "cloud-infrastructure",
    index: 4,
    title: "Cloud & Infrastructure",
    short: "Safe cloud hosting and fast servers.",
    description:
      "Reliable cloud setup on AWS, Google Cloud, and Azure with automatic updates, 24/7 server monitoring, and secure backups.",
    deliverables: [
      "Cloud Hosting (AWS, GCP, Azure)",
      "Automated Code Releases",
      "High-Traffic Server Scaling",
      "24/7 Monitoring & Alerts",
      "Cloud Cost Optimization",
    ],
    visual: "topology",
  },
  {
    id: "automation",
    anchor: "automation",
    index: 5,
    title: "Automation",
    short: "Save time by automating repetitive daily work.",
    description:
      "We automate manual business tasks, connect separate apps, and build internal tools to eliminate repetitive paperwork.",
    deliverables: [
      "Workflow & Task Audits",
      "Connecting App Software",
      "Automated Email & Approvals",
      "Custom Internal Apps",
      "Scheduled Daily Automation",
    ],
    visual: "flow",
  },
  {
    id: "marketing",
    anchor: "marketing",
    index: 6,
    title: "Marketing & Strategy",
    short: "Growth strategy, SEO, paid ads, and brand building.",
    description:
      "We help businesses grow with targeted ad campaigns, search engine optimization, content creation, and clear brand strategy.",
    deliverables: [
      "Social Media Management",
      "Google & Social Paid Ads",
      "SEO & Search Rankings",
      "Brand Design & Positioning",
      "Ad Performance Reports",
    ],
    visual: "loop",
  },
];

/* ------------------------------------------------------------------ */

export interface ProcessStep {
  index: number;
  title: string;
  summary: string;
  detail: string;
  outputs: readonly string[];
}

export const processSteps: readonly ProcessStep[] = [
  {
    index: 1,
    title: "Discover",
    summary: "Understand the business, the users and the constraints.",
    detail:
      "We start with the people doing the work. Interviews, a read of the existing systems, and an honest list of what is slow, brittle or expensive — before anyone proposes a solution.",
    outputs: ["Stakeholder interviews", "System audit", "Constraint map"],
  },
  {
    index: 2,
    title: "Define",
    summary: "Turn the problem into a technical and product strategy.",
    detail:
      "Scope gets sharp here. We agree what the system must do, what it will deliberately not do, how success is measured, and what the first release looks like.",
    outputs: ["Scope & success metrics", "Technical strategy", "Release plan"],
  },
  {
    index: 3,
    title: "Design",
    summary: "Architect the system and the experience together.",
    detail:
      "Data model, service boundaries, interface and interaction are designed as one piece of work. Decisions are recorded with their reasoning so they can be revisited, not re-argued.",
    outputs: ["Architecture & data model", "Interface design", "Decision records"],
  },
  {
    index: 4,
    title: "Build",
    summary: "Develop, integrate, test, iterate.",
    detail:
      "Short cycles against a working environment. You see the real thing early and often, with automated tests and review gates carrying the quality rather than a checklist at the end.",
    outputs: ["Working increments", "Automated test suite", "Review cadence"],
  },
  {
    index: 5,
    title: "Scale",
    summary: "Deploy, observe, optimise, hand over.",
    detail:
      "Release with instrumentation from day one. We tune what the data says is slow or costly, document the operational path, and hand over cleanly — or stay on as your engineering bench.",
    outputs: ["Deployment & rollback", "Observability", "Runbooks & handover"],
  },
];

/* ------------------------------------------------------------------ */

export interface Capability {
  id: string;
  title: string;
  summary: string;
  points: readonly string[];
}

export const capabilities: readonly Capability[] = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    summary:
      "Custom web software, databases, and secure APIs.",
    points: [
      "Custom business software and admin dashboards",
      "Fast and secure API connections",
      "Database setup and data storage",
      "Automated bug testing and security checks",
      "Clean code built to grow with your business",
    ],
  },
  {
    id: "web-applications",
    title: "Web Applications",
    summary:
      "Fast, modern, and mobile-friendly websites and web apps.",
    points: [
      "Modern website and web application development",
      "Custom design systems and brand styling",
      "Fast loading speed on mobile and desktop",
      "Easy to use for everyone on all devices",
      "Clean and responsive layouts",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    summary:
      "Smart AI chatbots, data prediction, and automated tools.",
    points: [
      "Custom AI chatbots for instant customer and business search",
      "AI tools for sales forecasting and trend prediction",
      "Automatic text and data scanning from documents",
      "Image and video recognition tools",
      "Continuous tracking to keep AI accurate and reliable",
    ],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    summary: "Turn business data into simple, real-time dashboards.",
    points: [
      "Automatic data collection from all your apps and tools",
      "One central storage place for all company data",
      "Clear numbers and metrics your whole team can trust",
      "Live visual dashboards and reports for quick decisions",
      "Instant alerts if data errors occur",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    summary:
      "Safe cloud hosting, automated deployment, and fast servers.",
    points: [
      "Cloud setup on AWS, Google Cloud, and Microsoft Azure",
      "Automated code updates without downtime",
      "Server scaling to handle high traffic",
      "24/7 server monitoring and instant error alerts",
      "Automatic data backup and cloud cost savings",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    summary: "Save time by automating repetitive daily work.",
    points: [
      "Business workflow reviews to find and remove slow tasks",
      "Connecting your software tools so they talk to each other",
      "Automatic email, document, and approval workflows",
      "Scheduled daily background tasks",
      "Custom internal tools to replace spreadsheets",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    summary: "Grow your brand, get found online, and reach more customers.",
    points: [
      "Social Media Management – Content creation, posting and audience engagement",
      "Paid ad campaigns on Google, Meta, and LinkedIn",
      "SEO setup to help your website rank high on Google",
      "Brand logo, messaging, and visual design",
      "Simple reports tracking leads and ad performance",
    ],
  },
];

/* ------------------------------------------------------------------ */

export interface TechGroup {
  label: string;
  items: readonly string[];
}

export const techGroups: readonly TechGroup[] = [
  { label: "Languages", items: ["TypeScript", "Python", "Go", "SQL", "Rust"] },
  {
    label: "Interfaces",
    items: ["React", "Next.js", "Tailwind CSS", "Motion", "Design Systems"],
  },
  {
    label: "Services",
    items: ["Node.js", "FastAPI", "GraphQL", "gRPC", "Event Queues"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "ClickHouse", "Vector Stores"],
  },
  {
    label: "Intelligence",
    items: ["PyTorch", "OpenAI", "Anthropic", "Computer Vision", "Classical ML"],
  },
  {
    label: "Platform",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
];

/* ------------------------------------------------------------------ */

export const marqueeItems = [
  "AI Systems",
  "Software Engineering",
  "Digital Products",
  "Cloud Architecture",
  "Automation",
  "Data Platforms",
  "Machine Learning",
  "Internal Tools",
  "Design Systems",
  "Infrastructure as Code",
];
