import { motion, useReducedMotion } from "framer-motion"
import { skillGroups } from "../data/skills"
import { Section } from "./ui/Section"

export function Skills() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="The engineering stack."
      subtitle="Tools I use to design, ship, and operate software. Ansible is marked as beginner-level."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <motion.article
            key={group.id}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: reduce ? 0 : gi * 0.04 }}
            className="rounded-2xl border border-line bg-panel/35 p-5 sm:p-6"
          >
            <h3 className="font-display text-lg text-fog">{group.title}</h3>
            <p className="mt-1 font-mono text-[11px] tracking-wide text-dim">
              {group.subtitle}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <span className="inline-flex min-h-9 cursor-default items-center rounded-full border border-line bg-ink px-3 text-sm text-mist transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/35 hover:text-cyan hover:shadow-[0_0_16px_rgba(100,210,255,0.12)]">
                    {skill.name}
                    {skill.level === "beginner" && (
                      <span className="ml-2 font-mono text-[9px] tracking-wider text-dim uppercase">
                        beginner
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}
