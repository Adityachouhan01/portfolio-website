import { motion, useReducedMotion } from "framer-motion"
import { pipelineStages, stackCards } from "../data/skills"
import { Section } from "./ui/Section"

export function About() {
  const reduce = useReducedMotion()

  return (
    <Section
      id="about"
      eyebrow="About"
      title="I build, deploy, and automate."
      subtitle="I work across the layers of modern software systems — from interfaces and APIs to containers, clusters, and the cloud that runs them."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5 text-[15px] leading-relaxed text-mist sm:text-base"
        >
          <p>
            As a Full-Stack Developer and DevOps Engineer, I treat applications
            and infrastructure as one system. Frontends, APIs, pipelines, and
            production environments should move together — not as disconnected
            handoffs.
          </p>
          <p>
            My work sits at the intersection of full-stack development, cloud
            infrastructure, DevOps, CI/CD, containerization, Kubernetes,
            Infrastructure as Code, and automation. The goal is the same at
            every layer: reliable systems that are straightforward to change.
          </p>
          <p>
            Currently I am an Advanced Associate System Engineer at Accenture,
            and I take on freelance development and technical projects when the
            problem is worth solving well.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-3 bottom-3 left-[15px] w-px bg-line" />
          <ol className="space-y-3">
            {pipelineStages.map((stage, i) => (
              <motion.li
                key={stage}
                initial={reduce ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: reduce ? 0 : i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex items-center gap-4"
              >
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-cyan/30 bg-ink font-mono text-[10px] text-cyan">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-lg tracking-[0.18em] text-fog uppercase">
                  {stage}
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>

      <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {stackCards.map((card, i) => (
          <motion.li
            key={card.title}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.05 }}
            className="group rounded-2xl border border-line bg-panel/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan/25 hover:shadow-[0_0_30px_rgba(100,210,255,0.06)]"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-cyan uppercase">
              {card.title}
            </p>
            <p className="mt-2 text-lg text-fog">{card.detail}</p>
          </motion.li>
        ))}
      </ul>
    </Section>
  )
}
