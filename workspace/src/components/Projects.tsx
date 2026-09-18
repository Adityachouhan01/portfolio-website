import { ArrowUpRight, Github, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { projects, type Project } from "../data/projects"
import { Section } from "./ui/Section"

export function Projects() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<Project | null>(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [active])

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Systems, not screenshots."
      subtitle="Each project follows the same idea: application code connected to a real delivery path."
    >
      <div className="grid gap-6">
        {projects.map((project, i) => (
          <motion.article
            key={project.id}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.06 }}
            className="group relative overflow-hidden rounded-3xl border border-line bg-panel/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/30 hover:shadow-[0_0_40px_rgba(100,210,255,0.08)] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_right,rgba(100,210,255,0.08),transparent_50%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
                  {project.date}
                </p>
                <h3 className="mt-2 font-display text-2xl text-fog sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist sm:text-base">
                  {project.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-line bg-ink px-3 py-1 text-xs text-mist transition-transform duration-200 group-hover:-translate-y-0.5"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 space-y-1.5 text-sm text-mist">
                  {project.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm text-fog hover:border-cyan/40 hover:text-cyan"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-dim">
                      GitHub · Coming soon
                    </span>
                  )}
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line px-4 text-sm text-fog"
                    >
                      Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-dim">
                      Live Demo · Coming soon
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setActive(project)}
                    className="group/btn inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-fog px-4 text-sm font-medium text-void"
                  >
                    View Details
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    />
                  </button>
                </div>
              </div>
              <FlowDiagram steps={project.flow} />
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center bg-void/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-ink p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
                    {active.date}
                  </p>
                  <h3
                    id="project-modal-title"
                    className="mt-1 font-display text-2xl text-fog"
                  >
                    {active.title}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close project details"
                  onClick={() => setActive(null)}
                  className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-mist hover:text-fog"
                >
                  <X size={16} />
                </button>
              </div>
              <dl className="mt-6 space-y-5 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                    Problem
                  </dt>
                  <dd className="mt-1 text-mist">{active.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                    Solution
                  </dt>
                  <dd className="mt-1 text-mist">{active.solution}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                    Architecture
                  </dt>
                  <dd className="mt-1 font-mono text-fog">{active.architecture}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                    Technologies
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {active.technologies.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-xs text-mist"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
                    Implementation
                  </dt>
                  <dd>
                    <ul className="mt-2 space-y-1.5 text-mist">
                      {active.implementation.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl border border-line bg-void/50 p-4">
      <p className="mb-3 font-mono text-[10px] tracking-[0.22em] text-dim uppercase">
        Architecture
      </p>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-cyan/20 bg-cyan-dim font-mono text-[10px] text-cyan">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm text-fog">{step}</span>
            {i < steps.length - 1 && (
              <span className="ml-auto hidden text-dim sm:inline">↓</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
