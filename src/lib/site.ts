export const site = {
  name: "ReinstateLabs",
  wordmark: { top: "REINSTATE", bottom: "LABS" },
  tagline: "Technology for what comes next.",
  description:
    "ReinstateLabs is a technology studio. We design and build software, AI systems, cloud infrastructure, and automation for companies that need technology to work in production.",
  url: "https://reinstatelabs.com",
  email: "hello@reinstatelabs.com",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  location: "Pune, Maharashtra, India",
  locationDetail: "Working with teams across IST, CET and EST.",
  nav: [
    { label: "Home", href: "/" },
    { label: "What We Do", href: "/what-we-do" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Book an Appointment", href: "/book-appointment" },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/reinstatelabs" },
    { label: "GitHub", href: "https://github.com/reinstatelabs" },
    { label: "X", href: "https://x.com/reinstatelabs" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
