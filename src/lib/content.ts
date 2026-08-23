/**
 * Single source of truth for site copy. Pages compose from here so that the
 * homepage summary and the What We Do deep-dive never drift apart.
 */

export type ServiceId =
  | "software"
  | "digital"
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
    title: "Software Development",
    short: "Platforms, APIs and custom backends.",
    description:
      "We build custom platforms, admin tools, and secure APIs engineered to scale reliably and remain easy for your team to maintain.",
    deliverables: [
      "Custom Web Platforms & Portals",
      "REST & GraphQL API Development",
      "Database Design & Migrations",
      "Admin & Operational Dashboards",
      "Automated Testing & Security",
    ],
    visual: "stack",
  },
  {
    id: "digital",
    anchor: "web-applications",
    index: 2,
    title: "Web & Digital Products",
    short: "Fast, responsive web applications.",
    description:
      "Modern web apps and product interfaces built for high speed, clean design, accessibility, and effortless user experience.",
    deliverables: [
      "Modern React & Next.js Web Apps",
      "Custom UI & Design Systems",
      "Mobile-First Responsive Layouts",
      "High-Speed Performance Optimization",
      "Universal Web Accessibility (WCAG)",
    ],
    visual: "viewport",
  },
  {
    id: "ai",
    anchor: "ai-ml",
    index: 3,
    title: "AI & Machine Learning",
    short: "Smart AI features and predictive models.",
    description:
      "We build practical AI systems — custom chatbots, automated document extraction, predictive analytics, and image recognition tools.",
    deliverables: [
      "AI Chatbots & Smart Search",
      "Predictive & Sales Forecasting Models",
      "Document Processing & Text Extraction",
      "Computer Vision & Inspection Tools",
      "AI Accuracy & Performance Monitoring",
    ],
    visual: "lattice",
  },
  {
    id: "data",
    anchor: "data-analytics",
    index: 4,
    title: "Data & Analytics",
    short: "Real-time dashboards and unified business data.",
    description:
      "We connect your data sources into a central warehouse and build clear, interactive dashboards so your team makes decisions faster.",
    deliverables: [
      "Automated Data Ingestion Pipelines",
      "Central Data Warehouse Setup",
      "Executive Dashboards & Reports",
      "Standardized Metric & KPI Tracking",
      "Data Quality & Error Alerts",
    ],
    visual: "warehouse",
  },
  {
    id: "cloud",
    anchor: "cloud-infrastructure",
    index: 5,
    title: "Cloud & Infrastructure",
    short: "Secure, automated cloud setups.",
    description:
      "Scalable cloud environments on AWS, GCP, and Azure with automated deployments, 24/7 monitoring, and fail-safe backups.",
    deliverables: [
      "Cloud Setup (AWS, GCP, Azure)",
      "Automated CI/CD Release Pipelines",
      "Docker Containerization & Scaling",
      "24/7 Monitoring & Instant Alerts",
      "Cloud Backup & Cost Tuning",
    ],
    visual: "topology",
  },
  {
    id: "automation",
    anchor: "automation",
    index: 6,
    title: "Automation",
    short: "Eliminate repetitive tasks and save time.",
    description:
      "We automate manual workflows, connect disconnected software tools, and build internal apps that eliminate repetitive paperwork.",
    deliverables: [
      "Workflow Audit & Process Mapping",
      "System & Database Integrations",
      "Approval & Document Workflows",
      "Custom Internal Portals & Tools",
      "Scheduled Background Automation",
    ],
    visual: "flow",
  },
  {
    id: "marketing",
    anchor: "marketing",
    index: 7,
    title: "Marketing & Strategy",
    short: "Growth strategy, SEO, paid ads, and brand building.",
    description:
      "We help businesses grow with targeted ad campaigns, search engine optimization, content creation, and clear brand strategy.",
    deliverables: [
      "Social Media Management",
      "Google & Social Paid Ads",
      "SEO & Search Rankings",
      "Brand Strategy & Positioning",
      "Marketing Analytics & ROI Dashboards",
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
      "Robust, reliable backend systems, custom web platforms, and secure APIs.",
    points: [
      "Custom web applications, admin portals, and internal dashboards",
      "Fast, secure REST and GraphQL API development",
      "Database design, data storage setup, and smooth data migrations",
      "Automated code testing to prevent bugs and ensure high reliability",
      "Clean, well-documented code built to scale easily as your business grows",
    ],
  },
  {
    id: "web-applications",
    title: "Web Applications",
    summary:
      "Fast, modern, and mobile-friendly web apps designed for high performance.",
    points: [
      "Modern frontend development with React and Next.js framework",
      "Custom UI design systems, reusable components, and brand consistency",
      "High-speed page loading optimized for mobile and desktop screens",
      "Universal web accessibility standards (WCAG 2.2 AA) for all users",
      "Responsive, clean layouts that work seamlessly on every device",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    summary:
      "Smart AI features, custom chatbots, predictive models, and automated data extraction.",
    points: [
      "AI chatbots and smart search systems built over your private company data",
      "Predictive AI models for sales forecasting, trend analysis, and risk detection",
      "Automated document processing, text extraction, and OCR tools",
      "Computer vision for visual inspection, object counting, and quality control",
      "Real-time evaluation and monitoring to ensure AI accuracy over time",
    ],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    summary: "Turn raw business data into actionable insights and real-time dashboards.",
    points: [
      "Automated data collection from apps, databases, and third-party tools",
      "Centralized data warehouse setup for unified company reporting",
      "Standardized business metrics so your team reads the exact same numbers",
      "Interactive dashboards and visual reports designed for fast decision making",
      "Continuous data quality monitoring and instant error alerts",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    summary:
      "Secure, scalable cloud environments with automated deployment and zero downtime.",
    points: [
      "Cloud setup and management on AWS, Google Cloud, and Azure",
      "Automated deployment pipelines (CI/CD) for safe and quick updates",
      "Containerization with Docker and Kubernetes for effortless scaling",
      "24/7 server monitoring, log tracking, and instant alerts",
      "Automated cloud backups, disaster recovery, and cost optimization",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    summary: "Eliminate manual tasks, connect separate apps, and speed up business workflows.",
    points: [
      "Workflow audits to identify and fix manual bottlenecks in your business",
      "Seamless API integrations connecting CRM, ERP, and payment databases",
      "Automated document generation, email notifications, and approval flows",
      "Scheduled background jobs to handle repetitive daily operations",
      "Custom internal portals to replace spreadsheets and paper forms",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    summary: "Clear strategies to grow your brand, get found on Google, and convert visitors into customers.",
    points: [
      "Social Media Management – Content creation, posting and audience engagement",
      "Targeted paid ad campaigns on Google, Meta, LinkedIn, and Instagram",
      "Search Engine Optimization (SEO) to rank higher on Google search",
      "Brand positioning, messaging guidelines, and visual identity design",
      "Marketing analytics and performance dashboards to track campaign ROI",
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
