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
    short: "Platforms, APIs and the systems behind them.",
    description:
      "Custom platforms, internal tooling, APIs and data models designed to be extended by whoever comes after us. We write software that a second team can read, test and ship without a rewrite.",
    deliverables: [
      "Web platforms & portals",
      "REST & GraphQL APIs",
      "Operational dashboards",
      "Data models & migrations",
      "Test & release pipelines",
    ],
    visual: "stack",
  },
  {
    id: "digital",
    anchor: "web-applications",
    index: 2,
    title: "Web & Digital Products",
    short: "Interfaces with an argument behind them.",
    description:
      "Product interfaces and marketing surfaces built for speed, clarity and accessibility. Design and engineering happen in the same room, so what gets specified is what actually ships.",
    deliverables: [
      "Product UI & design systems",
      "Marketing sites & landing systems",
      "Interaction & motion design",
      "Accessibility to WCAG 2.2 AA",
      "Core Web Vitals budgets",
    ],
    visual: "viewport",
  },
  {
    id: "ai",
    anchor: "ai-ml",
    index: 3,
    title: "AI & Machine Learning",
    short: "Models that survive contact with real data.",
    description:
      "We build AI features that hold up outside a demo — retrieval systems over your own documents, predictive models on your operational data, language and vision pipelines, and the evaluation harnesses that tell you when they drift.",
    deliverables: [
      "Retrieval-augmented assistants",
      "Predictive & forecasting models",
      "Document understanding & NLP",
      "Computer vision pipelines",
      "Evaluation & monitoring",
    ],
    visual: "lattice",
  },
  {
    id: "data",
    anchor: "data-analytics",
    index: 4,
    title: "Data & Analytics",
    short: "One version of the numbers and decision paths.",
    description:
      "Ingestion pipelines, warehouse modeling, metric definitions and clear dashboards built for decision makers.",
    deliverables: [
      "Ingestion pipelines",
      "Warehouse modeling",
      "Metric definitions",
      "Reporting dashboards",
      "Data quality monitoring",
    ],
    visual: "warehouse",
  },
  {
    id: "cloud",
    anchor: "cloud-infrastructure",
    index: 5,
    title: "Cloud & Infrastructure",
    short: "Infrastructure you can reason about.",
    description:
      "Cloud architecture, containers, CI/CD and observability described as code. We size infrastructure to the load you actually have, and leave you with runbooks instead of tribal knowledge.",
    deliverables: [
      "Cloud architecture & IaC",
      "Containerisation & orchestration",
      "CI/CD pipelines",
      "Observability & alerting",
      "Cost & performance tuning",
    ],
    visual: "topology",
  },
  {
    id: "automation",
    anchor: "automation",
    index: 6,
    title: "Automation",
    short: "Remove the work nobody should be doing.",
    description:
      "We map the manual paths through your business, then close them — integrations between systems that never spoke, document and approval workflows, and internal tools that replace a shared spreadsheet.",
    deliverables: [
      "Process mapping & audit",
      "System-to-system integration",
      "Document & approval workflows",
      "Internal tools",
      "Scheduled & event-driven jobs",
    ],
    visual: "flow",
  },
  {
    id: "marketing",
    anchor: "marketing",
    index: 7,
    title: "Marketing & Strategy",
    short: "Growth strategy, SEO and performance campaigns.",
    description:
      "Performance marketing campaigns across paid channels, technical SEO audits, content architecture, and conversion rate optimization to scale your brand.",
    deliverables: [
      "Performance marketing campaigns",
      "SEO strategy & technical audits",
      "Conversion rate optimization (CRO)",
      "Brand & positioning strategy",
      "Analytics & attribution dashboards",
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
      "Long-lived systems: typed, tested, documented and legible to the next engineer.",
    points: [
      "Domain modelling and service boundaries that match how the business works",
      "REST and GraphQL APIs with versioning, auth and rate limiting designed in",
      "Relational and document data models, migrations and backfills",
      "Test strategy across unit, integration and end-to-end layers",
      "Code review standards, CI gates and release discipline",
    ],
  },
  {
    id: "web-applications",
    title: "Web Applications",
    summary:
      "Interfaces that are fast on real devices and usable by everyone who has to use them.",
    points: [
      "React and Next.js applications with server rendering where it earns its cost",
      "Design systems built as components, tokens and documentation",
      "Performance budgets tracked against Core Web Vitals in CI",
      "Accessibility to WCAG 2.2 AA: semantics, focus order, contrast, reduced motion",
      "Progressive enhancement so the core path works before the JavaScript lands",
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    summary:
      "From a first useful model to a system your team can retrain, evaluate and trust.",
    points: [
      "Retrieval-augmented generation over private corpora, with citation and grounding checks",
      "Classification, forecasting and anomaly detection on operational data",
      "Document extraction, OCR and structured output from unstructured sources",
      "Computer vision for inspection, counting and quality control",
      "Offline evaluation sets, regression suites and drift monitoring in production",
    ],
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    summary: "One version of the numbers, and a path from raw events to a decision.",
    points: [
      "Ingestion pipelines from application, third-party and event sources",
      "Warehouse modelling with tested, documented transformations",
      "Metric definitions agreed once and reused everywhere",
      "Dashboards and reporting surfaces built for the people who act on them",
      "Data quality checks, lineage and freshness monitoring",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    summary:
      "Environments described in code, sized for the load you have, observable when it changes.",
    points: [
      "Architecture on AWS, GCP or Azure with a clear cost model per environment",
      "Infrastructure as code, reproducible environments and drift detection",
      "Containers, orchestration and zero-downtime deployment strategies",
      "Logs, metrics, traces and alerts that map to real user-facing symptoms",
      "Backup, failover and recovery procedures that have actually been rehearsed",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    summary: "Close the manual loops between systems, people and paperwork.",
    points: [
      "Process mapping to find where time and errors actually accumulate",
      "Integrations across CRM, ERP, finance, support and internal databases",
      "Approval, review and document-generation workflows",
      "Event-driven and scheduled jobs with retries, idempotency and dead-letter handling",
      "Internal tools that replace the spreadsheet the whole team depends on",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    summary: "Growth strategy, performance campaigns, SEO architecture and conversion optimization.",
    points: [
      "Performance marketing campaigns across paid search, social and display channels",
      "SEO strategy, technical audits, content architecture and schema markup",
      "Conversion rate optimization (CRO), A/B testing and landing page architecture",
      "Brand strategy, positioning, messaging guidelines and visual identity",
      "Analytics setup, attribution modelling and marketing reporting dashboards",
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
