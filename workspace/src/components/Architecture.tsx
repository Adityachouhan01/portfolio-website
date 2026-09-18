import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { architectureNodes } from "../data/experience"
import { Section } from "./ui/Section"

export function Architecture() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<(typeof architectureNodes)[number]["id"]>(
    "developer",
  )
  const current = architectureNodes.find((n) => n.id === active)

  return (
    <Section
      id="architecture"
      eyebrow="Workflow"
      title="From Commit to Production"
      subtitle="An interactive path from a developer's machine to a monitored production system."
    >
      <div className="rounded-3xl border border-line bg-ink/60 p-5 sm:p-8">
        <ol className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch lg:justify-between">
          {architectureNodes.map((node, i) => {
            const selected = node.id === active
            return (
              <li key={node.id} className="flex flex-1 items-stretch gap-3">
                <button
                  type="button"
                  onClick={() => setActive(node.id)}
                  onMouseEnter={() => setActive(node.id)}
                  onFocus={() => setActive(node.id)}
                  aria-pressed={selected}
                  title={node.detail}
                  className={`group relative min-h-16 w-full cursor-pointer rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                    selected
                      ? "border-cyan/40 bg-cyan-dim shadow-[0_0_24px_rgba(100,210,255,0.12)]"
                      : "border-line bg-panel/40 hover:border-cyan/25"
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block font-display text-base text-fog">
                    {node.label}
                  </span>
                  {!reduce && (
                    <span className="mt-2 block h-0.5 overflow-hidden rounded-full bg-line">
                      <motion.span
                        className="block h-full bg-cyan"
                        animate={selected ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                        transition={
                          selected
                            ? { duration: 1.6, repeat: Infinity, ease: "linear" }
                            : { duration: 0.2 }
                        }
                      />
                    </span>
                  )}
                </button>
                {i < architectureNodes.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden self-center font-mono text-dim lg:block"
                  >
                    →
                  </span>
                )}
              </li>
            )
          })}
        </ol>

        <motion.p
          key={current?.id}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 min-h-[3rem] max-w-2xl text-sm leading-relaxed text-mist"
        >
          <span className="text-cyan">{current?.label}: </span>
          {current?.detail}
        </motion.p>
      </div>
    </Section>
  )
}
