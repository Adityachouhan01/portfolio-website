import { motion, useReducedMotion } from "framer-motion"
import { certifications } from "../data/experience"
import { Section } from "./ui/Section"

export function Certifications() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="learning"
      eyebrow="Currently learning"
      title="Credentials in motion."
      subtitle="These are not completed certifications. Status is shown as it stands today."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert, i) => (
          <motion.li
            key={cert.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
            className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-panel/40 p-6"
          >
            <div>
              <h3 className="font-display text-lg text-fog">{cert.title}</h3>
              <p className="mt-1 text-sm text-dim">Not yet completed</p>
            </div>
            <span
              className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase ${
                cert.status === "IN PROGRESS"
                  ? "border-cyan/30 bg-cyan-dim text-cyan"
                  : "border-line text-mist"
              }`}
            >
              {cert.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
