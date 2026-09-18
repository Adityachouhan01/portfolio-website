export const site = {
  name: "Aditya Chouhan",
  shortName: "AC",
  role: "Full-Stack Developer • DevOps Engineer",
  navSubtitle: "FULL-STACK • DEVOPS • CLOUD",
  headline: "Engineering scalable systems from frontend to cloud.",
  supportingHeadline: "Full-Stack Developer • DevOps Engineer • Cloud Enthusiast",
  description:
    "I build modern web applications, automate infrastructure, and design reliable deployment workflows using cloud-native technologies.",
  currentRole: "Advanced Associate System Engineer",
  currentCompany: "Accenture",
  freelanceLabel: "Freelance Developer",
  openToFreelance: true,
  statusLabel: "Open to freelance opportunities",
  footerStatus: "Available for freelance projects",
  email: "adityachouhan183@gmail.com",
  github: "https://github.com/Adityachouhan03",
  linkedin: "https://linkedin.com/in/Aditya-Chouhan",
  resumePath: "/Aditya-Chouhan-Resume.pdf",
  seoTitle: "Aditya Chouhan | Full-Stack Developer & DevOps Engineer",
} as const

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
] as const

export type NavId = (typeof navItems)[number]["id"]
