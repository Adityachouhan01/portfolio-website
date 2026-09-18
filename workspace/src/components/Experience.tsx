import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { experience } from "../data/experience"
import { Section } from "./ui/Section"

export function Experience() {
  const reduce = useReducedMotion()
  const [openId, setOpenId] = useState<string | null>("edunet")

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where the work happens."
      subtitle="Roles across engineering and applied systems. Details stay faithful to what is on record."
    >
      <ol className="relative space-y-4 before:absolute before:top-3 before:bottom-3 before:left-[19px] before:w-px before:bg-line">
        {experience.map((item, i) => {
          const open = openId === item.id
          return (
            <motion.li
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
              className="relative pl-12"
            >
              <span
                className={`absolute top-6 left-[11px] h-[18px] w-[18px] rounded-full border ${
                  item.current
                    ? "border-cyan bg-cyan/30 shadow-[0_0_12px_rgba(100,210,255,0.45)]"
                    : "border-line bg-panel"
                }`}
              />
              <article className="rounded-2xl border border-line bg-panel/40 p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl text-fog">
                        {item.title}
                      </h3>
                      {item.current && (
                        <span className="rounded-full border border-cyan/30 bg-cyan-dim px-2 py-0.5 font-mono text-[10px] tracking-wider text-cyan uppercase">
                          Current role
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-mist">
                      {item.company}
                      <span className="mx-2 text-dim">·</span>
                      {item.period}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="inline-flex min-h-11 cursor-pointer items-center gap-1 rounded-full border border-line px-3 text-xs text-mist hover:text-fog"
                  >
                    {open ? "Hide" : "Details"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {item.responsibilities ? (
                        <ul className="mt-5 space-y-2 border-t border-line pt-4 text-sm leading-relaxed text-mist">
                          {item.responsibilities.map((r) => (
                            <li key={r} className="pl-4 relative">
                              <span className="absolute left-0 top-2 h-1 w-1 rounded-full bg-cyan" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-5 border-t border-line pt-4 text-sm text-dim">
                          Responsibilities and achievements for this role will be
                          added here.
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            </motion.li>
          )
        })}
      </ol>
    </Section>
  )
}
