import { ArrowRight, Cloud, Code2, Container, Workflow } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { services } from "../data/experience"
import { scrollToId } from "../lib/scroll"
import { Section } from "./ui/Section"

const icons: Record<string, LucideIcon> = {
  fullstack: Code2,
  devops: Container,
  cloud: Cloud,
  automation: Workflow,
}

export function Services() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="services"
      eyebrow="Freelance"
      title="Need something built?"
      subtitle="I also work with clients on freelance development and technical projects."
    >
      <ul className="grid gap-4 sm:grid-cols-2">
        {services.map((service, i) => {
          const Icon = icons[service.id] ?? Code2
          return (
            <motion.li
              key={service.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
              className="rounded-2xl border border-line bg-panel/40 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/25"
            >
              <Icon size={20} className="text-cyan" strokeWidth={1.6} />
              <h3 className="mt-4 font-display text-xl text-fog">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {service.description}
              </p>
            </motion.li>
          )
        })}
      </ul>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          className="group inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-fog px-6 text-sm font-medium text-void transition-transform duration-200 hover:scale-[1.02]"
        >
          Start a Conversation
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </Section>
  )
}
