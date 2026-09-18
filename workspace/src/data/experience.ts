export type ExperienceItem = {
  id: string
  title: string
  company: string
  period: string
  current?: boolean
  responsibilities?: string[]
  expandablePlaceholder?: boolean
}

export const experience: ExperienceItem[] = [
  {
    id: "accenture",
    title: "Advanced Associate System Engineer",
    company: "Accenture",
    period: "Current",
    current: true,
    expandablePlaceholder: true,
  },
  {
    id: "edunet",
    title: "Project Trainee",
    company: "Edunet Foundation",
    period: "February 2025 – March 2025",
    responsibilities: [
      "Developed AI workflows involving data preprocessing, model training, evaluation, and deployment.",
      "Integrated ML models into web UI components.",
      "Improved deployment through automation and reduced manual setup steps.",
    ],
  },
]

export const education = {
  degree: "Bachelor of Technology — Computer Science",
  school: "Institute of Engineering & Science, IPS Academy, Indore",
  period: "November 2021 – May 2025",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Database Management",
    "Computer Networks",
    "Systems Programming",
    "Computer Architecture",
  ],
} as const

export const certifications = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    status: "IN PROGRESS" as const,
  },
  {
    id: "cka",
    title: "Kubernetes CKA / CKAD",
    status: "PLANNED" as const,
  },
]

export const services = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    description: "Modern React and Node.js applications.",
  },
  {
    id: "devops",
    title: "DevOps & Deployment",
    description: "Docker, Kubernetes, CI/CD and cloud deployment workflows.",
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description: "AWS infrastructure and Infrastructure as Code using Terraform.",
  },
  {
    id: "automation",
    title: "Automation",
    description: "Automating repetitive development and deployment workflows.",
  },
] as const

export const architectureNodes = [
  {
    id: "developer",
    label: "Developer",
    detail: "Writes application code and infrastructure definitions.",
  },
  {
    id: "github",
    label: "GitHub",
    detail: "Source of truth for versioned code and collaboration.",
  },
  {
    id: "cicd",
    label: "CI/CD",
    detail: "Runs tests, builds artifacts, and gates releases automatically.",
  },
  {
    id: "docker",
    label: "Docker",
    detail: "Containerizes applications for consistent development and deployment.",
  },
  {
    id: "kubernetes",
    label: "Kubernetes",
    detail: "Orchestrates containerized workloads across clusters.",
  },
  {
    id: "aws",
    label: "AWS",
    detail: "Hosts compute, networking, and storage for production systems.",
  },
  {
    id: "monitoring",
    label: "Monitoring",
    detail: "Observes health, latency, and errors after release.",
  },
] as const
