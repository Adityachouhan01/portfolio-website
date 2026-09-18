export type Project = {
  id: string
  title: string
  date: string
  description: string
  technologies: string[]
  highlights: string[]
  flow: string[]
  github?: string
  live?: string
  problem: string
  solution: string
  architecture: string
  implementation: string[]
}

export const projects: Project[] = [
  {
    id: "fullstack-devops",
    title: "Full-Stack Application with DevOps Workflow",
    date: "May 2024",
    description: "Production-ready full-stack application with automated DevOps workflows.",
    technologies: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes", "Terraform"],
    highlights: [
      "Responsive React frontend",
      "Node.js / Express backend APIs",
      "Docker containerization",
      "Kubernetes orchestration",
      "AWS infrastructure",
      "Terraform modules",
    ],
    flow: ["React", "Node.js", "Docker", "Kubernetes", "AWS"],
    problem:
      "Ship a full-stack product that stays consistent from local development through cloud deployment.",
    solution:
      "A React and Node.js application packaged with Docker, orchestrated on Kubernetes, and provisioned on AWS with Terraform.",
    architecture: "React → Node.js → Docker → Kubernetes → AWS",
    implementation: [
      "Responsive React frontend",
      "Node.js / Express backend APIs",
      "Docker containerization",
      "Kubernetes orchestration",
      "AWS infrastructure defined with Terraform modules",
    ],
  },
  {
    id: "nodejs-cicd",
    title: "Node.js Project with CI/CD",
    date: "March 2024",
    description: "Automated test and deploy pipeline for a Dockerized Node.js service on AWS.",
    technologies: ["Node.js", "GitHub Actions", "Docker", "AWS EC2", "Nginx"],
    highlights: [
      "Automated testing",
      "Automated deployment",
      "GitHub Actions pipeline",
      "Dockerized application",
      "AWS deployment",
    ],
    flow: ["GitHub", "GitHub Actions", "Build/Test", "Docker", "AWS EC2", "Nginx"],
    problem:
      "Manual testing and deployment slowed releases and introduced environment drift.",
    solution:
      "A GitHub Actions pipeline that tests, builds a Docker image, and deploys to AWS EC2 behind Nginx.",
    architecture: "GitHub → GitHub Actions → Build/Test → Docker → AWS EC2 → Nginx",
    implementation: [
      "Automated testing on every push",
      "GitHub Actions pipeline for build and deploy",
      "Dockerized application",
      "AWS EC2 deployment served by Nginx",
    ],
  },
  {
    id: "jenkins-k8s",
    title: "Deploy and Setup Jenkins on Kubernetes Cluster",
    date: "February 2024",
    description: "Jenkins platform on Kubernetes with Helm, persistent storage, and CI pipelines.",
    technologies: ["Jenkins", "Kubernetes", "Helm", "Docker"],
    highlights: [
      "Jenkins deployed using Helm",
      "Persistent storage",
      "RBAC configuration",
      "Jenkins agents",
      "GitHub webhooks",
      "CI/CD pipelines",
      "Node.js and microservices workflows",
    ],
    flow: ["GitHub", "Webhook", "Jenkins", "Kubernetes", "Deployment"],
    problem:
      "A shared CI platform needed to run reliably on Kubernetes with durable state and controlled access.",
    solution:
      "Jenkins installed with Helm on a Kubernetes cluster, with persistent storage, RBAC, agents, and GitHub webhooks.",
    architecture: "GitHub → Webhook → Jenkins → Kubernetes → Deployment",
    implementation: [
      "Jenkins deployed using Helm",
      "Persistent storage for Jenkins state",
      "RBAC configuration",
      "Jenkins agents for distributed builds",
      "GitHub webhooks triggering CI/CD pipelines",
      "Node.js and microservices workflows",
    ],
  },
]
