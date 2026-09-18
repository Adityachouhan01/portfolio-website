export type SkillLevel = "core" | "beginner"

export type Skill = {
  name: string
  level?: SkillLevel
}

export type SkillGroup = {
  id: string
  title: string
  subtitle: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "fullstack",
    title: "Full-Stack Development",
    subtitle: "Interfaces, APIs, and data",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
      { name: "REST APIs" },
      { name: "Git" },
    ],
  },
  {
    id: "cloud",
    title: "Cloud",
    subtitle: "Provisioned, networked, stored",
    skills: [
      { name: "AWS" },
      { name: "EC2" },
      { name: "S3" },
      { name: "VPC" },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD",
    subtitle: "From commit to artifact",
    skills: [
      { name: "Jenkins" },
      { name: "GitHub Actions" },
      { name: "GitLab CI" },
    ],
  },
  {
    id: "containers",
    title: "Containers",
    subtitle: "Package once, run anywhere",
    skills: [{ name: "Docker" }, { name: "Kubernetes" }],
  },
  {
    id: "iac",
    title: "Infrastructure as Code",
    subtitle: "Declarative cloud",
    skills: [
      { name: "Terraform" },
      { name: "Ansible", level: "beginner" },
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring",
    subtitle: "Observe, then improve",
    skills: [{ name: "Grafana" }],
  },
  {
    id: "systems",
    title: "Systems",
    subtitle: "The machines underneath",
    skills: [{ name: "Linux" }, { name: "Microsoft" }, { name: "Bash" }],
  },
  {
    id: "programming",
    title: "Programming",
    subtitle: "Foundations",
    skills: [{ name: "Java" }, { name: "C/C++" }],
  },
]

export const stackCards = [
  { title: "Full-Stack", detail: "React + Node.js" },
  { title: "Cloud", detail: "AWS" },
  { title: "Containers", detail: "Docker + Kubernetes" },
  { title: "Infrastructure", detail: "Terraform" },
  { title: "CI/CD", detail: "Jenkins + GitHub Actions + GitLab CI" },
  { title: "Monitoring", detail: "Grafana" },
] as const

export const pipelineStages = [
  "CODE",
  "BUILD",
  "TEST",
  "CONTAINER",
  "DEPLOY",
  "MONITOR",
] as const
